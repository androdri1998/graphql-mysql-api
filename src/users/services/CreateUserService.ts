import { UserDTO } from "../dtos/User.dto";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  profileIds: string[];
};

export interface ICreateUserService {
  execute(data: CreateUserDTO): Promise<UserDTO>;
}
