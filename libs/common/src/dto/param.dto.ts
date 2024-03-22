import { IsMongoId, IsString } from "class-validator";

export class ValidateParamIDDto {
  @IsString()
  @IsMongoId({ message: 'Invalid ID' })
  id: string;
}