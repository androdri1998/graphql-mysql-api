import { ProfileDTO } from "../dtos/Profile.dto";
import {
  TUpdateProfileDTO,
  TUpdateProfileFilterDTO,
} from "../services/UpdateProfileService";

export interface ProfilesRepository {
  getById(id: string): Promise<ProfileDTO | null>;
  index(): Promise<ProfileDTO[]>;
  create(name: string): Promise<ProfileDTO>;
  deleteById(id: string): Promise<boolean | null>;
  udpateByIdOrName(
    filter: TUpdateProfileFilterDTO,
    profile: TUpdateProfileDTO
  ): Promise<ProfileDTO | null>;
}
