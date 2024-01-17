import {
  ID,
  Int,
  Float,
  Field,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { UserStatus } from "../../../dtos/User.dto";

registerEnumType(UserStatus, {
  name: "UserStatus",
  description: "User status",
});

@ObjectType()
export class User {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => Int, { nullable: true })
  age?: number;

  @Field((type) => Float, { nullable: true })
  salary?: number;

  @Field({ nullable: true })
  vip?: boolean;

  @Field((type) => UserStatus)
  status?: UserStatus;
}
