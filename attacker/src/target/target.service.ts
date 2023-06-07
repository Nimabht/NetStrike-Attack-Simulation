import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';

@Injectable()
export class TargetService {
  create(createTargetDto: CreateTargetDto) {
    return 'This action adds a new target';
  }

  findAll() {
    return `This action returns all target`;
  }

  findOne(id: number) {
    return `This action returns a #${id} target`;
  }

  remove(id: number) {
    return `This action removes a #${id} target`;
  }
}
