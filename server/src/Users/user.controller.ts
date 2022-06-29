import { Body, Controller,  Post } from '@nestjs/common';
import { UserService } from './user.service';

interface loginInterface {
  email:String,
  password:String
}

interface signupInterface {
  name:String,
  email:String,
  password:String,
  role:String,
  favourites:String[], 
}

interface modifyFavourites {
  userID:String,
  eventID:String
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  createUser(@Body() body: signupInterface): any {
    return this.userService.createUser(body);
  }

  @Post('login')
  login(@Body() body: loginInterface): any {
    return this.userService.login(body);
  }

  @Post('favourites/add')
  addFavourites(@Body() body: modifyFavourites): any {
    return this.userService.addFavourites(body);
  }

  @Post('favourites/remove')
  removeFavourites(@Body() body:modifyFavourites):any {
    return this.userService.removeFavourites(body);
  }
}
