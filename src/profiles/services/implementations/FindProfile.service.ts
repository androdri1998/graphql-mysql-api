import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import { IFindProfileDTO, IFindProfileService } from "../FindProfileService";

export default class FindProfileService implements IFindProfileService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository: ProfilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute({ id, name }: IFindProfileDTO): Promise<ProfileDTO | null> {
    if (id) {
      return await this.profilesRepository.getById(parseInt(id));
    }

    if (name) {
      return await this.profilesRepository.getByName(name);
    }
  }
}
