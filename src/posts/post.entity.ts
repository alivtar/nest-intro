import { User } from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
    length: 10_000,
    nullable: false,
  })
  content: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  user_id: User['id'];
}
