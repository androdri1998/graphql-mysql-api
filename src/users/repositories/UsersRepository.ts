import { UserDTO } from "../dtos/User.dto";
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
  index(): Promise<UserDTO[]>;
  create(user: TCreateUserDTO): Promise<UserDTO>;
  deleteByIdOrEmail(identifier: string): Promise<Boolean | null>;
  updateById(
    filter: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO>;
}
