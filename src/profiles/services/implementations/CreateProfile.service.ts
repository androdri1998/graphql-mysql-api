import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import {
  ICreateProfileService,
  TCreateProfileDTO,
} from "../CreateProfileService";

export class CreateProfileService implements ICreateProfileService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(data: TCreateProfileDTO): Promise<ProfileDTO> {
    const profile = await this.profilesRepository.create(data.name);

    return profile;
  }
}
