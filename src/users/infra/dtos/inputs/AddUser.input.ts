import { Int, Field, InputType } from "type-graphql";

@InputType()
export class AddUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field((type) => Int)
  age: number;
}
