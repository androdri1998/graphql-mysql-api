import { IUserProfilesRepository } from "../../repositories/UserProfileRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { IDeleteUserService, TDeleteUserDTO } from "../DeleteUserService";

export class DeleteUserService implements IDeleteUserService {
  usersRepository: UsersRepository;
  userProfilesRepository: IUserProfilesRepository;

  constructor(
    usersRepository: UsersRepository,
    userProfilesRepository: IUserProfilesRepository
  ) {
    this.usersRepository = usersRepository;
    this.userProfilesRepository = userProfilesRepository;
  }

  async execute({ email, id }: TDeleteUserDTO): Promise<Boolean> {
    if (id) {
      await this.userProfilesRepository.deleteByUserId(parseInt(id));
      return await this.usersRepository.deleteById(parseInt(id));
    }

    if (email) {
      const user = await this.usersRepository.getByEmail(email);
      await this.userProfilesRepository.deleteByUserId(user.id);
      return await this.usersRepository.deleteByEmail(email);
    }
  }
}
