// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configurations
import { PostgreSQLConfig } from './configs';

// Entities
import { UserEntity } from './entities';

// Repositories
import { UserRepository, UserTransactionRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgreSQLConfig }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserRepository, UserTransactionRepository],
  exports: [TypeOrmModule, UserRepository, UserTransactionRepository]
})
export class DatabasesModule {}
