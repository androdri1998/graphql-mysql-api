import { UserDTO, UserStatus } from "../../dtos/User.dto";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserDTO, ICreateUserService } from "../CreateUserService";

export class CreateUserService implements ICreateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user: CreateUserDTO): Promise<UserDTO> {
    const isUserCreated = await this.usersRepository.getByEmail(user.email);
    if (isUserCreated) {
      throw new Error("E-mail alrealdy in use");
    }

    const userRaw = {
      name: user.name,
      email: user.email,
      age: user.age,
      salary_real: null,
      vip: false,
      status: UserStatus.ACTIVE,
      profile_id: "1",
    };

    const userCreated = await this.usersRepository.create(userRaw);

    return userCreated;
  }
}
