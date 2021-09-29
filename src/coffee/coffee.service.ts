import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDTO } from "src/common/dto/paginationDTO";
import { COFFEE_BRANDS } from "src/contansts/coffee.contant.ts";
import { Connection, Repository } from "typeorm";
import { Coffee } from "./coffee.entity";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Flavour } from "./flavour.entity";
@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee) private coffes: Repository<Coffee>,
    @InjectRepository(Flavour) private flavors: Repository<Flavour>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) brands: string[],
    private readonly configService:ConfigService

  ) {
const dbHost = this.configService.get<string>('DATABASE_PASSWORD')
console.log(dbHost)
  }
  findAll(paginationQury: PaginationDTO) {
    const { limit, offset } = paginationQury;
    return this.coffes.find({
      relations: ["flavours"],
      skip: offset,
      take: limit
    });
  }
  async findOne(id: string) {
    const coffee = await this.coffes.findOne(
      { id: +id },
      { relations: ["flavours"] }
    );
    if (!coffee) {
      return new NotFoundException(`with the ${id} no coffee found`);
    }
    return coffee;
  }
  async create(CreateCoffeeDto: any) {
    const flavours = await Promise.all(
      CreateCoffeeDto.flavours.map((flav: string) =>
        this.loadFlavorByName(flav)
      )
    );
    const coffee = this.coffes.create({ ...CreateCoffeeDto, flavours });
    return this.coffes.save(coffee);
  }
  async delete(id: number) {
    const coffee = await this.coffes.findOne(id);
    return this.coffes.remove(coffee);
  }

  async update(id: string, UpdateCoffeeDto: UpdateCoffeeDto) {
    const flavours =
      UpdateCoffeeDto.flavours &&
      (await Promise.all(
        UpdateCoffeeDto.flavours.map((flav) => this.loadFlavorByName(flav))
      ));
    const coffee = await this.coffes.preload({
      id: +id,
      ...UpdateCoffeeDto,
      flavours
    });
    if (!coffee) {
      throw new NotFoundException(`No coffee on id ${id}`);
    }
    return this.coffes.save(coffee);
  }
  private async loadFlavorByName(name: string): Promise<Flavour> {
    const realname = await this.flavors.findOne({ name });
    if (realname) {
      return realname;
    }
    return this.flavors.create({ name });
  }
  async recomendCoffe(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  }
}
