import { ID, Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field((type) => [ID], { nullable: true })
  addProfileIds: string[];

  @Field((type) => [ID], { nullable: true })
  removeProfileIds: string[];

  @Field({ nullable: true })
  active: boolean;
}
