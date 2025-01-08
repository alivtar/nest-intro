abstract class HashingProvider {
  abstract hashPassword(rawPassword: string | Buffer): Promise<string>;

  abstract compareHash(
    rawPassword: string,
    hashedPasswordInDb: string,
  ): Promise<boolean>;
}
