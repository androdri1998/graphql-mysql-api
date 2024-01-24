import { UserDTO } from "../../dtos/User.dto";
import { UsersRepository } from "../../repositories/UsersRepository";
import { IFindUserService } from "../FindUserService";

export default class FindUserService implements IFindUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: number): Promise<UserDTO | null> {
    const user = await this.usersRepository.getById(id);
    return user;
  }
}
