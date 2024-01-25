import { UserDTO } from "../dtos/User.dto";
import { IFindUsersDTO } from "../services/FindUsersService";
import {
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../services/UpdateUserService";

export type TCreateUserDTO = {
  name: string;
  email: string;
  password: string;
  active: boolean;
  profile_id: number;
};

export interface UsersRepository {
  getById(id: number): Promise<UserDTO | null>;
  getByEmail(email: string): Promise<UserDTO | null>;
  index(filter: IFindUsersDTO): Promise<UserDTO[]>;
  create(user: TCreateUserDTO): Promise<UserDTO>;
  deleteById(id: number): Promise<Boolean>;
  deleteByEmail(email: string): Promise<Boolean>;
  updateById(id: number, user: TUpdateUserDTO): Promise<UserDTO>;
  updateByEmail(email: string, user: TUpdateUserDTO): Promise<UserDTO>;
}
