const SettingsCollection = (mongoose, logger) => {
  const Schema = mongoose.Schema;

  const settingsSchema = new Schema({
    senderEmail: { type: String, required: true },
    templateName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    test: { type: Boolean, required: true },
    sendBirthdateEmails: { type: Boolean, required: true },
    mailingLabelFont: { type: String, required: true },
    mailingLabelFontSize: { type: Number, required: true },
    mailingLabelSpacing: { type: Number, required: true },
    attachment: { type: String, required: true }
  });

  const settingsModel = mongoose.model("settings", settingsSchema);

  const find = () => {
    return (callback, value) => {
      settingsModel.find({}, (err, settingsArray) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          const settings = settingsArray[0];
          logger.debug(`Found all settings`);
          return callback(settings, undefined);
        }
      });
    };
  };

  const findTest = () => {
    return (callback, value) => {
      settingsModel.find({}, (err, settingsArray) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          const settings = settingsArray[0];

          if (value === undefined) {
            value = {};
          }

          value.test = settings.test;

          return callback(value, undefined);
        }
      });
    };
  };

  const update = settings => {
    return (callback, value) => {
      settingsModel.where({}).updateMany(settings, (err, result) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          const message = `Updated settings`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  const updateSettingsForMailingLabels = settings => {
    return (callback, value) => {
      settingsModel.where({}).updateMany(settings, (err, result) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          if (settings) {
            const message = `Updated settings with mailing label font: ${settings.mailingLabelFont}, mailing label font size: ${settings.mailingLabelFontSize}, and mailing spacing between lines: ${settings.mailingSpacingBetweenLines}`;
            logger.debug(message);
            return callback(value, undefined);
          } else {
            const message = `Failed to update settings`;
            logger.error(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  return Object.freeze({
    find,
    findTest,
    update,
    updateSettingsForMailingLabels
  });
};

export default SettingsCollection;
