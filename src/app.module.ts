import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeeController } from "./coffee/coffee.controller";
import { CoffeeService } from './coffee/coffee.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [CoffeeModule,TypeOrmModule.forRoot({
    type: "postgres",
    synchronize:true,
    autoLoadEntities:true,
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass123",
    database: "postgres"
  }), CoffeeRatingModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
