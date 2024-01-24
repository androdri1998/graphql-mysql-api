import { UserDTO } from "../../dtos/User.dto";
import { IFindUsersDTO, IFindUsersService } from "../FindUsersService";
import { UsersRepository } from "../../repositories/UsersRepository";

export default class FindUsersService implements IFindUsersService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(filter: IFindUsersDTO): Promise<UserDTO[]> {
    const users = await this.usersRepository.index(filter);
    return users;
  }
}
