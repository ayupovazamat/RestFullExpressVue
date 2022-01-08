import {Injectable, HttpException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectDto} from 'app/core/object/dto/object.dto';
import {Repository} from 'typeorm';
import {ObjectEntity} from './../../entity/object.entity';

@Injectable()
export class ObjectService {
  /*public objects: ObjectDto[] = [];*/
  constructor(
    @InjectRepository(ObjectEntity)
    private objectRepository: Repository<ObjectEntity>
  ) {
  }

  create(object: ObjectDto): Promise<ObjectDto> {
    return this.objectRepository.save(object);
  }

  findAll(): Promise<ObjectDto[]> {
    return this.objectRepository.find();
    //return this.objects;
  }


  getObject(idObject: number):Promise<ObjectDto> {
    const object = this.objectRepository.findOne({
      select: ['id', "isActive", "price"],
      where: {
        "id": idObject
      },
    });
    return object;
  }

  async removeObject(idObject: number):Promise<ObjectDto> {
    const object = await this.objectRepository.findOne(idObject);
    return await this.objectRepository.remove(object);
  }

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

