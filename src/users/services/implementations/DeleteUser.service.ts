import { UsersRepository } from "../../repositories/UsersRepository";
import { IDeleteUserService, TDeleteUserDTO } from "../DeleteUserService";

export class DeleteUserService implements IDeleteUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, id }: TDeleteUserDTO): Promise<Boolean> {
    if (id) {
      return await this.usersRepository.deleteById(parseInt(id));
    }

    if (email) {
      return await this.usersRepository.deleteByEmail(email);
    }
  }
}
