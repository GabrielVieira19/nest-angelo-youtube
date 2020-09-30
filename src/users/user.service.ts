import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  private async saveUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException('Problem to create/update a user. Try again');
    }
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return this.saveUser(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    const user = await this.getUserById(data.id);
    return this.userRepository.save({ ...user, ...data })
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    const userDeleted = await this.userRepository.delete(user);
    if (!userDeleted) {
      throw new InternalServerErrorException('Problem to delete a user. Try again');
    }
  }
}
