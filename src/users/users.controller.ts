import { Controller, Get, Post, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Res() res) {
    this.userService.findAll().then((users) => {
      res.status(HttpStatus.OK).json({data: users});
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
    });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    this.userService.create(createUserDto).then((response) => {
      res.status(HttpStatus.CREATED).json({message: 'User is created successfully!'});
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
    });
  }

  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto, @Res() res) {
    this.userService.login(LoginUserDto).then((response) => {
      res.status(HttpStatus.FOUND).json(response);
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
  }
}