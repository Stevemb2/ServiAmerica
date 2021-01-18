const MailingLabelsController = mailingLabelsParams => {
  const {
    mailingLabelsRouter,
    pdfDirectoryPath,
    clientCollection,
    settingsCollection,
    pdfUtilities,
    authenticationUtilities,
    parseq
  } = mailingLabelsParams;

  mailingLabelsRouter.get(
    "/get-pdf",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const getPDFArray = pdfUtilities.getPDFArray(pdfDirectoryPath);

      parseq.sequence([getPDFArray])((value, err) => {
        if (err) {
          res.send({
            message: err
          });
        } else {
          res.send({
            pdfArray: value.pdfArray
          });
        }
      });
    }
  );

  mailingLabelsRouter.post(
    "/find-pdf",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const font = req.body.font;
      const size = +req.body.size;
      const spacing = +req.body.spacing;

      const updateSettings = settingsCollection.update({
        mailingLabelFont: font,
        mailingLabelFontSize: size,
        mailingLabelSpacing: spacing
      });

      const findPDF = pdfUtilities.findPDF({
        pdfDirectoryPath,
        font,
        size,
        spacing
      });

      parseq.sequence([updateSettings, findPDF])((value, err) => {
        if (err) {
          res.send({
            message: err
          });
        } else {
          res.send({
            message: undefined
          });
        }
      });
    }
  );

  mailingLabelsRouter.post(
    "/create-pdf",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const font = req.body.font;
      const size = +req.body.size;
      const spacing = +req.body.spacing;

      const findAllClients = clientCollection.findAll();

      const updateSettingsForMailingLabels = settingsCollection.updateSettingsForMailingLabels(
        {
          mailingLabelFont: font,
          mailingLabelFontSize: size,
          mailingLabelSpacing: spacing
        }
      );

      const createPDF = pdfUtilities.createPDF({
        pdfDirectoryPath,
        font,
        size,
        spacing
      });

      const getPDFArray = pdfUtilities.getPDFArray(pdfDirectoryPath);

      parseq.sequence([
        findAllClients,
        updateSettingsForMailingLabels,
        createPDF,
        getPDFArray
      ])((value, err) => {
        if (err) {
          res.send({
            message: JSON.stringify(err)
          });
        } else {
          res.send({
            pdfArray: value.pdfArray
          });
        }
      });
    }
  );

  mailingLabelsRouter.delete(
    "/delete-pdf",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const pdf = req.body.pdf;

      const removePDF = pdfUtilities.removePDF(pdfDirectoryPath, pdf);
      const getPDFArray = pdfUtilities.getPDFArray(pdfDirectoryPath);

      parseq.sequence([removePDF, getPDFArray])((value, err) => {
        if (err) {
          res.send({
            message: `Failed to delete PDF: ${err}`
          });
        } else {
          res.send(value);
        }
      });
    }
  );
};

module.exports = MailingLabelsController;
