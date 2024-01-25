import bcrypt from "bcrypt";

import { IHashProvider } from "../../providers/HashProvider";

export class HashProvider implements IHashProvider {
  async generate(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 10);

    return hash;
  }
}
