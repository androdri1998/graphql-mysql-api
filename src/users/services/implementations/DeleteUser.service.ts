import { UsersRepository } from "../../repositories/UsersRepository";
import { IDeleteUserService, TDeleteUserDTO } from "../DeleteUserService";

export class DeleteUserService implements IDeleteUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, id }: TDeleteUserDTO): Promise<Boolean> {
    const identifier = id || email;
    return await this.usersRepository.deleteByIdOrEmail(identifier);
  }
}
