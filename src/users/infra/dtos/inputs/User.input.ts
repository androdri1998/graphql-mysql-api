import { ID, Int, Float, Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  active: boolean;

  @Field((type) => Date)
  createdAt: boolean;

  @Field((type) => Date)
  updatedAt: boolean;
}
