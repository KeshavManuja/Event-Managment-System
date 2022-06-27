import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import * as JWT from 'jsonwebtoken';
import { config } from 'dotenv';
config();
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private User: Model<UserDocument>) {}

  async createUser(body: any): Promise<User> {
    const newUser = new this.User(body);
    return newUser.save();
  }

  async login(userCred: any): Promise<any> {
    const user = await this.User.findOne({ email: userCred.email });
    console.log(user);
    if (!user) {
      throw new HttpException(
        'Email & Password combination not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.password !== userCred.password) {
      throw new HttpException(
        'Email & Password combination not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = JWT.sign({ id: user.id }, process.env.JSONSecret);

    return { message: 'Login successful', token, role: user.role, userID:user._id };
  }

  async getUserID(token:string) {
    var decoded = JWT.decode(token);
    console.log(decoded)
  }
}
