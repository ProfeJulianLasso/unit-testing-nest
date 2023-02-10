import { Column, Entity, Index } from 'typeorm';

@Index('user_email_index', ['email'], { unique: true })
@Index('user_pk', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class UserEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'email', length: 500 })
  email: string;

  @Column('character varying', { name: 'phone', nullable: true, length: 10 })
  phone: string | null;
}
