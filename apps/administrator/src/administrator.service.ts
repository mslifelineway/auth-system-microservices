import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Administrator } from './administrator.schema';
import { AdministratorRepository } from './administrator.repository';
import { CreateAdministratorDto } from './dtos/create-administrator.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdministratorService {
  constructor(
    private readonly administratorRepository: AdministratorRepository,
  ) {}

  async getAdministrators(
    getAdministratorsArgs: Partial<Administrator>,
  ): Promise<Administrator[]> {
    return this.administratorRepository.find(getAdministratorsArgs);
  }

  async getAdministrator(
    getAdministratorArgs: Partial<Administrator>,
  ): Promise<Administrator> {
    return this.administratorRepository.findOne(getAdministratorArgs);
  }

  async createAdministrator(
    request: CreateAdministratorDto,
  ): Promise<Administrator> {
    await this.validateCreateAdministratorRequest(request);
    const administrator = await this.administratorRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return administrator;
  }

  private async validateCreateAdministratorRequest(
    request: CreateAdministratorDto,
  ) {
    let administrator: Administrator;
    try {
      administrator = await this.administratorRepository.findOne({
        email: request.email,
      });
    } catch (error) {}
    if (administrator) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateAdministrator(email: string, password: string) {
    const user = await this.administratorRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }
}
