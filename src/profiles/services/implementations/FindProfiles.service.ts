import { ProfileDTO } from "../../dtos/Profile.dto";
import {
  IFindProfilesFilterDTO,
  IFindProfilesService,
} from "../FindProfilesService";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";

export default class FindProfilesService implements IFindProfilesService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository: ProfilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(filter: IFindProfilesFilterDTO): Promise<ProfileDTO[]> {
    const profiles = await this.profilesRepository.index(filter);
    return profiles;
  }
}
