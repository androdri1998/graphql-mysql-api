import * as uuidHelper from "../../../app/infra/helpers/UuidHelper.helper";
import { UserDTO, UserStatus } from "../../dtos/User.dto";

export const users: UserDTO[] = [
  {
    id: uuidHelper.generate(),
    name: "teste",
    email: "some email",
    profile_id: "1",
    status: UserStatus.BLOCKED,
  },
  {
    id: uuidHelper.generate(),
    name: "teste 2",
    email: "some email 2",
    salary_real: 1002,
    profile_id: "1",
    status: UserStatus.INACTIVE,
  },
  {
    id: uuidHelper.generate(),
    name: "teste 3",
    email: "some email 3",
    profile_id: "2",
    status: UserStatus.ACTIVE,
  },
  {
    id: uuidHelper.generate(),
    name: "teste 4",
    email: "some email 4",
    profile_id: "2",
    status: UserStatus.ACTIVE,
  },
];
