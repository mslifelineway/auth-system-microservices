import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Administrator extends AbstractDocument {
  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, trim: true })
  phoneNumber: string;

  @Prop({ required: false, default: '' })
  image: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
