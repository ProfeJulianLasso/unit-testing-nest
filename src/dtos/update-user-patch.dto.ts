import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class UpdateUserPatchDTO {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(500)
  email?: string;

  @IsOptional()
  @IsNumberString()
  phone?: string;
}
