import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import {
  IDeleteProfileService,
  TDeleteProfileDTO,
} from "../DeleteProfileService";

export class DeleteProfileService implements IDeleteProfileService {
  profilesRepository: ProfilesRepository;

  constructor(profilesRepository) {
    this.profilesRepository = profilesRepository;
  }

  async execute(data: TDeleteProfileDTO): Promise<boolean | null> {
    return await this.profilesRepository.deleteById(data.id);
  }
}
