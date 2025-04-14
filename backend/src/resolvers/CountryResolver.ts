import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Country } from "../entities/country";
import { Continent } from "../entities/continent";

@InputType()
class CountryInput {
  @Field()
  name!: string;

  @Field()
  code!: string;

  @Field()
  emoji!: string;

  @Field(() => String)
  continent_id!: string;
}

@Resolver(Country)
class CountryResolver {
  @Query(() => [Country])
  async getCountries() {
    const countries = await Country.find({
      relations: { continent: true },
    });
    return countries;
  }

  @Query(() => Country)
  async getCountryWithId(@Arg("id") id: string) {
    const country = await Country.findOneOrFail({
      where: { id },
      relations: { continent: true },
    });
    return country;
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code") code: string) {
    const country = await Country.findOneOrFail({
      where: { code },
      relations: { continent: true },
    });
    return country;
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data") data: CountryInput) {
    const continent = await Continent.findOneBy({
      id: data.continent_id,
    });
    if (!continent) throw new Error("Continent not found");

    const country = new Country();
    Object.assign(country, { ...data, continent });
    await country.save();
    return country;
  }
}

export default CountryResolver;
