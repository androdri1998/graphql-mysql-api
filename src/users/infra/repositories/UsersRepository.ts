import {
  IDatabaseProvider,
  TInsertRow,
  TQueryRows,
} from "../../../app/providers/DatabaseProvider";
import { UserDTO } from "../../dtos/User.dto";
import {
  TCreateUserDTO,
  UsersRepository as IUsersRepository,
} from "../../repositories/UsersRepository";
import { IFindUsersDTO } from "../../services/FindUsersService";
import { TUpdateUserDTO } from "../../services/UpdateUserService";

export default class UsersRepository implements IUsersRepository {
  databaseProvider: IDatabaseProvider;

  constructor(databaseProvider: IDatabaseProvider) {
    this.databaseProvider = databaseProvider;
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
    const currentDate = new Date();

    const user = {
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
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

    return userCreated;
  }

  async deleteById(id: number): Promise<Boolean> {
    await this.databaseProvider.raw<TInsertRow>(
      `
      DELETE FROM user WHERE id=?;
    `,
      [id]
    );

    return true;
  }

  async deleteByEmail(email: string): Promise<Boolean> {
    await this.databaseProvider.raw<TInsertRow>(
      `
      DELETE FROM user WHERE email=?;
    `,
      [email]
    );

    return true;
  }

  async updateById(id: number, userData: TUpdateUserDTO): Promise<UserDTO> {
    const user = await this.getById(id);

    const getValue = (firstValue, secondValue) => {
      return firstValue !== undefined ? firstValue : secondValue;
    };

    const userUpdated: UserDTO = {
      id,
      active: getValue(userData.active, user.active),
      email: getValue(userData.email, user.email),
      name: getValue(userData.name, user.name),
      password: getValue(userData.password, user.password),
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

    return userUpdated;
  }

  async updateByEmail(
    email: string,
    userData: TUpdateUserDTO
  ): Promise<UserDTO> {
    const user = await this.getByEmail(email);

    const getValue = (firstValue, secondValue) => {
      return firstValue !== undefined ? firstValue : secondValue;
    };

    const userUpdated: UserDTO = {
      id: user.id,
      active: getValue(userData.active, user.active),
      email: getValue(userData.email, user.email),
      name: getValue(userData.name, user.name),
      password: getValue(userData.password, user.password),
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

    return userUpdated;
  }
}
