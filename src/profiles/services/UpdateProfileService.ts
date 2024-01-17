import { ProfileDTO } from "../dtos/Profile.dto";

export type TUpdateProfileFilterDTO = {
  id: string;
  name: string;
};

export type TUpdateProfileDTO = {
  name: string;
};

export interface IUdpateProfileService {
  execute(
    filter: TUpdateProfileFilterDTO,
    profile: TUpdateProfileDTO
  ): Promise<ProfileDTO | null>;
}
