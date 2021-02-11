const UserCollection = (
  mongoose,
  dateUtilities,
  authenticationUtilities,
  logger
) => {
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    lastLogin: { type: String }
  });

  const userModel = mongoose.model("user", userSchema);

  const login = data => {
    return (callback, value) => {
      userModel.findOne(
        {
          email: data.email,
          password: data.password
        },
        (err, user) => {
          if (err) {
            logger.error(`Error: ${err}`);
            return callback(undefined, err);
          } else {
            if (user) {
              if (user.status === "suspended") {
                const message = `User ${user.name} has been suspended`;
                logger.debug(message);
                return callback(undefined, message);
              } else {
                logger.debug(`Found user with email: ${data.email}`);

                updateLastLogin(user, callback);
              }
            } else {
              const message = `Failed to login user with email: ${data.email}`;
              logger.debug(message);
              return callback(undefined, message);
            }
          }
        }
      );
    };
  };

  const updateLastLogin = (user, callback) => {
    user.lastLogin = dateUtilities.getTodaysDateTime();

    userModel.where({ email: user.email }).updateOne(user, (err, result) => {
      if (err) {
        const message = `Failed to update user with email: ${user.email}, error: ${err}`;
        logger.error(message);
        return callback(undefined, message);
      } else {
        const message = `Successfully updated user with email: ${user.email}`;
        logger.debug(message);
        return callback(user, undefined);
      }
    });
  };

  const find = email => {
    return (callback, value) => {
      userModel.findOne({ email: email }, (err, user) => {
        if (err) {
          logger.error(`Error: ${err}`);

          return callback(undefined, err);
        } else {
          if (user) {
            logger.debug(`Found user with email: ${user.email}`);
            return callback(user, undefined);
          } else {
            const message = `Failed to find user with email: ${email}`;
            logger.debug(message);
            return callback(undefined, message);
          }
        }
      });
    };
  };

  const findAll = () => {
    return (callback, value) => {
      userModel.where({}).find((err, userArray) => {
        if (err) {
          logger.error(`Error: ${err}`);
          return callback(undefined, err);
        } else {
          logger.debug(`Found all users`);

          if (value === undefined) {
            value = {};
          }

          value.userArray = userArray;

          return callback(value, undefined);
        }
      });
    };
  };

  const create = user => {
    return (callback, value) => {
      userModel(user).save(err => {
        if (err) {
          const message = `Failed to create user with email: ${user.email}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          const message = `Successfully created user with email: ${user.email}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  const update = user => {
    return (callback, value) => {
      userModel.where({ email: user.email }).updateOne(user, (err, result) => {
        if (err) {
          const message = `Failed to update user with email: ${user.email}, error: ${err}`;
          logger.error(message);
          return callback(undefined, message);
        } else {
          const message = `Successfully updated user with email: ${user.email}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  const remove = email => {
    return (callback, value) => {
      userModel.remove({ email: email }, (err, result) => {
        if (err) {
          const message = `Failed to remove user with email: ${email}, error: ${err}`;
          logger.error(message);
          return callback(undefined, err);
        } else {
          const message = `Successfully deleted user with email: ${email}`;
          logger.debug(message);
          return callback(message, undefined);
        }
      });
    };
  };

  return Object.freeze({
    login,
    find,
    findAll,
    create,
    update,
    remove
  });
};

export default UserCollection;
