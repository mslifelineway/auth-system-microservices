import { Controller, Get, Param } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { Administrator } from './administrator.schema';
import { GetIDDto } from '@app/common';
import { ObjectId } from 'mongodb';

@Controller('administrators')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Get()
  async getAdministrators(): Promise<Administrator[]> {
    return await this.administratorService.getAdministrators({});
  }

  @Get('/:id')
  async getAdministrator(
    @Param('id') { id }: GetIDDto,
  ): Promise<Administrator[]> {
    return await this.administratorService.getAdministrators({
      _id: ObjectId.createFromHexString(id),
    });
  }
}
