import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class UpdateUserPutDTO {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MaxLength(500)
  email: string;

  @IsOptional()
  @IsNumberString()
  phone?: string;
}
