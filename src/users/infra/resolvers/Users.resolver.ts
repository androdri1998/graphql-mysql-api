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
import UsersRepository from "../repositories/UsersRepository";
import FindUsersService from "../../services/implementations/FindUsers.service";
import FindUserService from "../../services/implementations/FindUser.service";
import ProfilesRepository from "../../../profiles/infra/repositories/ProfilesRepository";
import { Profile } from "../../../profiles/infra/dtos/models/Profile.model";
import { AddUserInput } from "../dtos/inputs/AddUser.input";
import { CreateUserService } from "../../services/implementations/CreateUser.service";
import { DeleteUserInput } from "../dtos/inputs/DeleteUser.input";
import { DeleteUserService } from "../../services/implementations/DeleteUser.service";
import { UpdateUserService } from "../../services/implementations/UpdateUser.service";
import { UpdateUserInput } from "../dtos/inputs/UpdateUser.input";
import { UpdateUserFilterInput } from "../dtos/inputs/UpdateUserFilter.input";
import { databaseProvider } from "../../../app/infra/providers/DatabaseProvider";
import { SearchUsersInput } from "../dtos/inputs/SearchUsers.input";
import UserProfilesRepository from "../repositories/UserProfileRepository";
import { HashProvider } from "../../../app/infra/providers/HashProvider";
import FindProfileFromUserService from "../../../profiles/services/implementations/FindProfileFromUser.service";

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("data") userData: SearchUserInput) {
    const usersRepository = new UsersRepository(databaseProvider);
    const findUserService = new FindUserService(usersRepository);

    const user = await findUserService.execute(parseInt(userData.id));

    return user;
  }

  @Query(() => [User], { nullable: "items" })
  async users(@Arg("data") filter: SearchUsersInput) {
    const usersRepository = new UsersRepository(databaseProvider);
    const findUsersService = new FindUsersService(usersRepository);

    const users = await findUsersService.execute(filter);

    return users;
  }

  @Mutation(() => User)
  async addUser(@Arg("data") newUser: AddUserInput) {
    const userProfilesRepository = new UserProfilesRepository(databaseProvider);
    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository(databaseProvider);
    const createUserService = new CreateUserService(
      usersRepository,
      userProfilesRepository,
      hashProvider
    );

    const user = await createUserService.execute(newUser);

    return user;
  }

  @Mutation(() => Boolean, {
    nullable: true,
  })
  async deleteUser(@Arg("data") user: DeleteUserInput) {
    const userProfilesRepository = new UserProfilesRepository(databaseProvider);

    const usersRepository = new UsersRepository(databaseProvider);
    const deleteUserService = new DeleteUserService(
      usersRepository,
      userProfilesRepository
    );

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
    const userProfilesRepository = new UserProfilesRepository(databaseProvider);
    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository(databaseProvider);
    const updateUserService = new UpdateUserService(
      usersRepository,
      userProfilesRepository,
      hashProvider
    );

    const userUpdated = await updateUserService.execute(filter, user);

    return userUpdated;
  }

  @FieldResolver(() => [Profile], { nullable: "items" })
  async profiles(@Root() user: UserInput) {
    const profilesRepository = new ProfilesRepository(databaseProvider);
    const findProfileFromUserService = new FindProfileFromUserService(
      profilesRepository
    );

    const profile = await findProfileFromUserService.execute(parseInt(user.id));

    return profile;
  }
}
