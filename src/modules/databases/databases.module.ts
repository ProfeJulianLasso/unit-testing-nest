// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configurations
import { PostgreSQLConfig } from './configs/postgresql.config';

// Entities
import { UserEntity } from './entities/user.entity';

// Repositories
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgreSQLConfig }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserRepository],
  exports: [TypeOrmModule, UserRepository]
})
export class DatabasesModule {}
