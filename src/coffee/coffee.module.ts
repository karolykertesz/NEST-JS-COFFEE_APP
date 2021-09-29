import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { create } from "domain";
import { Event } from "src/events/entities/event.entity";
import { CoffeeController } from "./coffee.controller";
import { Coffee } from "./coffee.entity";
import { CoffeeService } from "./coffee.service";
import { Flavour } from "./flavour.entity";
import { COFFEE_BRANDS } from "src/contansts/coffee.contant.ts";
import { ConfigModule } from "@nestjs/config";


@Injectable()
export class CoffeCreate{
create(){
  return ["Lavazza,Illy,Segafredo"]
}
}





@Module({
  providers: [CoffeeService,CoffeCreate,{provide: COFFEE_BRANDS,useFactory: (brands:CoffeCreate)=> {
    return brands.create()
  },inject: [CoffeCreate]}],
  controllers: [CoffeeController],
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event]),ConfigModule],
  exports: [CoffeeService]
})
export class CoffeeModule {}
