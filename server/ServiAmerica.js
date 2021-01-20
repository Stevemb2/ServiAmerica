// Imported Packages

const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const os = require("os");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const pdfkit = require("pdfkit");
const jwt = require("jsonwebtoken");
const winston = require("winston");
const bcrypt = require("bcrypt");
//const lodash = require("lodash");

// Parseq for handling asynchronous functions
const parseq = require("./parseq/parseq");

const attachmentDirectoryPath = path.join(__dirname, "..", "dist/attachments");
const taxTableDirectoryPath = path.join(__dirname, "..", "dist/taxtables");
const pdfDirectoryPath = path.join(__dirname, "..", "dist/mailinglabels");
const clientsDirectoryPath = path.join(__dirname, "..", "dist/clients");

const federalTaxRatesFilePath = path.join(
  taxTableDirectoryPath,
  "federal_tax_rates.csv"
);

const stateTaxRatesFilePath = path.join(
  taxTableDirectoryPath,
  "california_tax_rates.csv"
);

//formula to create a secret for jwt: require('crypto').randomBytes(64).toString('hex');

const Configuration = {
  jwt,
  saltRounds: 10,
  //secret: process.env.SECRET,
  secret:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTc4NzgwMDcsImRhdGEiOiJmb29iYXIiLCJpYXQiOjE1OTc4NzQ0MDd9.e1BRAJYWeLVYxdzpBd6r9OQgDfnKhd_swhhO9Uz4f2k",
  expiration: Math.floor(Date.now() / 1000) + 60 * 60, // Json Web Token expires in 1 hours
  port: 3000,
  mongoPort: 27017,
  hostname: "localhost",
  platform: os.platform()
};

// Utilities

const DateUtilities = require("./utilities/DateUtilities");
const TaxRatesUtilities = require("./utilities/TaxRatesUtilities");
const PDFUtilities = require("./utilities/PDFUtilities");
const FormatterUtilities = require("./utilities/FormatterUtilities");
const ClientsFileUtilities = require("./utilities/ClientsFileUtilities");
const AuthenticationUtilities = require("./utilities/AuthenticationUtilities");

// MongoDB Database Collections

const UserCollection = require("./database/UserCollection");
const ClientCollection = require("./database/ClientCollection");
const TemplateCollection = require("./database/TemplateCollection");
const SettingsCollection = require("./database/SettingsCollection");

// Service

const TaxEstimatorService = require("./services/TaxEstimatorService");
const TaxTableService = require("./services/TaxTableService");
const EmailService = require("./services/EmailService");
const AttachmentService = require("./services/AttachmentService");

// Controllers

const TaxEstimatorController = require("./controllers/TaxEstimatorController");
const TaxTableController = require("./controllers/TaxTableController");
const EmailController = require("./controllers/EmailController");
const MailingLabelsController = require("./controllers/MailingLabelsController");
const ClientController = require("./controllers/ClientController");
const TemplateController = require("./controllers/TemplateController");
const AttachmentController = require("./controllers/AttachmentController");
const UserController = require("./controllers/UserController");
const SettingsController = require("./controllers/SettingsController");

// Logging

const LOGGER_LEVEL = "debug"; // debug for debugging and warn for production

const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  //format: winston.format.json(),
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "warn"
    }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

// Utilities

const dateUtilities = DateUtilities(logger);
const taxRatesUtilities = TaxRatesUtilities(fs, path, logger);
const pdfUtilities = PDFUtilities(pdfkit, fs, path, logger);
const formatterUtilities = FormatterUtilities(logger);
const clientsFileUtilities = ClientsFileUtilities(
  clientsDirectoryPath,
  fs,
  path,
  logger
);
const authenticationUtilities = AuthenticationUtilities(bcrypt, Configuration);

// MongoDB

