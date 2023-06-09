import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetDto {
  @ApiProperty({
    description: 'The access url of the target that can be used to attack.',
  })
  @IsNotEmpty()
  access_url: string;

  @ApiProperty({
    description: 'The target hardware and software system info.',
  })
  @IsNotEmpty()
  ware_info: {
    os: { platform: string };
    cpu: object;
    mem: object;
    disk: object[];
    network: object[];
  };
}
