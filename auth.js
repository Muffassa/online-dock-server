import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'emailId']),
    },
    secret,
    {
      expiresIn: '1h',
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id', 'emailId'),
    },
    secret2,
    {
      expiresIn: '7d',
    }
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (
  token,
  refreshToken,
  models,
  SECRET,
  SECRET2
) => {
  let userId = 0;
  try {
    const {user: {emailId}} = jwt.decode(refreshToken);
    userId = emailId;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  // TODO: Аналогично с tryLogin либо БД поменять либо запрос переделать
  const doctor = await models.Doctor.findOne({
    where: {emailId: userId},
    raw: true,
  });

  const patient = await models.Patient.findOne({
    where: {emailId: userId},
    raw: true,
  });

  const user = patient || doctor;

  if (!user) {
    return {};
  }

  const refreshSecret = user.password + SECRET2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
  // TODO: Переделать либо БД как то по другому либо запрос
  const emailData = await models.Email.findOne({where: {email}, raw: true});
  const doctor = await models.Doctor.findOne({
    where: {emailId: emailData.id},
    raw: true,
  });

  const patient = await models.Patient.findOne({
    where: {emailId: emailData.id},
    raw: true,
  });

  // Тут всегда одно из значений будет пустое, т.к. email уникальны
  const user = patient || doctor;
  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{path: 'email', message: 'Wrong email'}],
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  console.log('VALID', valid);
  console.log('USER', user);
  console.log('Pssword', password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{path: 'password', message: 'Wrong password'}],
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(
    user,
    SECRET,
    refreshTokenSecret
  );

  return {
    ok: true,
    token,
    refreshToken,
  };
};
