import { IUserProfilesRepository } from "../../../users/repositories/UserProfileRepository";
import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import { IFindProfileFromUserService } from "../FindProfileFromUserService";

export default class FindProfileFromUserService
  implements IFindProfileFromUserService
{
  profilesRepository: ProfilesRepository;
  userProfilesRepository: IUserProfilesRepository;

  constructor(
    profilesRepository: ProfilesRepository,
    userProfilesRepository: IUserProfilesRepository
  ) {
    this.profilesRepository = profilesRepository;
    this.userProfilesRepository = userProfilesRepository;
  }

  async execute(userId: number): Promise<ProfileDTO | null> {
    const user = await this.userProfilesRepository.getByUserId(userId);
    const profile = await this.profilesRepository.getById(user.profileId);

    return profile;
  }
}
