import * as UuidHelper from "../../../app/infra/helpers/UuidHelper.helper";
import { IDatabaseProvider } from "../../../app/providers/DatabaseProvider";
import { UserDTO } from "../../dtos/User.dto";
import * as UserHelper from "../../helpers/UserHelper";
import {
  TCreateUserDTO,
  UsersRepository as IUsersRepository,
} from "../../repositories/UsersRepository";
import {
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../../services/UpdateUserService";

export default class UsersRepository implements IUsersRepository {
  databaseProvider: IDatabaseProvider;

  constructor(databaseProvider: IDatabaseProvider) {
    this.databaseProvider = databaseProvider;
  }

  async getById(id: string): Promise<UserDTO | null> {
    // const foundUser = this.databaseProvider.find((user) => user.id === id);
    // return foundUser || null;

    return null;
  }

  async getByEmail(email: string): Promise<UserDTO | null> {
    // const foundUser = this.databaseProvider.find(
    //   (user) => user.email === email
    // );
    // return foundUser || null;

    return null;
  }

  async index(): Promise<UserDTO[]> {
    // return Object.values(this.databaseProvider).map((value) => value);

    return [];
  }
  async create(userDTO: TCreateUserDTO): Promise<UserDTO> {
    // const user: UserDTO = { ...userDTO, id: UuidHelper.generate() };
    // this.databaseProvider.push(user);
    // return user;

    return {} as UserDTO;
  }

  async deleteByIdOrEmail(identifier: string): Promise<Boolean | null> {
    // const userIndex = UserHelper.findByIdOrEmail(
    //   identifier,
    //   this.databaseProvider
    // );
    // if (userIndex < 0) {
    //   return null;
    // }
    // this.databaseProvider.splice(userIndex, 1);
    // return true;

    return null;
  }

  async updateById(
    filter: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO> {
    // const identifier = filter.id || filter.email;
    // if (!identifier) {
    //   return null;
    // }
    // const userIndex = UserHelper.findByIdOrEmail(
    //   identifier,
    //   this.databaseProvider
    // );
    // if (userIndex < 0) {
    //   return null;
    // }
    // const currentUser = this.databaseProvider[userIndex];
    // const userUpdated = {
    //   ...currentUser,
    //   ...user,
    // };
    // this.databaseProvider.splice(userIndex, 1, userUpdated);
    // return userUpdated;

    return {} as UserDTO;
  }
}
