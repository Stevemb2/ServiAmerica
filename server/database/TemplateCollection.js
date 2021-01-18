const templateCollection = (mongoose, logger) => {
  const Schema = mongoose.Schema;

  const templateSchema = new Schema(
    {
      name: { type: String, required: true, unique: true },
      subject: { type: String, required: true },
      body: { type: String, required: true },
      type: { type: String, required: true },
      emailArray: { type: Array, required: true },
      attachmentArray: { type: Array, required: true }
    },
    { timestamps: true }
  );

  const templateModel = mongoose.model("template", templateSchema);

  const find = name => {
    return (callback, value) => {
      templateModel.findOne({ name: name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (template) {
            logger.debug(
              `Found template with name: ${template.name}, subject: ${template.subject}`
            );

            if (value === undefined) {
              value = {};
            }

            value.template = template;

            return callback(value, undefined);
          } else {
            const message = `Failed to find template with name: ${name}, subject: ${template.subject}`;
            logger.debug(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const findByType = type => {
    return (callback, value) => {
      templateModel.findOne({ type: type }, (err, template) => {
        if (err) {
          const message = `Failed to find template with type: ${type}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (template) {
            logger.debug(`Found template with type: ${template.type}`);

            if (value === undefined) {
              value = {};
            }

            value.template = template;

            return callback(value, undefined);
          } else {
            const message = `Failed to find template with type: ${type}`;
            logger.debug(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const findAll = () => {
    return (callback, value) => {
      templateModel.where({}).find((err, templateArray) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          logger.debug(`Found all templates`);

          if (value === undefined) {
            value = {};
          }

          value.templateArray = templateArray;

          return callback(value, undefined);
        }
      });
    };
  };

  const create = template => {
    return (callback, value) => {
      templateModel(template).save(err => {
        if (err) {
          const message = `Failed to add template with name: ${template.name}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          const message = `Successfully created template with name: ${template.name}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  const update = template => {
    return (callback, value) => {
      templateModel
        .where({ name: template.name })
        .updateOne(template, (err, result) => {
          if (err) {
            const message = `Failed to update template with name: ${template.name}, error: ${err}`;
            logger.error(message);
            return callback(undefined, message);
          } else {
            const message = `Successfully updated template with name: ${template.name}`;
            logger.debug(message);
            return callback(message, undefined);
          }
        });
    };
  };

  const remove = name => {
    return (callback, value) => {
      templateModel.remove({ name: name }, (err, result) => {
        if (err) {
          const message = `Failed to remove template with name: ${template.name}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          const message = `Successfully removed template with name: ${template.name}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  // For a template name find all of the emails
  const getTemplateEmailArray = templateName => {
    return (callback, value) => {
      templateModel.findOne({ name: templateName }, (err, template) => {
        if (err) {
          logger.warn(`Error: ${err}`);

          return callback(undefined, err);
        } else {
          const emailArray = template.emailArray;

          let emails = "";

          emailArray.forEach(email => {
            emails += `${email}, `;
          });

          logger.debug(
            `For template name: ${templateName} fund following addresses: ${emails}`
          );

          return callback(emailArray);
        }
      });
    };
  };

  const addTemplateEmail = (name, email) => {
    return (callback, value) => {
      templateModel.findOne({ name: name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (template) {
            template.emailArray.push(email);

            templateModel
              .where({ name: template.name })
              .updateOne(template, (err, result) => {
                if (err) {
                  const message = `Faiiled to add email: ${email} to template: ${template.name}, error: ${err}`;
                  logger.error(message);
                  return callback(undefined, message);
                } else {
                  if (value === undefined) {
                    value = {};
                  }

                  const message = `Successfully added email: ${email} to template: ${template.name}`;
                  logger.debug(message);

                  value.emailArray = template.emailArray;

                  return callback(value, undefined);
                }
              });
          } else {
            const message = `Failed to find template: ${template.name}`;
            logger.error(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const addAllTemplateEmails = name => {
    return (callback, value) => {
      templateModel.findOne({ name: name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (template) {
            const clientArray = value.clientArray;

            clientArray.forEach(client => {
              template.emailArray.push(client.email);
            });

            templateModel
              .where({ name: template.name })
              .updateOne(template, (err, result) => {
                if (err) {
                  const message = `Failed to add all client emails to template: ${template.name}, error: ${err}`;
                  logger.error(message);
                  return callback(undefined, message);
                } else {
                  const message = `Successfully added all client emails to template: ${template.name}`;
                  logger.debug(message);

                  const data = {
                    message: message,
                    emailArray: template.emailArray
                  };

                  return callback(data, undefined);
                }
              });
          } else {
            const message = `Failed to find template: ${template.name}`;
            logger.error(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const removeTemplateEmail = (name, email) => {
    return (callback, value) => {
      templateModel.findOne({ name: name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return message;
        } else {
          if (value === undefined) {
            value = {};
          }

          if (template) {
            const emailArray = template.emailArray;
            const newEmailArray = [];

            emailArray.forEach(emailElement => {
              if (emailElement !== email) {
                newEmailArray.push(emailElement);
              }
            });

            template.emailArray = newEmailArray;

            templateModel
              .where({ name: name })
              .updateOne(template, (err, result) => {
                if (err) {
                  const message = `Failed to remove email: ${email} to template: ${template.name}, error: ${err}`;
                  logger.error(message);
                  return callback(undefined, message);
                } else {
                  if (value === undefined) {
                    value = {};
                  }

                  const message = `Successfully removed email: ${email} from template: ${template.name}`;
                  logger.debug(message);

                  value.message = message;
                  value.emailArray = template.emailArray;

                  return callback(value, undefined);
                }
              });
          } else {
            const message = `Failed to find template: ${template.name}`;
            logger.error(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const removeAllTemplateEmails = (name, email) => {
    return (callback, value) => {
      templateModel.findOne({ name: name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return message;
        } else {
          if (template) {
            template.emailArray = [];

            templateModel
              .where({ name: name })
              .updateOne(template, (err, result) => {
                if (err) {
                  const message = `Failed to remove all emails to template: ${template.name}, error: ${err}`;
                  logger.error(message);
                  return callback(undefined, message);
                } else {
                  const message = `Successfully removed all emails from template: ${template.name}`;
                  logger.debug(message);

                  const value = {
                    message: message,
                    emailArray: template.emailArray
                  };

                  return callback(value, undefined);
                }
              });
          } else {
            const message = `Failed to find template: ${template.name}`;
            logger.error(message);
            return;
          }
        }
      });
    };
  };

  const attachAttachment = (template, attachmentName) => {
    return (callback, value) => {
      templateModel.findOne({ name: template.name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${template.name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (template) {
            template.attachmentArray.push(attachmentName);

            templateModel
              .where({ name: template.name })
              .updateOne(template, (err, result) => {
                if (err) {
                  const message = `Faiiled to add attachment: ${attachmentName} to template: ${template.name}, error: ${err}`;

                  logger.error(message);

                  return callback(undefined, message);
                } else {
                  const message = `Successfully added attachment: ${attachmentName} to template: ${template.name}`;

                  logger.debug(message);

                  return callback(
                    {
                      template,
                      message
                    },
                    undefined
                  );
                }
              });
          } else {
            const message = `Failed to find template: ${template.name}`;

            logger.error(message);

            return callback(undefined, message);
          }
        }
      });
    };
  };

  const dettachAttachment = (template, attachmentName) => {
    return (callback, value) => {
      templateModel.findOne({ name: template.name }, (err, template) => {
        if (err) {
          const message = `Failed to find template with name: ${template.name}, subject: ${template.subject}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (template) {
            const newAttachmentArray = [];

            template.attachmentArray.forEach(element => {
              if (element !== attachmentName) {
                newAttachmentArray.push(element);
              }
            });

            template.attachmentArray = newAttachmentArray;

            templateModel
              .where({ name: template.name })
              .updateOne(template, (err, result) => {
                if (err) {
                  const message = `Failed to remove attachment: ${attachmentName} to template: ${template.name}, error: ${err}`;

                  logger.error(message);

                  return callback(undefined, {
                    message
                  });
                } else {
                  const message = `Successfully removed attachment: ${attachmentName} to template: ${template.name}`;

                  logger.debug(message);

                  return callback(
                    {
                      template,
                      message
                    },
                    undefined
                  );
                }
              });
          } else {
            const message = `Failed to find template: ${template.name}`;

            logger.error(message);

            return callback(undefined, {
              message
            });
          }
        }
      });
    };
  };

  const removeAttachment = (attachmentName, template) => {
    const attachmentArray = template.attachmentArray;

    // Remove attachment from attachment array
    const newAttachmentArray = [];

    attachmentArray.forEach(attachmentElement => {
      if (attachmentElement !== attachmentName) {
        newAttachmentArray.push(attachmentElement);
      }
    });

    template.attachmentArray = newAttachmentArray;

    templateModel
      .where({ name: template.name })
      .updateOne(template, (err, result) => {
        if (err) {
          const message = `Failed to remove attachment: ${attachmentName} to template: ${template.name}, error: ${err}`;
          logger.error(message);
          return message;
        } else {
          const message = `Successfully removed attachment: ${attachmentName} to template: ${template.name}`;
          logger.debug(message);
          return;
        }
      });
  };

  return Object.freeze({
    templateModel,
    find,
    findByType,
    findAll,
    create,
    update,
    remove,
    getTemplateEmailArray,
    addTemplateEmail,
    addAllTemplateEmails,
    removeTemplateEmail,
    removeAllTemplateEmails,
    attachAttachment,
    dettachAttachment,
    removeAttachment
  });
};

module.exports = templateCollection;
