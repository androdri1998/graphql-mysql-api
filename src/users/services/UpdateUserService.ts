import { UserDTO, UserStatus } from "../dtos/User.dto";
export type TUpdateUserFilterDTO = {
  id?: string;
  email?: string;
};

export type TUpdateUserDTO = {
  name?: string;
  email?: string;
  age?: number;
  salary_real?: number;
  vip?: boolean;
  status?: UserStatus;
  profile_id?: string;
};

export interface IUpdateUserService {
  execute(filter: TUpdateUserFilterDTO, user: TUpdateUserDTO): Promise<UserDTO>;
}
