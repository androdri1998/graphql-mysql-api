import { UserDTO } from "../../dtos/User.dto";
import { IConvertSalaryService } from "../ConvertSalaryService";

export default class ConvertSalaryService implements IConvertSalaryService {
  execute(user: UserDTO): number | null {
    return user.salary_real || null;
  }
}
