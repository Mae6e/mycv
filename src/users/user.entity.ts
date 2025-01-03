import { Report } from "../reports/report.entity";
import {
  Entity, Column, PrimaryGeneratedColumn,
  AfterInsert, AfterUpdate, AfterRemove,
  OneToMany
} from "typeorm";
// import { Exclude } from "class-transformer";

@Entity()
export class User{
 @PrimaryGeneratedColumn()
 id: number;


  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @OneToMany(()=>Report , (report)=>report.user)
  reports: Report[];

  @Column({default:true})
  admin: boolean;

  @AfterInsert()
  logInserts() {
    console.log(`inserted user with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdates() {
    console.log(`updated user with id: ${this.id}`);
  }

  @AfterRemove()
  logDeletes() {
    console.log(`deleted user with id: ${this.id}`);
  }
}