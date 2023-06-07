import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetDto {
  @ApiProperty({
    description: 'The access url of the target that can be used to attack.',
  })
  @IsNotEmpty()
  access_url: string;

  @ApiProperty({
    description: 'The target os type.',
  })
  @IsNotEmpty()
  os: string;
}
