import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserTransactionRepository {
  constructor(private dataSource: DataSource) {}

  async findOneById(id: string): Promise<UserEntity | null> {
    const user = new UserEntity();
    user.id = id;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const answer = await queryRunner.manager.findOneBy(UserEntity, { id });
    await queryRunner.release();
    return answer;
  }

  async findAll(): Promise<UserEntity[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const answer = await queryRunner.manager.find(UserEntity);
    await queryRunner.release();
    return answer;
  }

  async create(user: UserEntity): Promise<UserEntity | undefined> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const answer = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return answer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: string,
    user: UserEntity
  ): Promise<UpdateResult | undefined> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const answer = await queryRunner.manager.update(
        UserEntity,
        { id },
        { ...user, id }
      );
      await queryRunner.commitTransaction();
      return answer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string): Promise<DeleteResult | undefined> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const answer = await queryRunner.manager.delete(UserEntity, { id });
      await queryRunner.commitTransaction();
      return answer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
