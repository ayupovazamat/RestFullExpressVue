import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('objects')
export class ObjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'price', nullable: false })
    price: number;
}
