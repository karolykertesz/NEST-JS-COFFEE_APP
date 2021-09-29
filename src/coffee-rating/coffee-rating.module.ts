import { Module } from '@nestjs/common';
import { CoffeeModule } from 'src/coffee/coffee.module';
import { CoffeeService } from 'src/coffee/coffee.service';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeeModule, DatabaseModule.register({
    port: 5432,
    host: "localhost",
    type: "postgres"
  })],
  providers: [CoffeeRatingService],

})
export class CoffeeRatingModule {}
