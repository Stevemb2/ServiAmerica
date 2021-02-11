const UserController = userParams => {
  const {
    userRouter,
    userCollection,
    authenticationUtilities,
    parseq
  } = userParams;

  userRouter.post("/login", (req, res) => {
    res.type("application/json");

    const email = req.body.email;
    const password = req.body.password;

    const login = userCollection.login({
      email,
      password
    });

    console.log(`email: ${email}, password: ${password}`);

    //const passwordEncrypt = authenticationUtilities.passwordEncrypt;

    //parseq.sequence([passwordEncrypt, login])((data, err) => {
    parseq.sequence([login])((data, err) => {
      if (err) {
        res.status(500).send({
          isError: true,
          message: JSON.stringify(err)
        });
      } else {
        const { message, name, email, status, lastLogin } = data;

        const token = authenticationUtilities.sign(email, status);

        res.status(200).send({
          isError: false,
          message: message,
          name: name,
          lastLogin: lastLogin,
          token: token
        });
      }
    });
  });

  userRouter.get("/find-user", authenticationUtilities.verify, (req, res) => {
    res.type("application/json");

    const email = req.query.email;

    const find = userCollection.find(email);

    parseq.sequence([find])((userRecord, err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(userRecord);
      }
    });
  });

  userRouter.get(
    "/find-all-users",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const findAll = userCollection.findAll();

      parseq.sequence([findAll])((value, err) => {
        if (err) {
          res.send({
            isError: true,
            message: err,
            userArray: []
          });
        } else {
          const userArray = value.userArray;

          res.send({
            isError: false,
            userArray: userArray
          });
        }
      });
    }
  );

  userRouter.post("/add-user", authenticationUtilities.verify, (req, res) => {
    res.type("application/json");

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const status = req.body.status;
    const isSender = req.body.isSender;
    const lastLogin = req.body.lastLogin;

    const create = userCollection.create({
      email,
      password,
      name,
      status,
      isSender,
      lastLogin
    });

    parseq.sequence([create])((message, err) => {
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
  });

  userRouter.put("/update-user", authenticationUtilities.verify, (req, res) => {
    res.type("application/json");

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const status = req.body.status;
    const lastLogin = req.body.lastLogin;

    const update = userCollection.update({
      email,
      password,
      name,
      status,
      lastLogin
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
  });

  userRouter.delete(
    "/delete-user",
    authenticationUtilities.verify,
    (req, res) => {
      res.type("application/json");

      const email = req.body.email;

      const remove = userCollection.remove(email);

      parseq.sequence([remove])((message, err) => {
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

export default UserController;
