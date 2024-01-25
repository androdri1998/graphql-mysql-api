import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "./UserProfile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    default: true,
  })
  active: boolean;

  @Column({
    nullable: false,
  })
  createdAt: Date;

  @Column({
    nullable: false,
  })
  updatedAt: Date;

  @OneToMany(() => UserProfile, (userProfiles) => userProfiles.user)
  userProfiles: UserProfile[];
}
