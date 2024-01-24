import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Profile } from "../dtos/models/Profile.model";
import { SearchProfileInput } from "../dtos/inputs/SearchProfile.input";

import ProfilesRepository from "../repositories/ProfilesRepository";
import FindProfilesService from "../../services/implementations/FindProfiles.service";
import FindProfileService from "../../services/implementations/FindProfile.service";
import { CreateProfileInput } from "../dtos/inputs/CreateProfile.input";
import { CreateProfileService } from "../../services/implementations/CreateProfile.service";
import { DeleteProfileInput } from "../dtos/inputs/DeleteProfile.input";
import { DeleteProfileService } from "../../services/implementations/DeleteProfile.service";
import { UpdateProfileFilterInput } from "../dtos/inputs/UpdateProfileFilter.input";
import { UpdateProfileInput } from "../dtos/inputs/UpdateProfile.input";
import { UdpateProfileService } from "../../services/implementations/UpdateProfile.service";
import { databaseProvider } from "../../../app/infra/providers/DatabaseProvider";

@Resolver(() => Profile)
export class ProfilesResolver {
  @Query(() => Profile, { nullable: true })
  async profile(@Arg("data") profile: SearchProfileInput) {
    const profilesRepository = new ProfilesRepository(databaseProvider);
    const findProfileService = new FindProfileService(profilesRepository);

    const profileFound = await findProfileService.execute(parseInt(profile.id));

    return profileFound;
  }

  @Query(() => [Profile], { nullable: "items" })
  async profiles() {
    const profilesRepository = new ProfilesRepository(databaseProvider);
    // const findProfilesService = new FindProfilesService(profilesRepository);
    // const profiles = await findProfilesService.execute();
    // return profiles;
  }

  @Mutation(() => Profile)
  async createProfile(@Arg("profile") profile: CreateProfileInput) {
    const profilesRepository = new ProfilesRepository(databaseProvider);
    const createProfileService = new CreateProfileService(profilesRepository);

    const newProfile = await createProfileService.execute(profile);

    return newProfile;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteProfile(@Arg("filter") filter: DeleteProfileInput) {
    const profilesRepository = new ProfilesRepository(databaseProvider);
    // const deleteProfileService = new DeleteProfileService(profilesRepository);
    // const isDeleted = await deleteProfileService.execute(filter);
    // return isDeleted;
  }

  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Arg("filter") filter: UpdateProfileFilterInput,
    @Arg("profile") profile: UpdateProfileInput
  ) {
    const profilesRepository = new ProfilesRepository(databaseProvider);
    // const updateProfileService = new UdpateProfileService(profilesRepository);
    // const profileUpdated = await updateProfileService.execute(filter, profile);
    // return profileUpdated;
  }
}
