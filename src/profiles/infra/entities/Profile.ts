import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "../../../users/infra/entities/UserProfile";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: false,
  })
  label: string;

  @Column({
    nullable: false,
  })
  createdAt: Date;

  @Column({
    nullable: false,
  })
  updatedAt: Date;

  @OneToMany(() => UserProfile, (userProfiles) => userProfiles.profile)
  userProfiles: UserProfile[];
}
