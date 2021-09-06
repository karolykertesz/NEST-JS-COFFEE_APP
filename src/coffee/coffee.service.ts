import { Injectable } from '@nestjs/common';
import { Coffee } from './coffee.entity';
@Injectable()
export class CoffeeService {
  private coffes: Coffee[] = [{
    id:1,
    location: "Brazil",
    flavours:["vanilla,chocko"],
    name: "Starbucks"
  
  }]
  findAll(){
    return this.coffes;
  }
  findOne(id:number){
    const returnedCoffe = this.coffes.find((cof)=> cof.id === id);
    return returnedCoffe;

  }
  create(coffeItem){
    this.coffes.push(coffeItem)
    return coffeItem;
  }
  delete(id:number){
const indexedItem = this.coffes.findIndex((item)=> item.id === id);
if(indexedItem >= 0){
this.coffes.splice(indexedItem,1)
}
  }
  update(id,itemObject){


  }
}
