import { UserDTO } from "../dtos/User.dto";
export type TUpdateUserFilterDTO = {
  id?: string;
  email?: string;
};

export type TUpdateUserDTO = {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  profileIds?: string[];
};

export interface IUpdateUserService {
  execute(filter: TUpdateUserFilterDTO, user: TUpdateUserDTO): Promise<UserDTO>;
}
