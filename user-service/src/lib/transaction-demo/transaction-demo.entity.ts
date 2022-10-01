import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne, ManyToOne } from "typeorm";


@Entity({ schema: "schema-name", name: "table-name" })  //Replace "schema-name" and "table-name" suitable in DB
export class TransactionDemoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    demo_name: string;

    @Column()
    updated_by_user_id: number;

    @Column({type: 'varchar', length: 200})
    action : string
    
    @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    // @OneToOne(type => AppUser , appUser=> appUser.demo)
    // @JoinColumn({ name: 'updated_by_user_id', referencedColumnName: 'id' })
    // appUser: AppUser;
    
}