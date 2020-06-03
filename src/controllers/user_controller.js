import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });
const secret = process.env.AUTH_SECRET;

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

export const signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send('You must provide email and password');
  } else {
    User.find({ username: username })
    .then((result) => {
      if (result.length > 0) {
        res.status(409).json({ message: 'Username already exists', result });
      } else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;

        newUser.save()
        .then((result) => {
          res.send({ token: tokenForUser(newUser) });
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
}
