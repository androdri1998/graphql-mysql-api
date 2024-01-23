import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Profile } from "../../../profiles/infra/entities/Profile";
import { User } from "./User";

@Entity()
export class UserProfile {
  @Column({
    nullable: false,
  })
  id: string;

  @PrimaryColumn({
    nullable: false,
  })
  userId: number;

  @PrimaryColumn({
    nullable: false,
  })
  profileId: number;

  @Column({
    nullable: false,
  })
  createdAt: Date;

  @Column({
    nullable: false,
  })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Profile, (profile) => profile.userProfiles)
  @JoinColumn({ name: "profileId" })
  profile: Profile;
}
