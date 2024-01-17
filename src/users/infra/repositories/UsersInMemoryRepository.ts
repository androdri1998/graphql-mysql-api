import * as UuidHelper from "../../../app/infra/helpers/UuidHelper.helper";
import { UserDTO } from "../../dtos/User.dto";
import * as UserHelper from "../../helpers/UserHelper";
import {
  TCreateUserDTO,
  UsersRepository,
} from "../../repositories/UsersRepository";
import {
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../../services/UpdateUserService";

export default class UsersInMemoryRepository implements UsersRepository {
  databaseProvider: UserDTO[];

  constructor(databaseProvider: UserDTO[]) {
    this.databaseProvider = databaseProvider;
  }

  async getById(id: string): Promise<UserDTO | null> {
    const foundUser = this.databaseProvider.find((user) => user.id === id);

    return foundUser || null;
  }

  async getByEmail(email: string): Promise<UserDTO | null> {
    const foundUser = this.databaseProvider.find(
      (user) => user.email === email
    );

    return foundUser || null;
  }

  async index(): Promise<UserDTO[]> {
    return Object.values(this.databaseProvider).map((value) => value);
  }
  async create(userDTO: TCreateUserDTO): Promise<UserDTO> {
    const user: UserDTO = { ...userDTO, id: UuidHelper.generate() };

    this.databaseProvider.push(user);

    return user;
  }

  async deleteByIdOrEmail(identifier: string): Promise<Boolean | null> {
    const userIndex = UserHelper.findByIdOrEmail(
      identifier,
      this.databaseProvider
    );

    if (userIndex < 0) {
      return null;
    }

    this.databaseProvider.splice(userIndex, 1);

    return true;
  }

  async updateById(
    filter: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO> {
    const identifier = filter.id || filter.email;

    if (!identifier) {
      return null;
    }

    const userIndex = UserHelper.findByIdOrEmail(
      identifier,
      this.databaseProvider
    );

    if (userIndex < 0) {
      return null;
    }

    const currentUser = this.databaseProvider[userIndex];
    const userUpdated = {
      ...currentUser,
      ...user,
    };

    this.databaseProvider.splice(userIndex, 1, userUpdated);

    return userUpdated;
  }
}
