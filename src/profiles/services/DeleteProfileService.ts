export type TDeleteProfileDTO = {
  id: string;
};

export interface IDeleteProfileService {
  execute(data: TDeleteProfileDTO): Promise<boolean | null>;
}
