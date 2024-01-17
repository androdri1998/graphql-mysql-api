export type TDeleteUserDTO = {
  email: string;
  id: string;
};

export interface IDeleteUserService {
  execute(data: TDeleteUserDTO): Promise<Boolean>;
}
