import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn} from "typeorm";

@Entity('objects')
export class ObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  //@VersionColumn()
  //version: number;

  @Column({
    //type: 'float',
    name: 'price',
    nullable: false
  })
  price: number;

  /*@Column({name: 'description', nullable: true})
  description: string*/

  //@Column({name: 'category', nullable: false})
  //category: number;
}
