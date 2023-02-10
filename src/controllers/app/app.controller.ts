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
import { NewUserDTO, UpdateUserPatchDTO, UpdateUserPutDTO } from '../../dtos';
import { UserEntity } from '../../modules/databases';
import { AppService } from '../../services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.appService.findOneById(id);
  }

  @Post()
  createUser(@Body() user: NewUserDTO): Promise<UserEntity> {
    return this.appService.register(user);
  }

  @Put(':id')
  updateUserPut(
    @Body() user: UpdateUserPutDTO,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserEntity> {
    return this.appService.update(id, user);
  }

  @Patch(':id')
  updateUserPatch(
    @Body() user: UpdateUserPatchDTO,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserEntity> {
    return this.appService.update(id, user);
  }

  @Delete(':id')
  deleteUser(id: string): Promise<UserEntity> {
    return this.appService.delete(id);
  }
}
