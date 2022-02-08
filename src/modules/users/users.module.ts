import { Module } from '@nestjs/common';
import { CreateUserController } from './contexts/createUser/createUser.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
