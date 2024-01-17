import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import {
  IUdpateProfileService,
  TUpdateProfileDTO,
  TUpdateProfileFilterDTO,
} from "../UpdateProfileService";

export class UdpateProfileService implements IUdpateProfileService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(
    filter: TUpdateProfileFilterDTO,
    profile: TUpdateProfileDTO
  ): Promise<ProfileDTO | null> {
    return await this.profilesRepository.udpateByIdOrName(filter, profile);
  }
}
