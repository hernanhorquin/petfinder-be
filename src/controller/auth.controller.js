const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../utils/token');
const { User } = require('../../models');
const ApiResponse = require('../models/response.model');
const httpStatus = require('http-status');

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

const singup = async (req, res, next) => {
  // Esta funciona para crear usuarios con la pass hasheada no tiene ningun tipo 
  // de comprobacion de usuarios existentes
  const {
    firstName,
    lastname,
    password,
    cellphone,
    adrress,
    email,
  } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send({ message: 'Could not create user, please try again.' });
  }

  try {
    const NewUser = {
      firstName, lastname, email, password: hashedPassword, cellphone, adrress, citycode: 1,
    };
    const ResNewUser = await User.create(NewUser);
    return res.status(201).json({
      NewUserDb: ResNewUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  let existingUser;

  try {
    existingUser = await User.findOne({
      where: {
        email,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: 'Usuario existente' });
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
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET);

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
  login,
  singup,
};