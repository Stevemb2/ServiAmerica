const ClientController = clientParams => {
  const {
    clientRouter,
    clientCollection,
    templateCollection,
    clientsFileUtilities,
    authenticationUtilities,
    parseq
  } = clientParams;

  clientRouter.get(
    "/find-all-clients",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const findAll = clientCollection.findAll();

      parseq.sequence([findAll])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err,
            clientArray: []
          });
        } else {
          const clientArray = value.clientArray;

          res.send({
            isError: false,
            clientArray: clientArray
          });
        }
      });
    }
  );

  clientRouter.get(
    "/find-client",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const email = req.query.email;

      const find = clientCollection.find(email);

      parseq.sequence([find])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err,
            client: ""
          });
        } else {
          res.send({
            isError: false,
            client: value.client
          });
        }
      });
    }
  );

  clientRouter.post("/add-guest", (req, res) => {
    res.type("application/json");

    const email = req.body.email;
    const honorific = req.body.honorific;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const areacode = +req.body.areacode;
    const prefix = +req.body.prefix;
    const linenumber = +req.body.linenumber;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const language = req.body.language;
    const birthmonth = req.body.birthmonth;
    const birthday = req.body.birthday;
    const birthyear = req.body.birthyear;
    const status = req.body.status;

    const create = clientCollection.create({
      email,
      honorific,
      firstname,
      lastname,
      areacode,
      prefix,
      linenumber,
      address,
      city,
      state,
      zip,
      language,
      birthmonth,
      birthday,
      birthyear,
      status
    });

    parseq.sequence([create])((value, err) => {
      if (err) {
        res.send({
          isError: true,
          message: err
        });
      } else {
        res.send({
          isError: false
        });
      }
    });
  });

  clientRouter.post(
    "/add-client",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const email = req.body.email;
      const honorific = req.body.honorific;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const areacode = +req.body.areacode;
      const prefix = +req.body.prefix;
      const linenumber = +req.body.linenumber;
      const address = req.body.address;
      const city = req.body.city;
      const state = req.body.state;
      const zip = req.body.zip;
      const language = req.body.language;
      const birthmonth = req.body.birthmonth;
      const birthday = req.body.birthday;
      const birthyear = req.body.birthyear;
      const status = req.body.status;

      const create = clientCollection.create({
        email,
        honorific,
        firstname,
        lastname,
        areacode,
        prefix,
        linenumber,
        address,
        city,
        state,
        zip,
        language,
        birthmonth,
        birthday,
        birthyear,
        status
      });

      parseq.sequence([create])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err
          });
        } else {
          res.send({
            isError: false
          });
        }
      });
    }
  );

  clientRouter.put(
    "/update-client",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const email = req.body.email;
      const honorific = req.body.honorific;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const areacode = +req.body.areacode;
      const prefix = +req.body.prefix;
      const linenumber = +req.body.linenumber;
      const address = req.body.address;
      const city = req.body.city;
      const state = req.body.state;
      const zip = req.body.zip;
      const language = req.body.language;
      const birthmonth = req.body.birthmonth;
      const birthday = req.body.birthday;
      const birthyear = req.body.birthyear;
      const status = req.body.status;

      const update = clientCollection.update({
        email,
        honorific,
        firstname,
        lastname,
        areacode,
        prefix,
        linenumber,
        address,
        city,
        state,
        zip,
        language,
        birthmonth,
        birthday,
        birthyear,
        status
      });

      parseq.sequence([update])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err
          });
        } else {
          res.send({
            isError: false
          });
        }
      });
    }
  );

  clientRouter.delete(
    "/delete-client",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const email = req.body.email;

      const removeClient = clientCollection.remove(email);
      const findAllTemplates = templateCollection.findAll();

      parseq.sequence([removeClient, findAllTemplates])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err
          });
        } else {
          const templateArray = value.templateArray;

          const updateTemplateArray = [];

          templateArray.forEach(template => {
            const emailArray = template.emailArray;

            const newEmailArray = [];

            emailArray.forEach(emailElement => {
              if (emailElement !== email) {
                newEmailArray.push(emailElement);
              }
            });

            if (emailArray.length !== newEmailArray.length) {
              template.emailArray = newEmailArray;

              const templateUpdate = templateCollection.update(template);

              updateTemplateArray.push(templateUpdate);
            }
          });

          if (updateTemplateArray && updateTemplateArray.length > 0) {
            parseq.parallel(updateTemplateArray)((value, err) => {
              if (err) {
                res.send({
                  isError: true,
                  message: err
                });
              } else {
                res.send({
                  isError: false
                });
              }
            });
          } else {
            res.send({
              isError: false
            });
          }
        }
      });
    }
  );

  // TODO finish routes below!!!

  clientRouter.get(
    "/get-clients-file-array",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const getClientsFileArray = clientsFileUtilities.getClientsFileArray();

      parseq.sequence([getClientsFileArray])((value, err) => {
        if (err) {
          res.send({
            message: err,
            clientsFileArray: []
          });
        } else {
          const clientsFileNameArray = value.fileNameArray;

          res.send({
            message: err,
            clientsFileNameArray
          });
        }
      });
    }
  );

  clientRouter.post(
    "/upload-clients",
    authenticationUtilities.verify,
    (req, res) => {
      const fileFilter = (req, file, cb) => {
        if (file.mimetype === "text/plain") {
          cb(null, true);
        } else {
          cb(null, false);
        }
      };

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, clientsDirectoryPath);
        },
        filename: (req, file, cb) => {
          //let currentDate = new Date().toISOString();
          let fileName = `${file.originalname}`;

          cb(null, fileName);
        }
      });

      const upload = multer({
        storage: storage,
        limits: {
          fileSize: 1024 * 1024 * 5
        }
        //fileFilter: fileFilter
      }).single("file");

      upload(req, res, function(err) {
        let isError = false;
        let message = "";

        if (err instanceof multer.MulterError) {
          isError = true;
          message = `A Multer error occurred when uploading: ${err.message}`;
        } else if (err) {
          isError = true;
          message = `An unknown error occurred when uploading: ${err.message}`;
        }

        console.log(message);

        res.send({
          isError,
          message
        });
      });
    }
  );

  clientRouter.post(
    "/import-clients",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const clientsFileName = req.body.clientsFileName;

      const importClient = clientsFileUtilities.importClient(clientsFileName);

      parseq.sequence([importClient])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err,
            client: ""
          });
        } else {
          const clientArray = value.clientArray;

          const createClientArray = [];

          clientArray.forEach(client => {
            let createClient = clientCollection.create(client);
            createClientArray.push(createClient);
          });

          parseq.parallel(createClientArray)((value, err) => {
            if (err) {
              res.send({
                isError: true,
                message: err,
                client: ""
              });
            } else {
              const findAll = clientCollection.findAll();

              parseq.sequence([findAll])((value, err) => {
                if (err) {
                  res.send({
                    isError: true,
                    message: err,
                    client: ""
                  });
                } else {
                  res.send({
                    isError: false,
                    clientArray: value.clientArray
                  });
                }
              });
            }
          });
        }
      });
    }
  );

  clientRouter.post(
    "/export-clients",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const clientsFileName = req.body.clientsFileName;

      const findAll = clientCollection.findAll();
      const exportClient = clientsFileUtilities.exportClient(clientsFileName);

      parseq.sequence([findAll, exportClient])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err,
            client: ""
          });
        } else {
          res.send({
            isError: false,
            client: value.client
          });
        }
      });
    }
  );

  clientRouter.delete(
    "/delete-clients",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const clientsFileName = req.body.clientsFileName;

      const findAll = clientCollection.findAll();
      const importClient = clientsFileUtilities.importClient(clientsFileName);

      parseq.sequence([findAll, importClient])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err,
            client: ""
          });
        } else {
          res.send({
            isError: false,
            client: value.client
          });
        }
      });
    }
  );
};

module.exports = ClientController;
