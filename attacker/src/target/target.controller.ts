import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TargetService } from './target.service';
import { CreateTargetDto } from './dto/create-target.dto';

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Post()
  async create(@Body() createTargetDto: CreateTargetDto) {
    return await this.targetService.create(createTargetDto);
  }

  @Get()
  async findAll() {
    return await this.targetService.findAll();
  }

  @Get('/screenshot/:targetId')
  async screenshot(@Param('targetId') targetId: string) {
    const target = await this.targetService.findTargetById(targetId);
    return await this.targetService.takeScreenshot(target);
  }
}
