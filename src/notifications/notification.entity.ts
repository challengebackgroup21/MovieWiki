import { IsNumber, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Movie } from '../movies/movie.entity';
import { Post } from '../posts/post.entity';
import { NotificationStatus } from './notification-status.enum';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  notiId: number;

  @Column({ name: 'postId' })
  postId: number;

  @Column({ name: 'movieId', nullable: true })
  movieId: number;

  @Column({ name: 'reporterId' })
  reporterId: number;

  @Column({ name: 'reportedId' })
  reportedId: number;

  @Column()
  @IsString()
  notificationContent: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.AWAIT,
  })
  @IsString()
  status: NotificationStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reporterId' })
  reporter: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reportedId' })
  reported: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;
}
