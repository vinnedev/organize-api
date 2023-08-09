import { config } from 'dotenv';
config()

class envConfig {
  public API_PORT: number
  public ENV_MODE: string
  public DATABASE_URL: string
  public API_SECRET_KEY: string

  constructor() {
    this.API_PORT = Number(process.env.API_PORT!)
    this.ENV_MODE = process.env.ENV_MODE!
    this.DATABASE_URL = process.env.DATABASE_URL!
    this.API_SECRET_KEY = process.env.API_SECRET_KEY!;
  }

}

export default new envConfig();