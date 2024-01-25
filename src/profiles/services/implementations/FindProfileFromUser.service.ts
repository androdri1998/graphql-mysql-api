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

  async execute(userId: number): Promise<ProfileDTO[]> {
    const userProfiles = await this.userProfilesRepository.getByUserId(userId);

    let profiles: ProfileDTO[] = [];
    for (let index = 0; index < userProfiles.length; index++) {
      const profileId = userProfiles[index].profileId;

      const profile = await this.profilesRepository.getById(profileId);
      profiles.push(profile);
    }

    return profiles;
  }
}
