import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Target } from './schemas/target.schema';
import { Model } from 'mongoose';

@Injectable()
export class TargetService {
  constructor(@InjectModel(Target.name) private targetModel: Model<Target>) {}

  async create(createTargetDto: CreateTargetDto): Promise<Target> {
    const { access_url, os } = createTargetDto;
    const existingTarget = await this.targetModel.findOne({ access_url });
    if (!existingTarget) {
      console.log(
        `[+] New (${os}) Target with access url : ${access_url} added to DB!`,
      );
      return this.targetModel.create(createTargetDto);
    }
  }

  findAll(): Promise<Target[]> {
    return this.targetModel.find({});
  }
}
