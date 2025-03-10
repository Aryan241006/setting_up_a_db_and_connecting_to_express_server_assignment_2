const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ['user'],
  },
  profile: {
    type: ProfileSchema,
    default: {},
  },
  lastLogin: {
    type: Date,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
