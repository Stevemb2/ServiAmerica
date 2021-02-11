const SettingsController = settingsParams => {
  const {
    settingsRouter,
    settingsCollection,
    authenticationUtilities,
    parseq,
    logger
  } = settingsParams;

  settingsRouter.get(
    "/find-settings",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const find = settingsCollection.find();

      parseq.sequence([find])((settings, err) => {
        if (err) {
          res.send({
            message: err
          });
        } else {
          res.send({
            isError: false,
            settings: settings
          });
        }
      });
    }
  );

  settingsRouter.post(
    "/set-sender-email",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const senderEmail = req.body.senderEmail;

      const update = settingsCollection.update({
        senderEmail
      });

      parseq.sequence([update])((value, err) => {
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

  settingsRouter.post(
    "/set-template-name",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const templateName = req.body.templateName;

      const update = settingsCollection.update({
        templateName
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

  settingsRouter.post(
    "/set-client-email",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const clientEmail = req.body.clientEmail;

      const update = settingsCollection.update({
        clientEmail
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

  settingsRouter.get(
    "/get-send-birthdate-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      settingsCollection.find(err, () => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err)
          });
        } else {
          res.send({
            isError: false,
            sendBirthdateEmails: settingsCollection.sendBirthdateEmails
          });
        }
      });
    }
  );

  settingsRouter.post(
    "/set-send-birthdate-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      sendBirthdateEmails = req.body.sendBirthdateEmails;

      const update = settingsCollection.update({
        sendBirthdateEmails
      });

      // TODO run birthday emails

      parseq.sequence([update])((message, err) => {
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

  settingsRouter.get(
    "/get-is-test",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      settingsCollection.find(err, () => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err)
          });
        } else {
          res.send({
            isError: false,
            test: settingsCollection.test
          });
        }
      });
    }
  );

  settingsRouter.post(
    "/set-is-test",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      test = req.body.test;

      const update = settingsCollection.update({
        test
      });

      parseq.sequence([update])((message, err) => {
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

  settingsRouter.get(
    "/find-mailing-label-info",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const find = settingsCollection.find();

      parseq.sequence([find])((data, err) => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err)
          });
        } else {
          const message = `Found mailing label font, size, and spacing.`;

          logger.debug(message);

          res.send({
            isError: false,
            mailingLabelFont: data.mailingLabelFont,
            mailingLabelFontSize: data.mailingLabelFontSize,
            mailingLabelSpacing: data.mailingLabelSpacing
          });
        }
      });
    }
  );

  // Attachments

  settingsRouter.get(
    "/get-attachment",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const find = settingsCollection.find();

      parseq.sequence([find])((data, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err
          });
        } else {
          const message = `Found attachment.`;

          logger.debug(message);

          res.send({
            isError: false,
            attachment: data.attachment
          });
        }
      });
    }
  );

  settingsRouter.post(
    "/set-attachment",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      attachment = req.body.attachment;

      const update = settingsCollection.update({
        attachment
      });

      parseq.sequence([update])((message, err) => {
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
};

export default SettingsController;
