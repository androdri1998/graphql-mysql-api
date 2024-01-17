import { ID, Field, InputType } from "type-graphql";

@InputType()
export class DeleteUserInput {
  @Field((type) => ID, { nullable: true })
  readonly id: string;

  @Field({ nullable: true })
  email: string;
}
