import { ValidationError } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { NewUserDTO } from '../../dtos';
import { UserEntity } from '../../modules/databases';
import { AppService } from '../../services/app/app.service';
import { AppController } from './app.controller';

function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            register: jest.fn()
          }
        }
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('Controller', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('Service', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('Find all', () => {
    it('should all get empty information', async () => {
      // Arrange
      const expected = { length: 0, data: new Array<UserEntity>() };

      const mock = new Array<UserEntity>();

      jest.spyOn(appService, 'findAll').mockResolvedValue(mock);

      // Act
      const result = await appController.findAll();

      // Assert
      expect(appService.findAll).toBeCalled();
      expect(appService.findAll).toBeCalledTimes(1);
      expect(result).toEqual(expected);
    });

    it('should fetch all users of the database', async () => {
      // Arrange
      const data = new Array<UserEntity>();
      data.push({
        id: uuid(),
        name: 'julian lasso',
        email: 'julian.lasso@sofka.com.co',
        phone: null
      });

      const expected = { length: 1, data };

      const mock = [...data];

      jest.spyOn(appService, 'findAll').mockResolvedValue(mock);

      // Act
      const result = await appController.findAll();

      // Assert
      expect(appService.findAll).toBeCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('FindOne by Id', () => {
    it('should return the object with the searched ID', async () => {
      // Arrange
      const id = uuid();

      const data = new UserEntity();
      data.id = id;
      data.name = 'julian lasso';
      data.email = 'julian.lasso@sofka.com.co';

      const expected = { data };
      const mock = { ...data };

      jest.spyOn(appService, 'findOneById').mockResolvedValue(mock);

      // Act
      const result = await appController.findOneById(id);

      // Assert
      expect(appService.findOneById).toBeCalledWith(id);
      expect(result).toEqual(expected);
    });
  });

  describe('Create user', () => {
    it('should create a user', async () => {
      // Arrange
      const payload = {
        name: 'Andres Figueroa',
        email: 'andres.figueroa@sofka.com.co',
        phone: '1234567890'
      };

      const mock = new UserEntity();
      mock.id = uuid();
      mock.name = 'Andres Figueroa';
      mock.email = 'andres.figueroa@sofka.com.co';
      mock.phone = '1234567890';

      const expected = { success: true, data: mock };

      jest.spyOn(appService, 'register').mockResolvedValue(mock);

      // Act
      const result = await appController.createUser(payload);

      // Assert
      expect(appService.register).toBeCalledWith(payload);
      expect(result).toEqual(expected);
    });

    it('should throw name errors in the DTO.', async () => {
      // Arrange
      const payload1 = { name: 1 };
      const dto1 = plainToInstance(NewUserDTO, payload1);
      const payload2 = {};
      const dto2 = plainToInstance(NewUserDTO, payload2);
      const payload3 = {
        name: 'Ad minim eu nisi aute ea aute proident. Eu anim excepteur sit irure elit aute non sit veniam. Id cillum id cupidatat adipisicing cillum tempor et reprehenderit id fugiat ullamco exercitation cillum aliquip.'
      };
      const dto3 = plainToInstance(NewUserDTO, payload3);

      // Act
      const errors1 = await validate(dto1);
      const errors2 = await validate(dto2);
      const errors3 = await validate(dto3);

      // Assert
      expect(errors1.length).not.toBe(0);
      expect(stringified(errors1)).toContain('name must be a string');
      expect(errors2.length).not.toBe(0);
      expect(stringified(errors2)).toContain('name should not be empty');
      expect(errors3.length).not.toBe(0);
      expect(stringified(errors3)).toContain(
        'name must be shorter than or equal to 100 characters'
      );
    });

    it('should throw mail errors in the DTO.', async () => {
      // Arrange
      const payload1 = {};
      const dto1 = plainToInstance(NewUserDTO, payload1);
      const payload2 = { email: 'esto no es un correo válido' };
      const dto2 = plainToInstance(NewUserDTO, payload2);
      const payload3 = {
        email:
          'correovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargo@correovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargocorreovalidoperomuylargo.com.co'
      };
      const dto3 = plainToInstance(NewUserDTO, payload3);

      // Act
      const errors1 = await validate(dto1);
      const errors2 = await validate(dto2);
      const errors3 = await validate(dto3);

      // Assert
      expect(errors1.length).not.toBe(0);
      expect(stringified(errors1)).toContain('email should not be empty');
      expect(errors2.length).not.toBe(0);
      expect(stringified(errors2)).toContain('email must be an email');
      expect(errors3.length).not.toBe(0);
      expect(stringified(errors3)).toContain(
        'email must be shorter than or equal to 500 characters'
      );
    });

    it('should throw a phone number error in the DTO.', async () => {
      // Arrange
      const payload1 = {
        phone: '1234567890A'
      };
      const dto1 = plainToInstance(NewUserDTO, payload1);
      const payload2 = {
        phone: '1234567890123'
      };
      const dto2 = plainToInstance(NewUserDTO, payload2);

      // Act
      const errors1 = await validate(dto1);
      const errors2 = await validate(dto2);

      // Assert
      expect(errors1.length).not.toBe(0);
      expect(stringified(errors1)).toContain('phone must be a number string');
      expect(errors2.length).not.toBe(0);
      expect(stringified(errors2)).toContain(
        'phone must be shorter than or equal to 12 characters'
      );
    });
  });
});
