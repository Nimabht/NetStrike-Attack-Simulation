import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Target } from './schemas/target.schema';
import { Model } from 'mongoose';

@Injectable()
export class TargetService {
  constructor(@InjectModel(Target.name) private catModel: Model<Target>) {}

  create(createTargetDto: CreateTargetDto) {
    return 'This action adds a new target';
  }

  findAll() {
    return `This action returns all target`;
  }
}
