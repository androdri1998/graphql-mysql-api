import { UserDTO } from "../dtos/User.dto";

export interface IFindUserService {
  execute(id: string): Promise<UserDTO | null>;
}
