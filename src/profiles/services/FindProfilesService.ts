import { ProfileDTO } from "../dtos/Profile.dto";

export interface IFindProfilesService {
  execute(): Promise<ProfileDTO[]>;
}
