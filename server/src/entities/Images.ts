import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Orphanage from './Orphanage';

@Entity('images')
class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;
}

export default Image;
