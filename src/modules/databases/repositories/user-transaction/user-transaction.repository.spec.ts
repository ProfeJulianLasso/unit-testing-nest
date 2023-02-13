import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../../entities';
import { UserTransactionRepository } from './user-transaction.repository';

describe('UserTransactionService', () => {
  let repository: UserTransactionRepository;
  let dataSource: DataSource;
  const id = uuid();

  type MockType<T> = {
    [P in keyof T]?: jest.Mock;
  };

  const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      release: jest.fn(),
      rollbackTransaction: jest.fn(),
      manager: {
        save: jest.fn().mockResolvedValue({
          id,
          name: 'Julian Lasso',
          email: 'julian[DOT]lasso[AT]sofka[DOT]com[DOT]co',
          phone: '123-123-1234'
        })
      },
      commitTransaction: jest.fn()
    }))
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTransactionRepository,
        // DataSource
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory
          //   // useValue: {
          //   //   createQueryRunner: jest.fn().mockReturnValue({
          //   //     connect: jest.fn(),
          //   //     startTransaction: jest.fn(),
          //   //     release: jest.fn(),
          //   //     rollbackTransaction: jest.fn(),
          //   //     manager: {
          //   //       save: jest.fn().mockResolvedValue({
          //   //         id,
          //   //         name: 'Julian Lasso',
          //   //         email: 'julian[DOT]lasso[AT]sofka[DOT]com[DOT]co',
          //   //         phone: '123-123-1234'
          //   //       })
          //   //     },
          //   //     commitTransaction: jest.fn()
          //   //   })
          //   // }
        }
      ]
    }).compile();

    repository = module.get<UserTransactionRepository>(
      UserTransactionRepository
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(dataSource).toBeDefined();
  });

  describe('Create user', () => {
    it('should return a user created in the database', async () => {
      // Arrange
      const user = new UserEntity();
      user.name = 'Julian Lasso';
      user.email = 'julian[DOT]lasso[AT]sofka[DOT]com[DOT]co';
      user.phone = '123-123-1234';

      const expected = { ...user, id } as UserEntity;
      jest.spyOn(dataSource.createQueryRunner().manager, 'save');

      // Act
      const result = await repository.create(user);

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
