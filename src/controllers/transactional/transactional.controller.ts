import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { NewUserDTO, UpdateUserPatchDTO, UpdateUserPutDTO } from '../../dtos';
import { UserEntity } from '../../modules/databases';
import { TransactionalService } from '../../services';

@Controller('transactional')
export class TransactionalController {
  constructor(
    private readonly userTransactionalService: TransactionalService
  ) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userTransactionalService.findAll();
  }

  @Get(':id')
  findOneById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserEntity | null> {
    return this.userTransactionalService.findOneById(id);
  }

  @Post()
  createUser(@Body() user: NewUserDTO): Promise<UserEntity | undefined> {
    return this.userTransactionalService.register(user);
  }

  @Put(':id')
  updateUserPut(
    @Body() user: UpdateUserPutDTO,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UpdateResult | undefined> {
    return this.userTransactionalService.update(id, user);
  }

  @Patch(':id')
  updateUserPatch(
    @Body() user: UpdateUserPatchDTO,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UpdateResult | undefined> {
    return this.userTransactionalService.update(id, user);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult | undefined> {
    return this.userTransactionalService.delete(id);
  }
}
