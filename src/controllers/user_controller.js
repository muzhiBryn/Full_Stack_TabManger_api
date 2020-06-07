import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  const user = JSON.parse(JSON.stringify(req.user));
  res.send({ token: tokenForUser(req.user), userName: user.username });
};

export const signup = (req, res, next) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) {
    return res.status(422).send({ Hint: 'You must provide all required fields' });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length > 0) {
          res.status(409).json({ Hint: 'Email already exists' });
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.username = userName;
          newUser.password = password;

          newUser.save()
            .then(() => {
              res.send({ token: tokenForUser(newUser), userName });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

export const check = (req, res, next) => {
  res.send({ msg: 'Has logged in' });
};
