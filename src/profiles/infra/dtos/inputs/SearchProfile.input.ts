import { ID, Field, InputType } from "type-graphql";

@InputType()
export class SearchProfileInput {
  @Field((type) => ID)
  readonly id: string;
}
