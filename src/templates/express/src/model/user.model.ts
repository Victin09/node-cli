import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    firstName?: string;

    @Column('text')
    lastName?: string;

    @Column('text')
    username!: string;

    @Column('text')
    password!: string;

    @Column('text')
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}