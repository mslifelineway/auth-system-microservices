import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Administrator } from '../administrator.schema';

export const getCurrentAdministratorByContext = (
  context: ExecutionContext,
): Administrator => {
  const logger = new Logger();
  if (context.getType() === 'http') {
    logger.warn("++++++++++++++++++ getCurrentAdministratorByContext http +++++++", context.switchToHttp().getRequest().user)
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
  logger.warn("++++++++++++++++++ getCurrentAdministratorByContext rpc +++++++", context.switchToRpc().getData().user)
    return context.switchToRpc().getData().user;
  }
};

export const CurrentAdministrator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentAdministratorByContext(context),
);
