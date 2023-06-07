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
  create(@Body() createTargetDto: CreateTargetDto) {
    return this.targetService.create(createTargetDto);
  }

  @Get()
  findAll() {
    return this.targetService.findAll();
  }
}
