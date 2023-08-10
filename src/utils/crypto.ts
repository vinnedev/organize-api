import crypto from 'crypto';

export function createMD5(input: string): string {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest('hex').toUpperCase();
}

export function compareMD5(input: string, hash: string): boolean {
  const inputHash = createMD5(input);
  return inputHash.toUpperCase() === hash.toUpperCase();
}





