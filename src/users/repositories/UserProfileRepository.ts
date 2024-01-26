import { ProfileDTO } from "../../profiles/dtos/Profile.dto";

export type UserProfileDTO = {
  userId: number;
  profileId: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export interface IUserProfilesRepository {
  create(userId: number, profileId: number): Promise<UserProfileDTO>;
  deleteByUserId(userId: number): Promise<Boolean | null>;
}
