import { Controller, Get, Post, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res) {
    try {
      const users = await this.userService.findAll();
      res.status(HttpStatus.OK).json({data: users});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      await this.userService.create(createUserDto);
      res.status(HttpStatus.CREATED).json({message: 'User is created successfully!'});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }

  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto, @Res() res) {
    try {
      const token = await this.userService.login(LoginUserDto);
      res.status(HttpStatus.FOUND).json({message: 'User login successfully!', data: {token}});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }
}