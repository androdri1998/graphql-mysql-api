import { UserDTO } from "../dtos/User.dto";

export const findByIdOrEmail = (identifier: string, users: UserDTO[]) => {
  const index = users.findIndex(
    (currentUser) =>
      currentUser.id === identifier || currentUser.email === identifier
  );

  return index;
};
