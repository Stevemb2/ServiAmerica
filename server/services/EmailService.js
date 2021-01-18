const EmailService = emailParams => {
  const {
    templateCollection,
    nodeMailer,
    path,
    formatterUtilities,
    dateUtilities,
    logger
  } = emailParams;

  let interval;
  let timeout;
  let time = 2 * 1000;
  let timeInterval = 60 * 1000;

  const addEmailToTemplate = (templateName, email) => {
    return (callback, templateRecord) => {
      templateCollection.templateModel.findOne(
        { name: templateName },
        (err, template) => {
          if (err) {
            logger.warn(`Error: ${err}`);

            return callback(undefined, err);
          } else {
            const emailArray = template.emailArray;

            if (emailArray.includes(email)) {
              logger.debug(
                `${email} already exists for template: ${templateName}`
              );
            } else {
              emailArray.push(email);
              emailArray.sort();

              templateCollection.templateModel.updateOne(
                { emailArray: emailArray },
                (err, result) => {
                  if (err) {
                    logger.warn(`Failed to update template: ${templateName}`);
                  } else {
                    emailArray.sort();
                    logger.debug(
                      `Successfully added ${email} from template: ${templateName}`
                    );
                  }
                }
              );
            }

            return callback(emailArray);
          }
        }
      );
    };
  };

  const deleteEmailFromTemplate = (templateName, email) => {
    return (callback, templateRecord) => {
      templateCollection.templateModel.findOne(
        { name: templateName },
        (err, template) => {
          if (err) {
            logger.warn(`Error: ${err}`);

            return callback(undefined, err);
          } else {
            const emailArray = template.emailArray;

            if (emailArray.includes(email)) {
              logger.debug(
                `${email} already exists for template: ${templateName}`
              );
            } else {
              let newEmailArray = [];

              emailArray.forEach(emailParam => {
                if (email !== emailParam) {
                  newEmailArray.push(email);
                }
              });

              newEmailArray.sort();

              // Add newEmailArray to templateModel
              templateCollection.templateModel.updateOne(
                { emailArray: newEmailArray },
                (err, result) => {
                  if (err) {
                    logger.warn(`Failed to update template: ${templateName}`);
                  } else {
                    logger.debug(
                      `Successfully deleted ${email} from template: ${templateName}`
                    );
                  }
                }
              );
            }

            return callback(emailArray);
          }
        }
      );
    };
  };

  const sendEmails = (senderEmail, attachmentDirectoryPath) => {
    return (callback, value) => {
      const { clientArray, template, test } = value;

      let emailArray = template.emailArray;
      let attachmentArray = template.attachmentArray;

      try {
        let client;

        emailArray.forEach((email, index) => {
          clientArray.every(clientElement => {
            if (clientElement.email === email) {
              client = clientElement;
              return false;
            } else {
              return true;
            }
          });

          if (client === undefined) {
            throw "Failed to send emails. Client not found";
          }

          let emailParams = {
            senderEmail,
            email,
            subject: template.subject,
            body: template.body,
            attachmentArray,
            attachmentDirectoryPath,
            client,
            test
          };

          sendEmail(emailParams);
        });

        let message = `Successfully sent emails for template name: ${template.name}`;

        logger.debug(message);

        return callback(message, undefined);
      } catch (err) {
        logger.warn(err);

        return callback(undefined, err);
      }
    };
  };

  const sendEmail = emailParams => {
    let {
      senderEmail,
      email,
      subject,
      body,
      attachmentArray,
      attachmentDirectoryPath,
      client,
      test
    } = emailParams;

    body = formatterUtilities.formatBody(body, client);

    // setup e-mail data
    let mailOptions = {
      from: senderEmail, // sender address (who sends)
      to: email, // receiver address (who receives)
      subject: subject, // Subject line
      text: body // plaintext body
    };

    const attachmentOptionArray = [];

    attachmentArray.forEach(attachment => {
      let attachmentPath = path.join(attachmentDirectoryPath, attachment);

      let attachmentOption = {
        filename: attachment,
        path: attachmentPath,
        cid: "stevenbjava@yahoo.com" // should be as unique as possible
      };

      attachmentOptionArray.push(attachmentOption);
    });

    if (attachmentOptionArray.length > 0) {
      // Add an array of attachments
      mailOptions["attachments"] = attachmentOptionArray;
    }

    if (!test) {
      let transporter = getTransporter();

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          logger.debug(err);
        } else {
          logger.debug(`Successfully test sent email: ${email}`);
        }
      });
    } else {
      logger.debug(`Successfully test sent email: ${email}`);
    }
  };

  // Create reusable transporter object using the default SMTP transport
  const getTransporter = () => {
    let transporter;

    // Must set the following environment variables first
    let emailUser = process.env.EMAIL_USER;
    let emailPassword = process.env.EMAIL_PASSWORD;

    transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    return transporter;
  };

  const startSendingBirthdateEmails = (
    senderEmail,
    attachmentDirectoryPath
  ) => {
    if (!test) {
      timeInterval = dateUtilities.getCurrentYearInMilliseconds();
    }

    return (callback, value) => {
      const { clientArray, template, test } = value;

      let emailArray = template.emailArray;
      let attachmentArray = template.attachmentArray;

      try {
        let client;

        emailArray.forEach(email => {
          clientArray.every(clientElement => {
            if (clientElement.email === email) {
              client = clientElement;
              return false;
            } else {
              return true;
            }
          });

          if (client === undefined) {
            throw "Failed to send emails. Client not found";
          }

          let emailParams = {
            senderEmail,
            email,
            subject: template.subject,
            body: template.body,
            attachmentArray,
            attachmentDirectoryPath,
            client,
            test
          };

          if (!test) {
            time = dateUtilities.getMillisecondsUntilBirthdate(
              client.birthday,
              client.birthmonth
            );
          }

          interval = setInterval(() => {
            timeout = setTimeout(() => {
              sendEmail(emailParams);
            }, time);
          }, timeInterval);
        });

        const message = "Successfully started sending birthday emails";

        return callback(message, undefined);
      } catch (err) {
        logger.warn(err);

        return callback(undefined, err);
      }
    };
  };

  const stopSendingBirthdateEmails = () => {
    return (callback, value) => {
      clearInterval(interval);
      clearTimeout(timeout);
      const message = "Successfully stopped sending birthday emails";

      return callback(message, undefined);
    };
  };

  return Object.freeze({
    addEmailToTemplate,
    deleteEmailFromTemplate,
    sendEmails,
    startSendingBirthdateEmails,
    stopSendingBirthdateEmails
  });
};

module.exports = EmailService;
