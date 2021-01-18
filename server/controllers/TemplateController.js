const TemplateController = templateParams => {
  const {
    templateRouter,
    clientCollection,
    templateCollection,
    authenticationUtilities,
    parseq
  } = templateParams;

  templateRouter.get(
    "/find-template",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.query.name;

      const find = templateCollection.find(name);

      parseq.sequence([find])((templateRecord, err) => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err)
          });
        } else {
          res.send({
            isError: false,
            templateRecord: templateRecord
          });
        }
      });
    }
  );

  templateRouter.get(
    "/find-all-templates",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const findAll = templateCollection.findAll();

      parseq.sequence([findAll])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: JSON.stringify(err),
            templateArray: []
          });
        } else {
          const templateArray = value.templateArray;

          res.send({
            isError: false,
            templateArray: templateArray
          });
        }
      });
    }
  );

  templateRouter.post(
    "/add-template",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;
      const subject = req.body.subject;
      const body = req.body.body;
      const type = req.body.type;

      const create = templateCollection.create({
        name,
        subject,
        body,
        type
      });

      parseq.sequence([create])((message, err) => {
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

  templateRouter.put(
    "/update-template",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;
      const subject = req.body.subject;
      const body = req.body.body;
      const type = req.body.type;

      const update = templateCollection.update({
        name,
        subject,
        body,
        type
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

  templateRouter.delete(
    "/delete-template",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;

      const remove = templateCollection.remove(name);

      parseq.sequence([remove])((message, err) => {
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

  templateRouter.get(
    "/get-template-email-array",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.query.name;

      const getTemplateEmailArray = templateCollection.getTemplateEmailArray(
        name
      );

      parseq.sequence([getTemplateEmailArray])((emailArray, err) => {
        if (err) {
          res.send({
            isError: true,
            message: `Failed to get template email array for template name: ${name}, error: ${err}`
          });
        } else {
          res.send({
            isError: false,
            emailArray: emailArray
          });
        }
      });
    }
  );

  templateRouter.post(
    "/add-template-email",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;
      const email = req.body.email;

      const addTemplateEmail = templateCollection.addTemplateEmail(name, email);

      parseq.sequence([addTemplateEmail])((data, err) => {
        if (err) {
          res.send({
            isError: true,
            message: `Failed to add email: ${email} to template name: ${name}, error: ${err}`
          });
        } else {
          res.send({
            isError: false,
            emailArray: data.emailArray
          });
        }
      });
    }
  );

  templateRouter.post(
    "/add-all-template-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;

      const findAll = clientCollection.findAll();

      const addAllTemplateEmails = templateCollection.addAllTemplateEmails(
        name
      );

      parseq.sequence([findAll, addAllTemplateEmails])((data, err) => {
        if (err) {
          res.send({
            isError: true,
            message: `Failed to add all emails to template name: ${name}, error: ${err}`
          });
        } else {
          res.send({
            isError: false,
            message: data.message,
            emailArray: data.emailArray
          });
        }
      });
    }
  );

  templateRouter.delete(
    "/delete-template-email",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;
      const email = req.body.email;

      const removeTemplateEmail = templateCollection.removeTemplateEmail(
        name,
        email
      );

      parseq.sequence([removeTemplateEmail])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: `Failed to delete email: ${email} to template name: ${name}, error: ${err}`
          });
        } else {
          res.send({
            isError: false,
            emailArray: value.emailArray
          });
        }
      });
    }
  );

  templateRouter.delete(
    "/delete-all-template-emails",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const name = req.body.name;

      const removeAllTemplateEmails = templateCollection.removeAllTemplateEmails(
        name
      );

      parseq.sequence([removeAllTemplateEmails])((data, err) => {
        if (err) {
          res.send({
            isError: true,
            message: `Failed to delete all emails to template name: ${name}, error: ${err}`
          });
        } else {
          res.send({
            isError: false,
            message: data.message,
            emailArray: data.emailArray
          });
        }
      });
    }
  );

  templateRouter.post(
    "/attach-attachment",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const template = req.body.template;
      const attachmentName = req.body.attachmentName;

      const attachAttachment = templateCollection.attachAttachment(
        template,
        attachmentName
      );

      parseq.sequence([attachAttachment])((value, err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            isError: false,
            template: value.template
          });
        }
      });
    }
  );

  templateRouter.delete(
    "/dettach-attachment",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const template = req.body.template;
      const attachmentName = req.body.attachmentName;

      const dettachAttachment = templateCollection.dettachAttachment(
        template,
        attachmentName
      );

      parseq.sequence([dettachAttachment])((value, err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            isError: false,
            template: value.template
          });
        }
      });
    }
  );
};

module.exports = TemplateController;
