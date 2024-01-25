import {
  IDatabaseProvider,
  TInsertRow,
  TQueryRows,
} from "../../../app/providers/DatabaseProvider";
import { IHashProvider } from "../../../app/providers/HashProvider";
import { UserDTO } from "../../dtos/User.dto";
import { IUserProfilesRepository } from "../../repositories/UserProfileRepository";
import {
  TCreateUserDTO,
  UsersRepository as IUsersRepository,
} from "../../repositories/UsersRepository";
import { IFindUsersDTO } from "../../services/FindUsersService";
import { TUpdateUserDTO } from "../../services/UpdateUserService";

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

  async updateById(id: number, userData: TUpdateUserDTO): Promise<UserDTO> {
    const hash = userData.password
      ? await this.hashProvider.generate(userData.password)
      : undefined;
    const user = await this.getById(id);

    const getValue = (firstValue, secondValue) => {
      return firstValue !== undefined ? firstValue : secondValue;
    };

    const userUpdated: UserDTO = {
      id,
      active: getValue(userData.active, user.active),
      email: getValue(userData.email, user.email),
      name: getValue(userData.name, user.name),
      password: getValue(hash, user.password),
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };

    await this.databaseProvider.raw<TInsertRow>(
      `
      UPDATE user SET name = ?, email = ?, password = ?, active = ?, updatedAt = ?
      WHERE id=?;
    `,
      [
        userUpdated.name,
        userUpdated.email,
        userUpdated.password,
        userUpdated.active,
        userUpdated.updatedAt,
        userUpdated.id,
      ]
    );

    if (userData.profile_id) {
      await this.userProfilesRepository.updateByUserId(
        user.id,
        parseInt(userData.profile_id)
      );
    }

    return userUpdated;
  }

  async updateByEmail(
    email: string,
    userData: TUpdateUserDTO
  ): Promise<UserDTO> {
    const hash = userData.password
      ? await this.hashProvider.generate(userData.password)
      : undefined;
    const user = await this.getByEmail(email);

    const getValue = (firstValue, secondValue) => {
      return firstValue !== undefined ? firstValue : secondValue;
    };

    const userUpdated: UserDTO = {
      id: user.id,
      active: getValue(userData.active, user.active),
      email: getValue(userData.email, user.email),
      name: getValue(userData.name, user.name),
      password: getValue(hash, user.password),
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };

    await this.databaseProvider.raw<TInsertRow>(
      `
      UPDATE user SET name = ?, email = ?, password = ?, active = ?, updatedAt = ?
      WHERE email=?;
    `,
      [
        userUpdated.name,
        userUpdated.email,
        userUpdated.password,
        userUpdated.active,
        userUpdated.updatedAt,
        email,
      ]
    );

    if (userData.profile_id) {
      await this.userProfilesRepository.updateByUserId(
        user.id,
        parseInt(userData.profile_id)
      );
    }

    return userUpdated;
  }
}
