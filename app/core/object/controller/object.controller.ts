import {Controller, Get, Post, Param, Query, Delete} from '@nestjs/common';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import {ObjectDto} from 'app/core/object/dto/object.dto';
import {ObjectService} from 'app/core/object/service/object/object.service';

@Controller('objects/')
export class ObjectController {
    constructor(private objectService: ObjectService){};

    /*
    * Получение списка объектов
    * */
    @Get()
    async findAll(): Promise<ObjectDto[]> {
        return this.objectService.findAll();
    }

    /*
    * Создание объекта
    * */
    @Post()
    create(@Body() object: ObjectDto): Promise<ObjectDto>{
        return this.objectService.create(object);
    }

    /*
    * Получения объекта по ID
    * */
    @Get(':id')
    async getObject(@Param('id') id: number) {
        const object = await this.objectService.getObject(id);

        return object;
    }

    /*
    * Удаление объекта по ID
    * */
    @Delete(':id')
    async deleteObject(@Param('id') id: number) {
        const object = await this.objectService.removeObject(id);
        return object;
    }

    /*
    * Удаления объекта
    * */
    /*@Delete()
    async deleteObject(@Query() query){
        const objects = await this.objectService.deleteObject(query.objectID);
        return object;
    }*/
}
