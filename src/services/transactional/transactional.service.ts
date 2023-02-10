import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { NewUserDTO, UpdateUserPatchDTO, UpdateUserPutDTO } from '../../dtos';
import { UserEntity, UserTransactionRepository } from '../../modules/databases';

@Injectable()
export class TransactionalService {
  constructor(
    private readonly userTransactionRepository: UserTransactionRepository
  ) {}

  async register(user: NewUserDTO): Promise<UserEntity | undefined> {
    const newUser = new UserEntity();
    newUser.name = user.name.toUpperCase();
    newUser.email = user.email.replace('@', '[AT]').replace(/\./g, '[DOT]');
    if (user.phone)
      newUser.phone = user.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return await this.userTransactionRepository.create(newUser);
  }

  async update(
    id: string,
    user: UpdateUserPatchDTO | UpdateUserPutDTO
  ): Promise<UpdateResult | undefined> {
    const updateUser = new UserEntity();
    if (user.name) updateUser.name = user.name.toUpperCase();
    if (user.email)
      updateUser.email = user.email
        .replace('@', '[AT]')
        .replace(/\./g, '[DOT]');
    if (user.phone)
      updateUser.phone = user.phone.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '$1-$2-$3'
      );
    return await this.userTransactionRepository.update(id, updateUser);
  }

  async delete(id: string): Promise<DeleteResult | undefined> {
    return await this.userTransactionRepository.delete(id);
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const data = await this.userTransactionRepository.findOneById(id);
    if (data)
      data.email = data.email.replace('[AT]', '@').replace(/\[DOT\]/g, '.');
    return data;
  }

  async findAll(): Promise<UserEntity[]> {
    const data = await this.userTransactionRepository.findAll();
    const answer = data.map((user) => {
      user.email = user.email.replace('[AT]', '@').replace(/\[DOT\]/g, '.');
      return user;
    });
    return answer;
  }
}
