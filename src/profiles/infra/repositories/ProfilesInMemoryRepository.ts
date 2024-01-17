import { ProfileDTO } from "../../dtos/Profile.dto";
import { ProfilesRepository } from "../../repositories/ProfilesRepository";
import {
  TUpdateProfileDTO,
  TUpdateProfileFilterDTO,
} from "../../services/UpdateProfileService";
import { getNextId } from "../database";

export default class ProfilesInMemoryRepository implements ProfilesRepository {
  databaseProvider: { [key: number]: ProfileDTO };

  constructor(databaseProvider: { [key: number]: ProfileDTO }) {
    this.databaseProvider = databaseProvider;
  }

  async getById(id: string): Promise<ProfileDTO | null> {
    const profile = this.databaseProvider[id];

    return profile || null;
  }

  async index(): Promise<ProfileDTO[]> {
    return Object.values(this.databaseProvider).map((value) => value);
  }

  async create(name: string): Promise<ProfileDTO> {
    const id = getNextId();
    const profile: ProfileDTO = {
      id: String(id),
      name,
    };

    this.databaseProvider[id] = profile;

    return profile;
  }

  async deleteById(id: string): Promise<boolean | null> {
    const profile = await this.getById(id);

    if (!profile) {
      return null;
    }

    delete this.databaseProvider[id];

    return true;
  }

  async udpateByIdOrName(
    filter: TUpdateProfileFilterDTO,
    profile: TUpdateProfileDTO
  ): Promise<ProfileDTO> {
    const { id, name } = filter;

    let currentProfile: ProfileDTO | null = null;
    let updatedProfile: ProfileDTO | null = null;
    if (id) {
      currentProfile = await this.getById(filter.id);
    } else if (name) {
      currentProfile = Object.values(this.databaseProvider).find(
        (profileItem) => profileItem.name === name
      );
    } else {
      currentProfile = null;
    }

    if (currentProfile) {
      this.databaseProvider[currentProfile.id] = {
        ...currentProfile,
        ...profile,
      };

      updatedProfile = await this.getById(currentProfile.id);
    }

    return updatedProfile || null;
  }
}
