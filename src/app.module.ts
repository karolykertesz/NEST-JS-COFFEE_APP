import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from "@nestjs/config";
@Module({
  
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
  }),CoffeeModule,TypeOrmModule.forRoot({
    type: "postgres",
    synchronize:true,
    autoLoadEntities:true,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_USER
  }), CoffeeRatingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
