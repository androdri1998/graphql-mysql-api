import { Field, InputType } from "type-graphql";

@InputType()
export class SearchUsersInput {
  @Field()
  limit: number;

  @Field()
  page: number;
}
