import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity({ name: 'user_followers' })
export class UserFollowerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followingId: number;

    @Column()
    followerId: number;

    @OneToOne(() => UserEntity, user => user.followings)
    @JoinColumn()
    following: UserEntity;

    @OneToOne(() => UserEntity, user => user.followers)
    @JoinColumn()
    follower: UserEntity;
}
