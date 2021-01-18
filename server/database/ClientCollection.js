const ClientCollection = (mongoose, logger) => {
  const Schema = mongoose.Schema;

  const clientSchema = new Schema(
    {
      email: { type: String, required: true, unique: true },
      honorific: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      areacode: { type: Number, required: true },
      prefix: { type: Number, required: true },
      linenumber: { type: Number, required: true },
      address: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: true },
      zip: { type: Number, required: true },
      language: { type: String, required: true },
      birthmonth: { type: String, required: true },
      birthday: { type: Number, required: true },
      birthyear: { type: Number, required: true },
      status: { type: String, required: true },
      templateArray: { type: Array, required: true }
    },
    { timestamps: true }
  );

  const clientModel = mongoose.model("client", clientSchema);

  const find = email => {
    return (callback, value) => {
      clientModel.findOne({ email: email }, (err, client) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          if (client) {
            logger.debug(
              `Found client with email: ${client.email}, firstName: ${client.firstname}, lastName: ${client.lastname}`
            );

            if (value === undefined) {
              value = {};
            }

            value.client = client;

            return callback(value, undefined);
          } else {
            const message = `Failed to find client with email: ${email}`;
            logger.debug(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const findAll = () => {
    return (callback, value) => {
      clientModel.find({}, (err, clientArray) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          logger.debug(`Found all clients`);

          if (value === undefined) {
            value = {};
          }

          value.clientArray = clientArray;

          return callback(value, undefined);
        }
      });
    };
  };

  const create = client => {
    return (callback, value) => {
      clientModel(client).save(err => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          const message = `Created client with email: ${client.email}, firstName: ${client.firstname}, lastName: ${client.lastname}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  const update = client => {
    return (callback, value) => {
      clientModel
        .where({ email: client.email })
        .updateOne(client, (err, result) => {
          if (err) {
            logger.error(`Error: ${err}`);
            return callback(undefined, err);
          } else {
            const message = `Updated client with email: ${client.email}, firstName: ${client.firstname}, lastName: ${client.lastname}`;
            logger.debug(message);
            return callback(message, undefined);
          }
        });
    };
  };

  const remove = email => {
    return (callback, value) => {
      clientModel.remove({ email: email }, (err, result) => {
        if (err) {
          const message = `Failed to delete client with email: ${email}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (value === undefined) {
            value = {};
          }

          const message = `Successfully deleted client with email: ${email}`;
          logger.debug(message);

          return callback(value, undefined);
        }
      });
    };
  };

  const removeAll = () => {
    return (callback, value) => {
      clientModel.remove({}, (err, result) => {
        if (err) {
          const message = `Failed to delete all clients`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          if (value === undefined) {
            value = {};
          }

          const message = `Successfully deleted all clients`;
          logger.debug(message);

          return callback(value, undefined);
        }
      });
    };
  };

  return Object.freeze({
    clientModel,
    find,
    findAll,
    create,
    update,
    remove,
    removeAll
  });
};

module.exports = ClientCollection;
