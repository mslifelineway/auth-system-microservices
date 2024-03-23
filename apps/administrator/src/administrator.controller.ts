import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { Administrator } from './administrator.schema';
import mongoose from 'mongoose';
import { ValidateParamIDDto, JwtAuthGuard } from '@app/common';

@Controller('administrators')
export class AdministratorController {
  private readonly logger = new Logger();
  constructor(private readonly administratorService: AdministratorService) {}

  @Get()
  async getAdministrators(): Promise<Administrator[]> {
    return await this.administratorService.getAdministrators({});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAdministrator(
    @Param() { id }: ValidateParamIDDto,
  ): Promise<Administrator[]> {
    return await this.administratorService.getAdministrators({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}
