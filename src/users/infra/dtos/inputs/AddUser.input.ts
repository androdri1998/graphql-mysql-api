import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AddUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field((type) => [ID])
  profileIds: string[];
}
