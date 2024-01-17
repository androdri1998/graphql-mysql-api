export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  age?: number;
  salary_real?: number;
  vip?: boolean;
  status?: UserStatus;
  profile_id?: string;
}
