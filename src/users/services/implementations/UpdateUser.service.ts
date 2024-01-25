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
    { email, id }: TUpdateUserFilterDTO,
    user: TUpdateUserDTO
  ): Promise<UserDTO> {
    if (id) {
      return await this.usersRepository.updateById(parseInt(id), user);
    }

    if (email) {
      return await this.usersRepository.updateByEmail(email, user);
    }
  }
}
