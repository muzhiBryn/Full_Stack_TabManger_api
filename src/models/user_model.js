import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import Project from './project_model';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },  
  projects: [Project],
  password: {
    type: String,
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

UserSchema.pre('save', function beforeUserModelSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  const hash = user.password;

  bcrypt.compare(candidatePassword, hash, (error, result) => {
    if (result) {
      return callback(null, result);
    } else {
      return callback(error);
    }
  });
};

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;