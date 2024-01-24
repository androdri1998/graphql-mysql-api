import { Field, InputType } from "type-graphql";

@InputType()
export class SearchProfilesFilterInput {
  @Field()
  readonly limit: number;

  @Field()
  readonly page: number;
}
