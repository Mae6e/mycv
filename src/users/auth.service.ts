import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import e from "express";
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{

  constructor(private usersService: UsersService) {
    
  }
  async signup(email: string, password: string) {
    
    const users = await this.usersService.find(email);
    if (users.length > 0)
      throw new BadRequestException('email in use.');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user)
      throw new NotFoundException('can not found user');
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException('incorrect email or password');
    return user;
  }

}