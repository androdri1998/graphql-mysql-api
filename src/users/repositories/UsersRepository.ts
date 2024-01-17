import { UserDTO } from "../dtos/User.dto";
import {
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../services/UpdateUserService";

export type TCreateUserDTO = Omit<UserDTO, "id">;

export interface UsersRepository {
  getById(id: string): Promise<UserDTO | null>;
  index(): Promise<UserDTO[]>;
  create(user: TCreateUserDTO): Promise<UserDTO>;
  getByEmail(email: string): Promise<UserDTO | null>;
  deleteByIdOrEmail(identifier: string): Promise<Boolean | null>;
  updateById(
    filter: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO>;
}
