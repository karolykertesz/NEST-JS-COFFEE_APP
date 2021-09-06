import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';

@Module({
  providers: [CoffeeService],
  controllers: [CoffeeController]
})
export class CoffeeModule {}
