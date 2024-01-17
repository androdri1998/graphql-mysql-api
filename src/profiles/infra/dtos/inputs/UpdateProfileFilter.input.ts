import { ID, Field, InputType } from "type-graphql";

@InputType()
export class UpdateProfileFilterInput {
  @Field((type) => ID, { nullable: true })
  readonly id: string;
  @Field({ nullable: true })
  name: string;
}
