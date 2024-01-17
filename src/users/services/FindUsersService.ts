import { UserDTO } from "../dtos/User.dto";

export interface IFindUsersService {
  execute(): Promise<UserDTO[]>;
}
