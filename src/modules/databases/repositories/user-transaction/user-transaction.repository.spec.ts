import { Test, TestingModule } from '@nestjs/testing';
import { UserTransactionRepository } from './user-transaction.repository';

describe('UserTransactionService', () => {
  let service: UserTransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTransactionRepository]
    }).compile();

    service = module.get<UserTransactionRepository>(UserTransactionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
