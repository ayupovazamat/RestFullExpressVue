import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ObjectModule } from './object/object.module';
import { AttributeService } from './attribute/attribute.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ObjectModule
  ],
  controllers: [AppController],
  providers: [AppService, AttributeService],
})
export class AppModule {}
