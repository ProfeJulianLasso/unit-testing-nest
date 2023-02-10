import { Injectable } from '@nestjs/common';
import { NewUserDTO, UpdateUserPatchDTO, UpdateUserPutDTO } from '../../dtos';
import { UserEntity, UserRepository } from '../../modules/databases';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(user: NewUserDTO): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.name = user.name.toUpperCase();
    newUser.email = user.email.replace('@', '[AT]').replace(/\./g, '[DOT]');
    if (user.phone)
      newUser.phone = user.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return await this.userRepository.create(newUser);
  }

  async update(
    id: string,
    user: UpdateUserPatchDTO | UpdateUserPutDTO
  ): Promise<UserEntity> {
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
    return await this.userRepository.update(id, updateUser);
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.userRepository.delete(id);
  }

  async findOneById(id: string): Promise<UserEntity> {
    const data = await this.userRepository.findOneById(id);
    data.email = data.email.replace('[AT]', '@').replace(/\[DOT\]/g, '.');
    return data;
  }

  async findAll(): Promise<UserEntity[]> {
    const data = await this.userRepository.findAll();
    const answer = data.map((user) => {
      user.email = user.email.replace('[AT]', '@').replace(/\[DOT\]/g, '.');
      return user;
    });
    return answer;
  }
}
