import { ID, Int, Float, Field, ObjectType, InputType } from "type-graphql";
import { UserStatus } from "../../../dtos/User.dto";

@InputType()
export class UserInput {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => Int)
  age: number;

  @Field((type) => Float)
  salary_real: number;

  @Field()
  vip: boolean;

  @Field((type) => ID)
  profile_id: string;

  @Field((type) => UserStatus)
  status: UserStatus;
}
