export type UserProfileDTO = {
  userId: number;
  profileId: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export interface IUserProfilesRepository {
  getByUserId(userId: number): Promise<UserProfileDTO | null>;
  create(userId: number, profileId: number): Promise<UserProfileDTO>;
  deleteByUserId(userId: number): Promise<Boolean | null>;
  updateByUserId(userId: number, profileId: number): Promise<UserProfileDTO>;
}
