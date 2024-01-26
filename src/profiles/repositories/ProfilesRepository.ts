import { ProfileDTO } from "../dtos/Profile.dto";
import { IFindProfilesFilterDTO } from "../services/FindProfilesService";
import {
  TUpdateProfileDTO,
  TUpdateProfileFilterDTO,
} from "../services/UpdateProfileService";

export interface ProfilesRepository {
  getByUserId(userId: number): Promise<ProfileDTO[]>;
  getById(id: number): Promise<ProfileDTO | null>;
  getByName(name: string): Promise<ProfileDTO | null>;
  index(filter: IFindProfilesFilterDTO): Promise<ProfileDTO[]>;
  create(name: string): Promise<ProfileDTO>;
  deleteById(id: string): Promise<boolean>;
  udpateByIdOrName(
    filter: TUpdateProfileFilterDTO,
    profile: TUpdateProfileDTO
  ): Promise<ProfileDTO | null>;
}