mongoose.connect(
  `mongodb://${Configuration.hostname}:${Configuration.mongoPort}/serviamerica`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const userCollection = UserCollection(
  mongoose,
  dateUtilities,
  authenticationUtilities,
  logger
);
const clientCollection = ClientCollection(mongoose, logger);
const templateCollection = TemplateCollection(mongoose, logger);
const settingsCollection = SettingsCollection(mongoose, logger);

// Service

const taxEstimatorService = TaxEstimatorService(taxRatesUtilities, logger);
const taxTableService = TaxTableService(fs, logger);

const emailService = EmailService({
  templateCollection,
  nodeMailer,
  path,
  formatterUtilities,
  dateUtilities,
  logger
});

const attachmentService = AttachmentService(fs, logger);

const app = express();

app.set("port", Configuration.port);

//app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "dist")));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // to support URL-encoded bodies

const initialize = () => {
  const federalFileRequestor = taxRatesUtilities.createFileRequestor(
    federalTaxRatesFilePath,
    "Federal"
  );

  const stateFileRequestor = taxRatesUtilities.createFileRequestor(
    stateTaxRatesFilePath,
    "California"
  );

  const log = (value, err) => {
    if (err) {
      logger.warn(`Error: ${err}`);
    } else {
      logger.debug("Finished initialization");
    }
  };

  parseq.parallel([federalFileRequestor, stateFileRequestor])(log);
};

http.createServer(app).listen(Configuration.port, () => {
  console.log(
    `Express started on http://${Configuration.hostname}:${Configuration.port} on ${Configuration.platform} platform; press Ctrl-C to terminate.`
  );
  initialize();
});

// Controllers

const taxEstimatorRouter = express.Router();

app.use(taxEstimatorRouter);

const taxEstimatorParams = {
  taxEstimatorRouter,
  taxEstimatorService
};

TaxEstimatorController(taxEstimatorParams);

const taxTableRouter = express.Router();

app.use(taxTableRouter);

const taxTableParams = {
  taxTableRouter,
  taxTableDirectoryPath,
  path,
  multer,
  taxTableService,
  authenticationUtilities,
  parseq,
  logger
};

TaxTableController(taxTableParams);

const settingsRouter = express.Router();

app.use(settingsRouter);

const settingsParams = {
  settingsRouter,
  settingsCollection,
  authenticationUtilities,
  parseq,
  logger
};

SettingsController(settingsParams);

const emailRouter = express.Router();

app.use(emailRouter);

const emailParams = {
  emailRouter,
  settingsCollection,
  templateCollection,
  clientCollection,
  emailService,
  attachmentDirectoryPath,
  authenticationUtilities,
  parseq,
  logger
};

EmailController(emailParams);

const mailingLabelsRouter = express.Router();

app.use(mailingLabelsRouter);

const mailingLabelsParams = {
  mailingLabelsRouter,
  pdfDirectoryPath,
  clientCollection,
  settingsCollection,
  pdfUtilities,
  authenticationUtilities,
  parseq
};

MailingLabelsController(mailingLabelsParams);

const userRouter = express.Router();

app.use(userRouter);

const userParams = {
  userRouter,
  userCollection,
  authenticationUtilities,
  parseq
};

UserController(userParams);

const clientRouter = express.Router();

app.use(clientRouter);

const clientParams = {
  clientRouter,
  clientCollection,
  templateCollection,
  clientsFileUtilities,
  authenticationUtilities,
  parseq
};

ClientController(clientParams);

const templateRouter = express.Router();

app.use(templateRouter);

const templateParams = {
  templateRouter,
  clientCollection,
  templateCollection,
  authenticationUtilities,
  parseq
};

TemplateController(templateParams);

const attachmentRouter = express.Router();

app.use(attachmentRouter);

const attachmentParams = {
  attachmentRouter,
  attachmentDirectoryPath,
  path,
  multer,
  attachmentService,
  templateCollection,
  authenticationUtilities,
  parseq
};

AttachmentController(attachmentParams);
