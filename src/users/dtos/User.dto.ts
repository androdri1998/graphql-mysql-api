export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
