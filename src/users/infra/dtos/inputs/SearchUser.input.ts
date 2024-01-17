import { ID, Field, InputType } from "type-graphql";

@InputType()
export class SearchUserInput {
  @Field((type) => ID)
  readonly id: string;
}
