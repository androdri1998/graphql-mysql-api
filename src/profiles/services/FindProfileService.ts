import { ProfileDTO } from "../dtos/Profile.dto";

export type IFindProfileDTO = {
  id: string;
  name: string;
};

export interface IFindProfileService {
  execute(filter: IFindProfileDTO): Promise<ProfileDTO>;
}
