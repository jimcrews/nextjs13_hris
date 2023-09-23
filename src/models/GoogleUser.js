import { Schema, model, models } from 'mongoose';

const GoogleUserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
},{ collection: 'users'});

const GoogleUser = models.GoogleUser || model("GoogleUser", GoogleUserSchema);

export default GoogleUser;