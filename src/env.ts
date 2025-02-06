import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IsEnum, validateOrReject } from 'class-validator';
import process from 'node:process';

export enum EnvironmentMode {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export class Environment {
  @IsEnum(EnvironmentMode)
  readonly NODE_ENV: EnvironmentMode = EnvironmentMode.PRODUCTION;

  constructor(todo?: Partial<Environment>) {
    Object.assign(this, todo);
  }

  get __DEV__() {
    return this.NODE_ENV === EnvironmentMode.DEVELOPMENT;
  }

  static from(source: unknown) {
    return plainToInstance(this, source);
  }

  get serialized() {
    return instanceToPlain(this);
  }

  async validate() {
    return validateOrReject(this);
  }
}

export const env = Environment.from(process.env);
await env.validate();
