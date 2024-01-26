import { IHashProvider } from "../../../app/providers/HashProvider";
import { UserDTO } from "../../dtos/User.dto";
import { IUserProfilesRepository } from "../../repositories/UserProfileRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import {
  IUpdateUserService,
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../UpdateUserService";

export class UpdateUserService implements IUpdateUserService {
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

  async execute(
    { email, id }: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO> {
    let userUpdated: UserDTO | null = null;

    user.password = user.password
      ? await this.hashProvider.generate(user.password)
      : undefined;

    if (id) {
      userUpdated = await this.usersRepository.updateById(parseInt(id), user);
    }

    if (email) {
      userUpdated = await this.usersRepository.updateByEmail(email, user);
    }

    if (user.profileIds) {
      await this.userProfilesRepository.deleteByUserId(userUpdated.id);

      for (let index = 0; index < user.profileIds.length; index++) {
        const profileId = parseInt(user.profileIds[index]);

        const userProfile =
          await this.userProfilesRepository.getByUserIdAndProfileId(
            userUpdated.id,
            profileId
          );
        if (!userProfile) {
          await this.userProfilesRepository.create(userUpdated.id, profileId);
        }
      }
    }

    return userUpdated;
  }
}
