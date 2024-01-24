import { UserDTO } from "../dtos/User.dto";

export interface IFindUserService {
  execute(id: number): Promise<UserDTO | null>;
}
