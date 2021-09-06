import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { CoffeeService } from "./coffee.service";
import { Coffee } from "./coffee.entity";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";

@Controller("coffee")
export class CoffeeController {
  constructor(private readonly coffeService: CoffeeService){}
  @Get(":id")
  logCoffe(@Param('id') id:number) {
   const coffee =  this.coffeService.findOne(id)
   if(!coffee){
     throw new HttpException(`Coffee id ${id} not found`,HttpStatus.NOT_FOUND)
   }
   return coffee;
  }
//   @Get()
//   imCoffee(@Res() response){
// return response.status(200).send("Hi kari")
//   }
// @Get()
// findAll(@Query() pagination){
//   const {offset,limit} =pagination
//   return `this is the offset ${offset} and the limit ${limit}`
// }
@Get()
giveAll(){
  return this.coffeService.findAll()
}
//   @Get()
//   imCoffee(){
// return "HI kari"
//   }
  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createateCoffeDto: CreateCoffeeDto){
return this.coffeService.create(createateCoffeDto)
  }
  @Delete(":id")
  remove(@Param("id") id: number){
    return this.coffeService.delete(id)
  }
}
