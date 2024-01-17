import { ProfileDTO } from "../dtos/Profile.dto";

export type TCreateProfileDTO = {
  name: string;
};

export interface ICreateProfileService {
  execute(data: TCreateProfileDTO): Promise<ProfileDTO>;
}
