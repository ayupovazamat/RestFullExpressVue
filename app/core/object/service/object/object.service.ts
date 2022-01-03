import {Injectable, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectDto} from 'app/core/object/dto/object.dto';
import {Repository} from 'typeorm';
import {ObjectEntity} from './../../entity/object.entity';

@Injectable()
export class ObjectService {
  public objects: ObjectDto[] = [];

  create(object: ObjectDto): ObjectDto {
    this.objects.push(object);
    return object;
  }

  findAll(): ObjectDto[] {
    return this.objects;
  }

  /*getObject(objectID: number) {
    let id = Number(objectID);
    return new Promise(resolve => {
      const object = this.objectRepository.find(object => object.id === id);
      if (!object) {
        throw new HttpException('Объект не найден!', 404);
      }
      resolve(object);
    });
  }*/

  /*deleteObject(objectID): Promise<any> {
      let id = Number(objectId);
      return new Promise(resolve => {
          let index = this.objects.findIndex(object = object.id === objectId);
          if(index === -1){
              throw new HttpException('Объект не найден', 404);
          }
          this.objects.splice(1, index);
          resolve(this.objects);
      })
  }*/
}

