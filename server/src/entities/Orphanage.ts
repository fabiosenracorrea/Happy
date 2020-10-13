import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Image from './Images';

@Entity('orphanages')
class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column('text')
  about: string;

  @Column('text')
  instructions: string;

  @Column('varchar')
  opening_hours: string;

  @Column('boolean')
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}

export default Orphanage;
