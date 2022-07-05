import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import * as JWT from 'jsonwebtoken';
import { config } from 'dotenv';
config();
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private User: Model<UserDocument>) { }

  async createUser(body: any): Promise<User> {
    const newUser = new this.User(body);
    return newUser.save();
  }
  async getUser(id: string): Promise<User> {
    const user = await this.User.findOne({ _id: id });
    if(!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
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
    return { message: 'Login successful', token, role: user.role, userID: user._id, userFav: user.favourites };
  }



  async addFavourites(body: any) {

    const user = await this.User.findById(body.userID);

    if (!user) {
      throw new HttpException(
        'User not found!!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.favourites.push(body.favEvent);
    await user.save();
    return body.favEvent;
  }

  async removeFavourites(body: any) {
    let user = await this.User.findById(body.userID);
    if (!user) {
      throw new HttpException(
        'User not found!!',
        HttpStatus.BAD_REQUEST,
      );
    };

    user.favourites = user.favourites.filter((favourite) => favourite._id !== body.favEvent._id);
    return user.save();
  }

  async getFavourites(userID: string, page: string) {
    const limit = 2;
    let user = await this.User.findById(userID).lean().exec();
    if (!user) {
      throw new HttpException(
        'User not found!!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favEvents = user.favourites.slice(Number(page) - 1, limit);
    return { favEvents, pages: Math.ceil(user.favourites.length / limit) };

  }

  async getUserfromToken({ token }) {
    var decoded = JWT.verify(token, process.env.JSONSecret);
    const user = await this.User.findOne({ _id: decoded.id })
    return user
  }


}
