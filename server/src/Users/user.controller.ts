import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body:any):any {
    return this.userService.createUser(body);
  }
  
  @Post('login')
  login(@Body() body:any):any {
    console.log(body)
    return this.userService.login(body);
  }

}
