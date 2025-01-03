import { BadRequestException, Injectable , NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    
  }
  async create(email:string, password:string) {
    const user = await this.repo.create({ email, password });
    return await this.repo.save(user);
  }
  
  async findOne(id: number) {
    if (!id)
      throw new BadRequestException('invalid id.');
    const user = await this.repo.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException('user not found.');
    return user;
  }

  async find(email:string) {
    return await this.repo.find({where:{email}});
  }

  async update(id:number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user,attrs);
    await this.repo.save(user);
  }

  async remove(id:number) {
    const user = await this.findOne(id); 
    return this.repo.remove(user);
  }

}
