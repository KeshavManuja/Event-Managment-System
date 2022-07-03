import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Authguard/AuthGuard';
import { RoleGuard } from 'src/Authguard/RoleGuard';
import { userRoles } from 'src/userRole';
import { Auth } from 'utils/Auth.Decorator';
import { UserService } from './user.service';

interface loginInterface {
  email: String,
  password: String
}

interface signupInterface {
  name: String,
  email: String,
  password: String,
  role: String,
  favourites: String[],
}

interface modifyFavourites {
  userID: String,
  favEvent: Object,
}

interface tokenInterface {
  token: String
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


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
  removeFavourites(@Body() body: modifyFavourites): any {
    return this.userService.removeFavourites(body);
  }

  @RoleGuard(userRoles.Manager, userRoles.Regular)
  @UseGuards(AuthGuard)
  @Get('fetchuser')
  getUserfromToken(@Body() body: tokenInterface, @Auth() auth: any) {

    return this.userService.getUserfromToken(body)
  }

  @Get('favourites/:id/:page')
  getFavourites(@Param('id') id: string, @Param('page') page: string) {
    return this.userService.getFavourites(id, page)
  }

}
