import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Continent } from "../entities/continent";

@InputType()
class ContinentInput {
  @Field()
  name!: string;
}

@Resolver(Continent)
class ContinentResolver {
  @Query(() => [Continent])
  async getContinents() {
    const continents = await Continent.find({
      relations: { countries: true },
    });
    return continents;
  }

  @Query(() => Continent)
  async getContinentWithId(@Arg("id") id: string) {
    const continent = await Continent.findOneOrFail({
      where: { id },
      relations: { countries: true },
    });
    return continent;
  }

  @Mutation(() => Continent)
  async createContinent(@Arg("data") data?: ContinentInput) {
    let continent = new Continent();
    continent = Object.assign(continent, data);
    await continent.save();
    return continent;
  }
}

export default ContinentResolver;
