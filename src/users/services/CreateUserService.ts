import { UserDTO } from "../dtos/User.dto";

export type CreateUserDTO = {
  name: string;
  email: string;
  age: number;
};

export interface ICreateUserService {
  execute(data: CreateUserDTO): Promise<UserDTO>;
}
