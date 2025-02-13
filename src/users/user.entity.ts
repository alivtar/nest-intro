import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 96,
  })
  firstName: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 96,
  })
  lastName: string;

  @Column({
    nullable: false,
    unique: true,
    type: 'varchar',
    length: 96,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
