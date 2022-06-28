import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: any): any {
    return this.userService.createUser(body);
  }

  @Post('login')
  login(@Body() body: any): any {
    return this.userService.login(body);
  }

  @Post('favourites/add')
  addFavourites(@Body() body: any): any {
    return this.userService.addFavourites(body);
  }

  @Post('favourites/remove')
  removeFavourites(@Body() body:any):any {
    return this.userService.removeFavourites(body);
  }
}
