import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';


export class CreateUserRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Min(8)
  // @Matches(PASSWORD_REGEX, { message: 'password-is-too-weak' }) -> PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*=(+){}|'";\\:[><.\],?/-]).{8,}$/
  public password: string;


}
