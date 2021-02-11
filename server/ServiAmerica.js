// Imported Packages

import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import multer from "multer";
import os from "os";
import mongoose from "mongoose";
import nodeMailer from "nodemailer";
import pdfkit from "pdfkit";
import jwt from "jsonwebtoken";
import winston from "winston";
import bcrypt from "bcrypt";
//import lodash = from "lodash";
import { fileURLToPath } from 'url';

// Parseq for handling asynchronous functions
import parseq from "./parseq/parseq.js";

// Utilities

import DateUtilities from "./utilities/DateUtilities.js";
import TaxRatesUtilities from "./utilities/TaxRatesUtilities.js";
import PDFUtilities from "./utilities/PDFUtilities.js";
import FormatterUtilities from "./utilities/FormatterUtilities.js";
import ClientsFileUtilities from "./utilities/ClientsFileUtilities.js";
import AuthenticationUtilities from "./utilities/AuthenticationUtilities.js";

// MongoDB Database Collections

import UserCollection from "./database/UserCollection.js";
import ClientCollection from "./database/ClientCollection.js";
import TemplateCollection from "./database/TemplateCollection.js";
import SettingsCollection from "./database/SettingsCollection.js";

// Service

import TaxEstimatorService from "./services/TaxEstimatorService.js";
import TaxTableService from "./services/TaxTableService.js";
import EmailService from "./services/EmailService.js";
import AttachmentService from "./services/AttachmentService.js";

// Controllers

import TaxEstimatorController from "./controllers/TaxEstimatorController.js";
import TaxTableController from "./controllers/TaxTableController.js";
import EmailController from "./controllers/EmailController.js";
import MailingLabelsController from "./controllers/MailingLabelsController.js";
import ClientController from "./controllers/ClientController.js";
import TemplateController from "./controllers/TemplateController.js";
import AttachmentController from "./controllers/AttachmentController.js";
import UserController from "./controllers/UserController.js";
import SettingsController from "./controllers/SettingsController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
