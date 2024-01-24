import { UserDTO } from "../../dtos/User.dto";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserDTO, ICreateUserService } from "../CreateUserService";

export class CreateUserService implements ICreateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user: CreateUserDTO): Promise<UserDTO> {
    const userRaw = {
      name: user.name,
      email: user.email,
      password: "",
      active: true,
      profile_id: 1,
    };

    const userCreated = await this.usersRepository.create(userRaw);

    return userCreated;
  }
}
