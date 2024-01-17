import { UserDTO } from "../../dtos/User.dto";
import { UsersRepository } from "../../repositories/UsersRepository";
import {
  IUpdateUserService,
  TUpdateUserDTO,
  TUpdateUserFilterDTO,
} from "../UpdateUserService";

export class UpdateUserService implements IUpdateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    filter: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO> {
    return await this.usersRepository.updateById(filter, user);
  }
}
