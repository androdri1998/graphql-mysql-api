import { ProfileDTO } from "../dtos/Profile.dto";

export type IFindProfilesFilterDTO = {
  limit: number;
  page: number;
};

export interface IFindProfilesService {
  execute(filter: IFindProfilesFilterDTO): Promise<ProfileDTO[]>;
}
