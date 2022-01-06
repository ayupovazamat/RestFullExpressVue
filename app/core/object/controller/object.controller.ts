import {Controller, Get, Post, Param, Query} from '@nestjs/common';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import {ObjectDto} from 'app/core/object/dto/object.dto';
import {ObjectService} from 'app/core/object/service/object/object.service';

@Controller('objects')
export class ObjectController {
    constructor(private objectService: ObjectService){};

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
    async getObject(@Param('id') id: number): Promise<any> {
        return await this.objectService.getObject(id);
    }

    /*
    * Получение списка объектов
    * */
    @Get()
    async findAll(): Promise<ObjectDto[]> {
        return this.objectService.findAll();
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
