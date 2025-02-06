import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID, MinLength, validateOrReject } from 'class-validator';
import { ApiProperty } from 'openapi-metadata/decorators';

export class Todo {
  @ApiProperty({ type: String, example: 'c1b198eb-9a12-4981-8906-300a68693f00', required: false })
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @ApiProperty({ type: String, example: 'Complete a todo task', required: true })
  @MinLength(1)
  @IsString()
  readonly message!: string;

  @ApiProperty({ type: Boolean, example: false, required: true })
  @IsBoolean()
  readonly done!: boolean;

  constructor(todo?: Partial<Todo>) {
    Object.assign(this, todo);
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
