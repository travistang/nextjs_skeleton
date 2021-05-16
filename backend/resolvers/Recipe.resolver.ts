import { Arg, Query, Resolver } from "type-graphql";
import RecipeModel, { Recipe } from "../types/Recipe";

@Resolver(of => Recipe)
export default class RecipeResolver {

    @Query(returns => [Recipe])
    async recipes() {
        return RecipeModel.find({}).lean()
    }

    @Query(returns => Recipe)
    async recipe(@Arg('id') id: string) {
        return RecipeModel.find({ id }).lean()
    }
}