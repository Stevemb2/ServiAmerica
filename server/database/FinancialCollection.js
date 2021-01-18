const FinancialCollection = (mongoose, logger) => {
  const Schema = mongoose.Schema;

  const financialSchema = new Schema({
    email: { type: String, required: true, unique: true },
    income: { type: Number, required: true },
    phone: { type: Number, required: true },
    water: { type: Number, required: true },
    electric: { type: Number, required: true },
    gas: { type: Number, required: true },
    gasoline: { type: Number, required: true },
    groceries: { type: Number, required: true },
    housePayment: { type: Number, required: true },
    carPayment: { type: Number, required: true },
    taxes: { type: Number, required: true }
  });

  const financialModel = mongoose.model("financial", financialSchema);

  const find = email => {
    return (callback, value) => {
      financialModel.findOne({ email: email }, (err, financial) => {
        if (err) {
          logger.error(`Error: ${err}`);

          return callback(undefined, err);
        } else {
          if (financial) {
            logger.debug(`Found financial with email: ${financial.email}`);
            return callback(financial, undefined);
          } else {
            const message = `Failed to find financial with email: ${email}`;
            logger.debug(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const findAll = () => {
    return (callback, value) => {
      financialModel.where({}).find((err, financialArray) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          logger.debug(`Found all financials`);
          return callback(financialArray, undefined);
        }
      });
    };
  };

  const create = financial => {
    return (callback, value) => {
      financialModel(financial).save(err => {
        if (err) {
          const message = `Failed to create financial with email: ${financial.email}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          const message = `Successfully created financial with email: ${financial.email}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  const update = financial => {
    return (callback, value) => {
      financialModel
        .where({ email: financial.email })
        .updateOne(financial, (err, result) => {
          if (err) {
            const message = `Failed to update financial with email: ${financial.email}, error: ${err}`;
            logger.error(message);
            return callback(undefined, message);
          } else {
            const message = `Successfully updated financial with email: ${financial.email}`;
            logger.debug(message);
            return callback(message, undefined);
          }
        });
    };
  };

  const remove = email => {
    return (callback, value) => {
      financialModel.remove({ email: email }, (err, result) => {
        if (err) {
          const message = `Failed to remove financial with email: ${email}, error: ${err}`;
          logger.error(message);
          return callback(undefined, err);
        } else {
          const message = `Successfully deleted financial with email: ${email}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  return Object.freeze({
    find,
    findAll,
    create,
    update,
    remove
  });
};

module.exports = FinancialCollection;
