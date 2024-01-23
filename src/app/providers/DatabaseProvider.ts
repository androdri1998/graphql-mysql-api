export interface IDatabaseProvider {
  init(): Promise<void>;
  raw<ReturnType>(query: string, values: unknown[]): Promise<ReturnType>;
}

export type TInsertRow = {
  insertId: number;
};
