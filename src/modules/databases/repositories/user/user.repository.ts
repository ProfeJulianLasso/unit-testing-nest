import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOneById(id: string): Promise<UserEntity> {
    const cliente = await this.userRepository.findOneBy({ id });
    if (cliente) return cliente;
    throw new NotFoundException(`id "${id} does not exist in database`);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    let userToUpdate = await this.findOneById(id);
    userToUpdate = { ...userToUpdate, ...user, id };
    return await this.userRepository.save(userToUpdate);
  }

  async delete(id: string): Promise<UserEntity> {
    const userToDelete = await this.findOneById(id);
    return await this.userRepository.remove(userToDelete);
  }
}
