import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('Connection')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ tags: ['Test connection'] })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
