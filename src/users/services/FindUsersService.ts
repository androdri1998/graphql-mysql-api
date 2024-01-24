import { UserDTO } from "../dtos/User.dto";

export type IFindUsersDTO = {
  limit: number;
  page: number;
};

export interface IFindUsersService {
  execute(filter: IFindUsersDTO): Promise<UserDTO[]>;
}
