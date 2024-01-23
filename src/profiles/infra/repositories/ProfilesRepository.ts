import {
  IDatabaseProvider,
  TInsertRow,
} from "../../../app/providers/DatabaseProvider";
import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository as IProfilesRepository } from "../../repositories/ProfilesRepository";
import {
  TUpdateProfileDTO,
  TUpdateProfileFilterDTO,
} from "../../services/UpdateProfileService";

export default class ProfilesRepository implements IProfilesRepository {
  databaseProvider: IDatabaseProvider;

  constructor(databaseProvider: IDatabaseProvider) {
    this.databaseProvider = databaseProvider;
  }

  async getById(id: string): Promise<ProfileDTO | null> {
    // const profile = this.databaseProvider[id];
    // return profile || null;

    return null;
  }

  async index(): Promise<ProfileDTO[]> {
    // return Object.values(this.databaseProvider).map((value) => value);

    return [];
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

  async deleteById(id: string): Promise<boolean | null> {
    // const profile = await this.getById(id);
    // if (!profile) {
    //   return null;
    // }
    // delete this.databaseProvider[id];
    // return true;

    return null;
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
