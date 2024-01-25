import * as UUIDHelper from "../../../app/infra/helpers/UuidHelper.helper";
import {
  IDatabaseProvider,
  TInsertRow,
  TQueryRows,
} from "../../../app/providers/DatabaseProvider";
import {
  IUserProfilesRepository,
  UserProfileDTO,
} from "../../repositories/UserProfileRepository";

export default class UserProfilesRepository implements IUserProfilesRepository {
  databaseProvider: IDatabaseProvider;

  constructor(databaseProvider: IDatabaseProvider) {
    this.databaseProvider = databaseProvider;
  }

  async getByUserId(userId: number): Promise<UserProfileDTO> {
    const userProfile = await this.databaseProvider.raw<
      TQueryRows<UserProfileDTO>
    >(
      `
      SELECT * FROM user_profile WHERE userId=?;
    `,
      [userId]
    );

    return userProfile[0] || null;
  }

  async create(userId: number, profileId: number): Promise<UserProfileDTO> {
    const uuid = UUIDHelper.generate();
    const currentDate = new Date();

    const userProfile: UserProfileDTO = {
      id: uuid,
      updatedAt: currentDate,
      createdAt: currentDate,
      userId,
      profileId,
    };

    await this.databaseProvider.raw<TInsertRow>(
      `
      INSERT INTO user_profile(id, userId, profileId, createdAt, updatedAt)
      VALUES(?, ?, ?, ?, ?);
    `,
      [
        userProfile.id,
        userProfile.userId,
        userProfile.profileId,
        userProfile.createdAt,
        userProfile.updatedAt,
      ]
    );

    return userProfile;
  }

  async deleteByUserId(userId: number): Promise<Boolean> {
    await this.databaseProvider.raw<TQueryRows<UserProfileDTO>>(
      `
      DELETE FROM user_profile WHERE userId=?;
    `,
      [userId]
    );

    return true;
  }

  async updateByUserId(
    userId: number,
    profileId: number
  ): Promise<UserProfileDTO> {
    const currentDate = new Date();

    await this.databaseProvider.raw<TInsertRow>(
      `
      UPDATE user_profile SET profileId = ?, updatedAt = ?
      WHERE userId=?;
    `,
      [profileId, currentDate, userId]
    );

    const userProfile = await this.getByUserId(userId);

    return userProfile;
  }
}
