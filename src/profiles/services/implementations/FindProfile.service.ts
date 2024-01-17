import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import { IFindProfileService } from "../FindProfileService";

export default class FindProfileService implements IFindProfileService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository: ProfilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(id: string): Promise<ProfileDTO | null> {
    const profile = await this.profilesRepository.getById(id);
    return profile;
  }
}
