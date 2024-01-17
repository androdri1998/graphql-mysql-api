import { ProfileDTO } from "../../dtos/Profile.dto";
import { IFindProfilesService } from "../FindProfilesService";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";

export default class FindProfilesService implements IFindProfilesService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository: ProfilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(): Promise<ProfileDTO[]> {
    const profiles = await this.profilesRepository.index();
    return profiles;
  }
}
