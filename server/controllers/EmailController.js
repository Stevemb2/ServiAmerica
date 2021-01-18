const EmailController = emailParams => {
  const {
    emailRouter,
    settingsCollection,
    templateCollection,
    clientCollection,
    emailService,
    attachmentDirectoryPath,
    authenticationUtilities,
    parseq,
    logger
  } = emailParams;

  emailRouter.post(
    "/send-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const senderEmail = req.body.senderEmail;
      const name = req.body.name;

      const findAllClients = clientCollection.findAll();

      const findTemplate = templateCollection.find(name);

      const findSettings = settingsCollection.findTest();

      const sendEmails = emailService.sendEmails(
        senderEmail,
        attachmentDirectoryPath
      );

      parseq.sequence([findAllClients, findTemplate, findSettings, sendEmails])(
        (message, err) => {
          if (err) {
            logger.warn(
              `Failed to send emails for template name: ${name}, error: ${err}`
            );

            res.send({
              isError: true,
              message: err
            });
          } else {
            logger.debug(`Successfully sent emails for template name: ${name}`);

            res.send({
              isError: false,
              message
            });
          }
        }
      );
    }
  );

  emailRouter.post(
    "/start-sending-birthdate-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const senderEmail = req.body.senderEmail;

      const findAllClients = clientCollection.findAll();

      const findSettings = settingsCollection.findTest();

      const findTemplateByType = templateCollection.findByType("birthday");

      const startSendingBirthdateEmails = emailService.startSendingBirthdateEmails(
        senderEmail,
        attachmentDirectoryPath
      );

      parseq.sequence([
        findAllClients,
        findSettings,
        findTemplateByType,
        startSendingBirthdateEmails
      ])((message, err) => {
        if (err) {
          logger.warn(
            `Failed to start sending birthdate emails, error: ${err}`
          );

          res.send({
            isError: true,
            message: err
          });
        } else {
          logger.debug(`Successfully started sending birthdate emails}`);

          res.send({
            isError: false,
            message
          });
        }
      });
    }
  );

  emailRouter.post(
    "/stop-sending-birthdate-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const stopSendingBirthdateEmails = emailService.stopSendingBirthdateEmails();

      parseq.sequence([stopSendingBirthdateEmails])((message, err) => {
        if (err) {
          logger.warn(`Failed to stop sending birthdate emails, error: ${err}`);

          res.send({
            isError: true,
            message: err
          });
        } else {
          logger.debug(`Successfully stopped sending birthdate emails}`);

          res.send({
            isError: false,
            message
          });
        }
      });
    }
  );
};

module.exports = EmailController;
