import { ID, Field, InputType } from "type-graphql";

@InputType()
export class DeleteProfileInput {
  @Field((type) => ID)
  readonly id: string;
}
