const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');

let response = {
  error: false,
  code: 200,
  message: '',
};

const defaultErrorResponse = (error) => {
  response = {
    error: true,
    code: 500,
    message: `${error.name}: ${error.message}`,
  };
  return response;
};

const signup = async (req, res, next) => {
  // Esta funciona para crear usuarios con la pass hasheada no tiene ningun tipo 
  // de comprobacion de usuarios existentes
  const {
    firstName,
    lastName,
    userName,
    password,
  } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send({ message: 'Could not create user, please try again.' });
  }

  try {
    const NewUser = {
      firstName, lastName, userName, password: hashedPassword,
    };
    const ResNewUser = await Admin.create(NewUser);
    return res.status(201).json({
      NewUserDb: ResNewUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  const { userName, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      where: {
        userName,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: 'Error en el Acceso intente nuevamente.' });
  }

  if (!existingUser) {
    return res.status(403).send({ message: 'Credenciales erroneas.' });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).send({ message: 'Acceso erroneo, verifica tus credenciales e intenta de nuevo.' });
  }

  if (!isValidPassword) {
    return res.status(403).send({ message: 'Acceso erroneo, verifica tus credenciales e intenta de nuevo.' });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'A2DsdRF$fs843@_@1759',
      { expiresIn: '8h' },
    );

    const userData = {
      userId: existingUser.id,
      email: existingUser.email,
      token,
    };

    response = {
      error: false,
      code: 200,
      message: 'Inicio Correcto',
      userData,
    };
  } catch (err) {
    return res.status(500).send({ message: 'Error en el acceso, intente nuevamente.' });
  }

  res.status(response.code).send(response);
};

module.exports = {
  signup,
  login,
};