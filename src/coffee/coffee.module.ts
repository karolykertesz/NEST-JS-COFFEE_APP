import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { Coffee } from './coffee.entity';
import { CoffeeService } from './coffee.service';
import { Flavour } from './flavour.entity';

@Module({
  providers: [CoffeeService],
  controllers: [CoffeeController],
  imports:[TypeOrmModule.forFeature([Coffee,Flavour])]
})
export class CoffeeModule {}
