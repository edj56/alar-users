import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ select: false })
    @Exclude()
    password: string;

    @Column()
    birthDate: string;

    @Column({ enum: ['m', 'f', 'o'] })
    gender: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    country: string;

    @BeforeInsert()
    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    @BeforeUpdate()
    hashUpdatedPassword() {
        if (this.password) {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
        }
    }

    comparePassword(attempt: string): boolean {
        return bcrypt.compareSync(attempt, this.password);
    }

    @Expose()
    get age(): number {
        const birthDate = new Date(this.birthDate);
        const ageDifMs = Date.now() - birthDate.valueOf();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
