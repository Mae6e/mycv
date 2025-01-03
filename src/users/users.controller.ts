import { Body, Controller , Param, Post , Get , Query, Delete , Patch, Session, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) { }
  
  @Get('/colors/:color')
  setColor(@Param('color')color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  // @Get('/whoami')
  // whoami(@Session() session:any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoami(@CurrentUser() user:User) {
    return user;
  }

@Post('/signup')
async createUser(@Body() body: CreateUserDto, @Session() session: any) {

  const user = await this.authService.signup(body.email, body.password);
  session.userId = user.id;
  return user;
}
   
@Post('/signin')
async signinUser(@Body() body:CreateUserDto, @Session()session:any) {
  const user = await this.authService.signin(body.email, body.password);
  session.userId = user.id;
  return user;
}
  
@Post('/signout')
async signout( @Session() session:any) {
  session.userId = null;
}
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(parseInt(id));
  }
  
  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), body);
  }

}