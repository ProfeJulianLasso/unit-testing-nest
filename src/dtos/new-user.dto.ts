import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class NewUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(500)
  email: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(12)
  phone?: string;
}
