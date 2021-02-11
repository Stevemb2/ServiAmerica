const AttachmentController = attachmentParams => {
  const {
    attachmentRouter,
    attachmentDirectoryPath,
    path,
    multer,
    attachmentService,
    templateCollection,
    authenticationUtilities,
    parseq
  } = attachmentParams;

  attachmentRouter.post("/upload-attachment",
    authenticationUtilities.verify,
    (req, res) => {
      const fileFilter = (req, file, cb) => {
        if (
          file.mimetype === "text/plain" ||
          file.mimetype === "text/html" ||
          file.mimetype === "application/msword" ||
          file.mimetype === "application/postscript" ||
          file.mimetype === "text/richtext" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/gif"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      };

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, attachmentDirectoryPath);
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

  attachmentRouter.get(
    "/get-attachment-array",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const getAttachmentArray = attachmentService.getAttachmentArray(
        attachmentDirectoryPath
      );

      parseq.sequence([getAttachmentArray])((value, err) => {
        if (err) {
          res.send(JSON.stringify(err));
        } else {
          res.send(value.attachmentArray);
        }
      });
    }
  );

  attachmentRouter.delete(
    "/remove-attachment",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const attachmentName = req.body.attachmentName;

      const attachmentPath = path.join(attachmentDirectoryPath, attachmentName);

      // Remove attachment file
      const remove = attachmentService.removeAttachment(attachmentPath);

      // Find all templates.
      const findAllTemplates = templateCollection.findAll(); // gets templateArray

      let message;

      parseq.sequence([remove, findAllTemplates])((value, err) => {
        if (err) {
          res.send(JSON.stringify(err));
        } else {
          const templateArray = value.templateArray;

          // For each template remove attachment from the attachmentArray.
          templateArray.every(template => {
            message = templateCollection.removeAttachment(
              attachmentName,
              template
            );

            if (message) {
              return false; // break out of loop
            } else {
              return true;
            }
          });

          res.send(message);
        }
      });
    }
  );
};

export default AttachmentController;
