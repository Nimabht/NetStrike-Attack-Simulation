import { IsNotEmpty } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  access_url: string;

  @IsNotEmpty()
  os: string;
}
