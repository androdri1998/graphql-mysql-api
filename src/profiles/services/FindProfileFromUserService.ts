import { ProfileDTO } from "../dtos/Profile.dto";

export interface IFindProfileFromUserService {
  execute(userId: number): Promise<ProfileDTO[]>;
}
