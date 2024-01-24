import { ID, Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
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
