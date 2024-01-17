import { ID, Int, Float, Field, ObjectType, InputType } from "type-graphql";
import { UserStatus } from "../../../dtos/User.dto";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field((type) => Int, { nullable: true })
  age: number;

  @Field((type) => Float, { nullable: true })
  salary_real: number;

  @Field({ nullable: true })
  vip: boolean;

  @Field((type) => ID, { nullable: true })
  profile_id: string;

  @Field((type) => UserStatus, { nullable: true })
  status: UserStatus;
}
