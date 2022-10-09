/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: "customer", schema: "retail_customer" })
export class Customer extends BaseEntity {
    constructor(partial: Partial<Customer>) {
        super();
        Object.assign(this, partial);
    }
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    first_name: string;

    @ApiProperty()
    @Column()
    last_name: string;

    @ApiProperty()
    @Column({ length: 50 })
    phone_number: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiHideProperty()
    @Column()
    @Exclude()
    password: string;

    @ApiHideProperty()
    @Column()
    @Exclude()
    salt: string;

    @ApiProperty()
    @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
        
    }

    async validateEmail(email: string): Promise<boolean> {
        return email === this.email;
    }

}
