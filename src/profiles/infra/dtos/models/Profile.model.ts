import { ID, Field, ObjectType } from "type-graphql";

@ObjectType()
export class Profile {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  name: string;
}
