import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectController } from './controller/object.controller';
import { ObjectService } from './service/object/object.service';
import { ObjectEntity } from './entity/object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectEntity])],
  controllers: [ObjectController],
  providers: [ObjectService]
})
export class ObjectModule {}
