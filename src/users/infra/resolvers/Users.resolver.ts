import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { User } from "../dtos/models/User.model";
import { UserInput } from "../dtos/inputs/User.input";
import { SearchUserInput } from "../dtos/inputs/SearchUser.input";
import { users as usersData } from "../database";
import UsersInMemoryRepository from "../repositories/UsersInMemoryRepository";
import FindUsersService from "../../services/implementations/FindUsers.service";
import ConvertSalaryService from "../../services/implementations/ConvertSalary.service";
import FindUserService from "../../services/implementations/FindUser.service";
import ProfilesInMemoryRepository from "../../../profiles/infra/repositories/ProfilesInMemoryRepository";
import { profiles as profileData } from "../../../profiles/infra/database";
import FindProfileService from "../../../profiles/services/implementations/FindProfile.service";
import { Profile } from "../../../profiles/infra/dtos/models/Profile.model";
import { AddUserInput } from "../dtos/inputs/AddUser.input";
import { CreateUserService } from "../../services/implementations/CreateUser.service";
import { DeleteUserInput } from "../dtos/inputs/DeleteUser.input";
import { DeleteUserService } from "../../services/implementations/DeleteUser.service";
import { UpdateUserService } from "../../services/implementations/UpdateUser.service";
import { UpdateUserInput } from "../dtos/inputs/UpdateUser.input";
import { UpdateUserFilterInput } from "../dtos/inputs/UpdateUserFilter.input";

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("data") user: SearchUserInput) {
    const usersRepository = new UsersInMemoryRepository(usersData);
    const findUserService = new FindUserService(usersRepository);

    const users = await findUserService.execute(user.id);
    return users;
  }

  @Query(() => [User], { nullable: "items" })
  async users() {
    const usersRepository = new UsersInMemoryRepository(usersData);
    const findUsersService = new FindUsersService(usersRepository);

    const users = await findUsersService.execute();
    return users;
  }

  @Mutation(() => User)
  async addUser(@Arg("data") newUser: AddUserInput) {
    const usersRepository = new UsersInMemoryRepository(usersData);
    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute(newUser);

    return user;
  }

  @Mutation(() => Boolean, {
    nullable: true,
  })
  async deleteUser(@Arg("data") user: DeleteUserInput) {
    const usersRepository = new UsersInMemoryRepository(usersData);
    const deleteUserService = new DeleteUserService(usersRepository);

    const isUserDeleted = await deleteUserService.execute(user);

    return isUserDeleted;
  }

  @Mutation(() => User, {
    nullable: true,
  })
  async updateUser(
    @Arg("filter") filter: UpdateUserFilterInput,
    @Arg("user") user: UpdateUserInput
  ) {
    const usersRepository = new UsersInMemoryRepository(usersData);
    const updateUserService = new UpdateUserService(usersRepository);

    const userUpdated = await updateUserService.execute(filter, user);

    return userUpdated;
  }

  @FieldResolver()
  salary(@Root() user: UserInput) {
    const convertSalaryService = new ConvertSalaryService();

    const salary = convertSalaryService.execute(user);

    return salary;
  }

  @FieldResolver(() => Profile)
  async profile(@Root() user: UserInput) {
    const profilesRepository = new ProfilesInMemoryRepository(profileData);
    const findProfileService = new FindProfileService(profilesRepository);

    const profileFound = await findProfileService.execute(user.profile_id);
    return profileFound;
  }
}
