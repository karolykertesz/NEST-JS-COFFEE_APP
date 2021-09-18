import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
@Injectable()
export class CoffeeService {
  constructor(@InjectRepository(Coffee) private coffes: Repository<Coffee>){}
   findAll(){
return this.coffes.find({
  relations: ["flavours"]
})
  }
  async findOne(id:string){
const coffee = await this.coffes.findOne({id: +id},{relations: ["flavours"]})
if(!coffee){
  return new NotFoundException(`with the ${id} no coffee found`)
}
return coffee
  }
  create(CreateCoffeeDto: any){
    const coffee = this.coffes.create(CreateCoffeeDto)
    return this.coffes.save(coffee)
  }
  async delete(id:number){
    const coffee = await this.coffes.findOne(id)
    return this.coffes.remove(coffee)

}

  async update(id: string,UpdateCoffeeDto:UpdateCoffeeDto){
const coffee = await this.coffes.preload({
  id: +id,
  ...UpdateCoffeeDto
})
if(!coffee){
  throw new NotFoundException(`No coffee on id ${id}`)
}
return this.coffes.save(coffee)
  }
}
