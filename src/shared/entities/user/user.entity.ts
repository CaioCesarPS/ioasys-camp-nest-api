import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ name: 'first_name' })
  public firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name' })
  public lastName: string;

  @ApiProperty()
  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  // @ApiProperty()
  // @ManyToMany(() => Terms)
  // @JoinTable({
  //   name: 'terms_users',
  //   joinColumns: [{ name: 'user_id' }],
  //   inverseJoinColumns: [{ name: 'term_id' }],
  // })
  // terms: Terms[];
}
