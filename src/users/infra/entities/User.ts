import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
