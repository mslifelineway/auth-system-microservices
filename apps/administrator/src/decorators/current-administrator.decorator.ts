import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Administrator } from '../administrator.schema';

export const getCurrentAdministratorByContext = (
  context: ExecutionContext,
): Administrator => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentAdministrator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentAdministratorByContext(context),
);
