import { Module } from '@nestjs/common';
import { ObjectController } from './controller/object.controller';
import { ObjectService } from './service/object/object.service';

@Module({
  controllers: [ObjectController],
  providers: [ObjectService]
})
export class ObjectModule {}
