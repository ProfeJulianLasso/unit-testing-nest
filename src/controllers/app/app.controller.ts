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
  async findAll(): Promise<{ length: number; data: UserEntity[] }> {
    const data = await this.appService.findAll();
    const answer = { length: data.length, data };
    return answer;
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{ data: UserEntity }> {
    const answer = { data: await this.appService.findOneById(id) };
    return answer;
  }

  @Post()
  async createUser(
    @Body() user: NewUserDTO
  ): Promise<{ success: boolean; data: UserEntity }> {
    const data = await this.appService.register(user);
    const answer = { success: true, data };
    return answer;
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
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.appService.delete(id);
  }
}
