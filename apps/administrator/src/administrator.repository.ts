import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Administrator } from './administrator.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class AdministratorRepository extends AbstractRepository<Administrator> {
  protected readonly logger = new Logger();

  constructor(
    @InjectModel(Administrator.name) administratorModel: Model<Administrator>,
    @InjectConnection() connection: Connection,
  ) {
    super(administratorModel, connection);
  }
}
