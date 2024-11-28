import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private readonly jwtService: JwtService, // dùng để tạo token
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ){}

  async login(body: LoginDto): Promise<string> {
    try {
      const {email, pass_word} = body;
      // get user bằng email
      const user = await this.prisma.users.findFirst({
        where: {email}
      })
      // kiểm tra user có tồn tại không
      if(!user) {
        throw new BadRequestException('Email is wrong');
      }

      // kiểm tra password có trùng không
      const checkPass = bcrypt.compareSync(pass_word, user.pass_word);

      // cheat password
      // const hashPassword = bcrypt.hashSync(pass_word, 10);
      // console.log(hashPassword);

      if(!checkPass) {
        throw new BadRequestException('Password is wrong');
      }

      // tạo token
      const token = this.jwtService.sign(
        {data: {userId: user.user_id}}, //define payload muốn lưu vào token
        {
          expiresIn: "30m", // thời gian sống của token
          secret: "node47", // secret key để tạo token
        }
      )
      return token;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(body: CreateUserDto): Promise<any> {
    try {
      let {full_name, email, pass_word, role_id} = body;
      // Get user by email
      const user = await this.prisma.users.findFirst({
        where: {email}
      });
      // Check user exists
      if(user) {
        throw new BadRequestException('Email is exists');
      }

      // hash password
      pass_word = bcrypt.hashSync(pass_word, 10);

      // create user
      const newUser = await this.prisma.users.create({
        data: {
          full_name,
          email,
          pass_word,
          role_id
        }
      })

      // send email welcome
      await this.emailService.sendEmail(email, 'Welcome to node47', 'Welcome to node47');

      // return user
      return newUser;

    } catch (error) {
      throw new Error(error.message);
    }
  }


}
