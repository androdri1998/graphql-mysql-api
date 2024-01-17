import { UserDTO } from "../dtos/User.dto";

export interface IConvertSalaryService {
  execute(user: UserDTO): number | null;
}
