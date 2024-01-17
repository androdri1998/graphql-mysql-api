import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;
}
