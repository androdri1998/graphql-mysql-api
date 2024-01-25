import { IHashProvider } from "../../../app/providers/HashProvider";
import { UserDTO } from "../../dtos/User.dto";
import { IUserProfilesRepository } from "../../repositories/UserProfileRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserDTO, ICreateUserService } from "../CreateUserService";

export class CreateUserService implements ICreateUserService {
  usersRepository: UsersRepository;
  userProfilesRepository: IUserProfilesRepository;
  hashProvider: IHashProvider;

  constructor(
    usersRepository: UsersRepository,
    userProfilesRepository: IUserProfilesRepository,
    hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.userProfilesRepository = userProfilesRepository;
    this.hashProvider = hashProvider;
  }

  async execute(user: CreateUserDTO): Promise<UserDTO> {
    const hash = await this.hashProvider.generate(user.password);
    const userRaw = {
      name: user.name,
      email: user.email,
      password: hash,
      active: true,
    };

    const userCreated = await this.usersRepository.create(userRaw);

    for (let index = 0; index < user.profileIds.length; index++) {
      const profileId = parseInt(user.profileIds[index]);
      await this.userProfilesRepository.create(userCreated.id, profileId);
    }

    return userCreated;
  }
}
