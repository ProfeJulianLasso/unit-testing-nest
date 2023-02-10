import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSQLConfig } from './configs/postgresql.config';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgreSQLConfig }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [TypeOrmModule]
})
export class DatabasesModule {}
