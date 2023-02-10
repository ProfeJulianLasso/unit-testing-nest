// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configurations
import { PostgreSQLConfig } from './configs';

// Entities
import { UserEntity } from './entities';

// Repositories
import { UserRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgreSQLConfig }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserRepository],
  exports: [TypeOrmModule, UserRepository]
})
export class DatabasesModule {}
