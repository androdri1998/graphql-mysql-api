import {
  IDatabaseProvider,
  TInsertRow,
  TQueryRows,
} from "../../../app/providers/DatabaseProvider";
import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository as IProfilesRepository } from "../../repositories/ProfilesRepository";
import { IFindProfilesFilterDTO } from "../../services/FindProfilesService";
import {
  TUpdateProfileDTO,
  TUpdateProfileFilterDTO,
} from "../../services/UpdateProfileService";

export default class ProfilesRepository implements IProfilesRepository {
  databaseProvider: IDatabaseProvider;

  constructor(databaseProvider: IDatabaseProvider) {
    this.databaseProvider = databaseProvider;
  }

  async getById(id: number): Promise<ProfileDTO | null> {
    const profile = await this.databaseProvider.raw<TQueryRows<ProfileDTO>>(
      `
      SELECT * FROM profile WHERE id=?;
    `,
      [id]
    );

    return profile[0] || null;
  }

  async getByName(name: string): Promise<ProfileDTO | null> {
    const profile = await this.databaseProvider.raw<TQueryRows<ProfileDTO>>(
      `
      SELECT * FROM profile WHERE name=?;
    `,
      [name]
    );

    return profile[0] || null;
  }

  async index({ limit, page }: IFindProfilesFilterDTO): Promise<ProfileDTO[]> {
    const offset = limit * page;

    const profiles = await this.databaseProvider.raw<TQueryRows<ProfileDTO>>(
      `
      SELECT * FROM profile LIMIT ?, ?;
    `,
      [offset, limit]
    );

    return profiles;
  }

  async create(name: string): Promise<ProfileDTO> {
    const currentDate = new Date();

    const profile: ProfileDTO = {
      name,
      label: `${name[0].toUpperCase()}${name.slice(1)}`,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const profileCreated = await this.databaseProvider.raw<TInsertRow>(
      `
      INSERT INTO profile(name, label, createdAt, updatedAt)
      VALUES(?, ?, ?, ?);
    `,
      [profile.name, profile.label, profile.createdAt, profile.updatedAt]
    );

    profile.id = profileCreated.insertId;

    return profile;
  }

  async deleteById(id: string): Promise<boolean> {
    await this.databaseProvider.raw<TQueryRows<ProfileDTO>>(
      `
      DELETE FROM profile WHERE id=?;
    `,
      [id]
    );

    return true;
  }

  async udpateByIdOrName(
    filter: TUpdateProfileFilterDTO,
    { name }: TUpdateProfileDTO
  ): Promise<ProfileDTO> {
    const id = filter.id ? parseInt(filter.id) : undefined;
    const currentDate = new Date();

    const profile = {
      name,
      label: `${name[0].toUpperCase()}${name.slice(1)}`,
      updatedAt: currentDate,
    };

    await this.databaseProvider.raw<TInsertRow>(
      `
      UPDATE profile SET name = ?, label = ?, updatedAt = ?
      WHERE id=? OR name=?;
    `,
      [
        profile.name,
        profile.label,
        profile.updatedAt,
        id,
        filter.name?.toLowerCase(),
      ]
    );

    let profileUpdated = null;
    if (id) {
      profileUpdated = await this.getById(id);
    } else if (filter.name) {
      profileUpdated = await this.getByName(profile.name);
    }

    return profileUpdated;
  }

  async getByUserId(userId: number): Promise<ProfileDTO[]> {
    const userProfile = await this.databaseProvider.raw<TQueryRows<ProfileDTO>>(
      `
      SELECT 
        pr.id, 
        pr.name, 
        pr.label, 
        pr.createdAt, 
        pr.createdAt, 
        pr.updatedAt
      FROM user_profile up
      INNER JOIN profile pr ON pr.id = up.profileId
      WHERE userId=?;
    `,
      [userId]
    );

    return userProfile;
  }
}
