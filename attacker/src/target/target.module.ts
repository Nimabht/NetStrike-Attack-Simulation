import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Target, TargetSchema } from './schemas/target.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Target.name, schema: TargetSchema }]),
    HttpModule,
  ],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
