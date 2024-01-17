import { ProfileDTO } from "../dtos/Profile.dto";

export interface IFindProfileService {
  execute(id: string): Promise<ProfileDTO>;
}
