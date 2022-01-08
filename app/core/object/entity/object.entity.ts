import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, JoinTable, ManyToMany} from "typeorm";
import {CategoryEntity} from "./category.entity";
import {ObjectTypeEnum, ObjectInitAreaEnum, ObjectGarageType} from "../../constants/object_field";

@Entity('objects')
export class ObjectEntity {
  @PrimaryGeneratedColumn()
  id: number; // id оставим для id определения в фиде

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;

  @Column()
  price: number;

  @Column({name: 'description', nullable: true})
  description: string

  @ManyToMany(type => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @Column({
    type: "enum",
    enum: ObjectTypeEnum,
    default: ObjectTypeEnum.sale
  })
  type: ObjectTypeEnum // sale: продажа, rest: аренда

  /*@Column()
  "property-type": number*/ // Строго ограниченное значение: «жилая»/«living». Если коммерческая то не используем

  /*@Column({name: 'description', nullable: false})
  category: number*/
  /*«дача»/«коттедж»/«cottage»
  «дом»/«house»
  «дом с участком»
  «house with lot»
  «участок»/«lot»
  «часть дома»
  «квартира»/«flat»
  «комната»/«room»
  «таунхаус»/«townhouse»
  «дуплекс»/«duplex»
  «гараж»/«garage».*/

  // Или коммерческая

  @Column({
    type: "enum",
    enum: ObjectGarageType,
    default: ObjectGarageType.garage
  })
  "garage-type": ObjectGarageType


  @Column({name: 'lot-number', nullable: true})
  "lot-number": number

  @Column({name: 'cadastral-number', nullable: true})
  "cadastral-number": string

  @Column({name: 'url', nullable: true})
  url: string // url страницы объявления на сайте

  // Location = отдельная таблица/ы с полями
  /*@Column()
  country: string // Россия

  @Column()
  region: number // Название субъекта РФ. Передаётся внутри <location> Необязательно для Москвы и Санкт-Петербурга.

  @Column()
  district: number // Название района субъекта РФ.

  @Column()
  "locality-name": number // Название населенного пункта.

  @Column()
  "sub-locality-name": number // Район в населенном пункте.

  @Column()
  address: string // Адрес объекта — улица и номер здания. Необязательно для загородной недвижимости.

  @Column()
  apartment: string // Номер квартиры.

  @Column()
  direction: string // Шоссе. Только для объектов в Москве и Московской области.

  @Column()
  distance: string // Расстояние по шоссе до МКАД. В километрах. Только для Москвы и Московской области.

  @Column()
  latitude: string // Географическая широта.

  @Column()
  longitude: string //Географическая долгота.

  @Column()
  "railway-station": string // Ближайшая железнодорожная станция. Только для загородной недвижимости.
  */

  /*@Column()
  metro: string // Ближайшая станция метро. Если станций несколько, передайте каждую в отдельном <metro>.
  // ... параметры для метро
  // name, time-on-transport, time-on-foot

  @Column()
  "village-name": string // Название коттеджного посёлка. Только для загородной недвижимости.*/

  // Информация об объекте
  @Column({name: 'area_value', nullable: true})
  area_value: string // Общая площадь. Обязательный элемент для всех объявлений, кроме участков (см. элемент lot-area).
  // составное поле value + unit
  @Column({
    type: "enum",
    enum: ObjectInitAreaEnum,
    default: ObjectInitAreaEnum.m
  })
  area_init: ObjectInitAreaEnum

  @Column({name: 'room-space_value', nullable: true})
  "room-space_value": string
  @Column({
    type: "enum",
    enum: ObjectInitAreaEnum,
    default: ObjectInitAreaEnum.m
  })
  "room-space_init": ObjectInitAreaEnum

  /*@Column()
  "living-space": any

  @Column()
  "kitchen-space": any
 
  @Column()
  "lot-area": any*/



}
