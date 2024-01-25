export interface IHashProvider {
  generate(value: string): Promise<string>;
}
