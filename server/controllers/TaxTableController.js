const TaxTableController = taxTableParams => {
  const {
    taxTableRouter,
    taxTableDirectoryPath,
    path,
    multer,
    taxTableService,
    authenticationUtilities,
    parseq,
    logger
  } = taxTableParams;

  taxTableRouter.post(
    "/upload-tax-table",
    authenticationUtilities.verify,
    (req, res) => {
      const fileFilter = (req, file, cb) => {
        if (
          file.mimetype === "text/plain" ||
          file.mimetype === "text/html" ||
          file.mimetype === "application/msword"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      };

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, taxTableDirectoryPath);
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
          message = `A Multer error occurred when uploading tax table file: ${err.message}`;
          logger.warn(message);
        } else if (err) {
          isError = true;
          message = `An unknown error occurred when uploading tax table file: ${err.message}`;
          logger.warn(message);
        } else {
          logger.debug(message);
        }

        res.send({
          isError,
          message
        });
      });
    }
  );

  taxTableRouter.get(
    "/get-tax-table-array",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const getTaxTableArray = taxTableService.getTaxTableArray(
        taxTableDirectoryPath
      );

      parseq.sequence([getTaxTableArray])((taxTableArray, err) => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err)
          });
        } else {
          res.send({
            isError: false,
            taxTableArray: taxTableArray
          });
        }
      });
    }
  );

  taxTableRouter.post(
    "/read-tax-table",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const taxTableName = req.body.taxTableName;

      const taxTablePath = path.join(taxTableDirectoryPath, taxTableName);

      const readTaxTable = taxTableService.readTaxTable(
        taxTableName,
        taxTablePath
      );

      parseq.sequence([readTaxTable])((taxDataArray, err) => {
        if (err) {
          if (err.message === "err is not defined") {
            res.send({
              isError: true,
              message: ""
            });
          } else {
            es.send({
              isError: true,
              message: JSON.stringify(err)
            });
          }
        } else {
          res.send({
            isError: false,
            message: "",
            taxDataArray: taxDataArray
          });
        }
      });
    }
  );

  taxTableRouter.delete(
    "/remove-tax-table",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const taxTableName = req.body.taxTableName;

      const taxTablePath = path.join(taxTableDirectoryPath, taxTableName);

      const removeTaxTable = taxTableService.removeTaxTable(
        taxTableName,
        taxTablePath
      );

      parseq.sequence([removeTaxTable])((message, err) => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err)
          });
        } else {
          res.send({
            isError: false
          });
        }
      });
    }
  );
};

export default TaxTableController;
