import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth_users')
export class TypeormUserEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column({ unique: true })
  phoneNumber: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
