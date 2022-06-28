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
    return { message: 'Login successful', token, role: user.role, userID:user._id, userFav:user.favourites };
  }



  async addFavourites(body: any) {
    let user = await this.User.findById(body.userID);
    user.favourites.push(body.eventID);
    return user.save();
  }

  async removeFavourites(body:any) {
    let user = await this.User.findById(body.userID);
    let index = user.favourites.indexOf(body.eventID);
    user.favourites.splice(index,1);
    console.log(user)
    return user.save();
  }
}
