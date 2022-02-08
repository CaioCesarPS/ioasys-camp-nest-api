import * as bcrypt from 'bcryptjs';

export class BcryptProvider {
  createHash(text: string): string {
    return bcrypt.hashSync(text);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
