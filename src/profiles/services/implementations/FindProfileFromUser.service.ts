import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import { IFindProfileFromUserService } from "../FindProfileFromUserService";

export default class FindProfileFromUserService
  implements IFindProfileFromUserService
{
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository: ProfilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(userId: number): Promise<ProfileDTO[]> {
    const profiles = await this.profilesRepository.getByUserId(userId);

    return profiles;
  }
}
