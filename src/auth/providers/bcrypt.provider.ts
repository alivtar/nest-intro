import bcrypt from 'bcrypt';

export class BcryptProvider implements HashingProvider {
  async hashPassword(rawPassword: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(rawPassword, salt);
  }

  async compareHash(
    rawPassword: string | Buffer,
    hashedPasswordInDb: string,
  ): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPasswordInDb);
  }
}
