import * as UuidHelper from "../../../app/infra/helpers/UuidHelper.helper";
import {
  IDatabaseProvider,
  TInsertRow,
  TQueryRows,
} from "../../../app/providers/DatabaseProvider";
import { IHashProvider } from "../../../app/providers/HashProvider";
import { UserDTO } from "../../dtos/User.dto";
import * as UserHelper from "../../helpers/UserHelper";
import { IUserProfilesRepository } from "../../repositories/UserProfileRepository";
import {
  TCreateUserDTO,
  UsersRepository as IUsersRepository,
} from "../../repositories/UsersRepository";
import { IFindUsersDTO } from "../../services/FindUsersService";
import {
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../../services/UpdateUserService";

export default class UsersRepository implements IUsersRepository {
  databaseProvider: IDatabaseProvider;
  hashProvider: IHashProvider;
  userProfilesRepository: IUserProfilesRepository;

  constructor(
    databaseProvider: IDatabaseProvider,
    userProfilesRepository: IUserProfilesRepository,
    hashProvider: IHashProvider
  ) {
    this.databaseProvider = databaseProvider;
    this.hashProvider = hashProvider;
    this.userProfilesRepository = userProfilesRepository;
  }

  async getById(id: number): Promise<UserDTO | null> {
    const user = await this.databaseProvider.raw<TQueryRows<UserDTO>>(
      `
      SELECT * FROM user WHERE id=?;
    `,
      [id]
    );

    return user[0] || null;
  }

  async getByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.databaseProvider.raw<TQueryRows<UserDTO>>(
      `
      SELECT * FROM user WHERE email=?;
    `,
      [email]
    );

    return user[0] || null;
  }

  async index(filter: IFindUsersDTO): Promise<UserDTO[]> {
    const offset = filter.limit * filter.page;
    const users = await this.databaseProvider.raw<TQueryRows<UserDTO>>(
      `
      SELECT * FROM user limit ?, ?;
    `,
      [offset, filter.limit]
    );

    return users;
  }

  async create(userDTO: TCreateUserDTO): Promise<UserDTO> {
    const hash = await this.hashProvider.generate(userDTO.password);
    const currentDate = new Date();

    const user = {
      name: userDTO.name,
      email: userDTO.email,
      password: hash,
      active: userDTO.active,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const userResponse = await this.databaseProvider.raw<TInsertRow>(
      `
      INSERT INTO user(name, email, password, active, createdAt, updatedAt)
      VALUES(?, ?, ?, ?, ?, ?);
    `,
      [
        user.name,
        user.email,
        user.password,
        user.active,
        user.createdAt,
        user.updatedAt,
      ]
    );

    const userCreated: UserDTO = {
      ...user,
      id: userResponse.insertId,
    };

    await this.userProfilesRepository.create(
      userCreated.id,
      userDTO.profile_id
    );

    return userCreated;
  }

  async deleteById(id: number): Promise<Boolean> {
    await this.userProfilesRepository.deleteByUserId(id);
    await this.databaseProvider.raw<TInsertRow>(
      `
      DELETE FROM user WHERE id=?;
    `,
      [id]
    );

    return true;
  }

  async deleteByEmail(email: string): Promise<Boolean> {
    const user = await this.getByEmail(email);
    await this.userProfilesRepository.deleteByUserId(user.id);
    await this.databaseProvider.raw<TInsertRow>(
      `
      DELETE FROM user WHERE email=?;
    `,
      [email]
    );

    return true;
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
