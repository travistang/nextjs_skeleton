import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, Prop } from "@typegoose/typegoose";

@ObjectType()
export class Recipe {
    @Field(type => ID)
    @Prop({ _id: true })
    id: string;

    @Field()
    @Prop()
    title: string;
}

export default getModelForClass(Recipe);