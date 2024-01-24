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
    profile: TUpdateProfileDTO
  ): Promise<ProfileDTO> {
    // const { id, name } = filter;
    // let currentProfile: ProfileDTO | null = null;
    // let updatedProfile: ProfileDTO | null = null;
    // if (id) {
    //   currentProfile = await this.getById(filter.id);
    // } else if (name) {
    //   currentProfile = Object.values(this.databaseProvider).find(
    //     (profileItem) => profileItem.name === name
    //   );
    // } else {
    //   currentProfile = null;
    // }
    // if (currentProfile) {
    //   this.databaseProvider[currentProfile.id] = {
    //     ...currentProfile,
    //     ...profile,
    //   };
    //   updatedProfile = await this.getById(currentProfile.id);
    // }
    // return updatedProfile || null;

    return null;
  }
}
