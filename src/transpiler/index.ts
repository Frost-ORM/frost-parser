import { EnumDef } from "../validator/validate-enums";
import { ValidatorOutput } from "../validator/validate-models";
import { TypeDef } from "../validator/validate-types";
import { generateEnums } from "./generate-enum";
import { generateDelegates } from "./generate-instanciation";
import { generateModelsTypes, Model, Relation } from "./generate-models";
import { generateTypes } from "./generate-type";
export { Model, Property, Relation, RelationType, RelationTypesNames } from "./generate-models";

export type TranspilerInput = ValidatorOutput;
export type Enum = EnumDef;
export type Type = TypeDef;

export const globalTypes = `
type FrostDelegate<T> = T[]

export type OneToManyMetadata = Record<string, boolean | null | undefined>;

export type ManyToManyMetadata = Record<string, { connected?: boolean | null; lastChange: string } | null | undefined>;
export type IncludeOptions<T extends PropertyKey = PropertyKey> = Partial<Record<T, boolean>>;
export type With<T, R extends Record<PropertyKey, any>, I extends IncludeOptions> = T & Pick<R, keyof I>;

type RelationType = "one_to_one" | "one_to_many" | "many_to_many";

type RelationTypeWithSubTypes =
	| "one_to_one"
	| "one_to_many"
	| "many_to_many"
	| "one_to_many_master_fields"
	| "one_to_many_slave_fields";

export type ConnectOptions<T extends Partial<Record<RelationType, any>>> = Partial<
	Record<T["one_to_one"], string> &
    Record<T["one_to_many" | "many_to_many"], string[]>
>;
export type DisconnectOptions<T extends Partial<Record<RelationTypeWithSubTypes, any>>> = Partial<
    Record<T["one_to_one"], string | true> &
    Record<T["one_to_many_master_fields"], string | true> &
    Record<T["one_to_many_slave_fields"], string[] | true | "all"> &
    Record<T["many_to_many"], string[] | true | "all">
>;


type FrostObject = {
    id?:string
}
`;

const GLOBAL_IMPORTS = `
import {FrostDelegate} from "@frost-orm/frost-web-client"
import {
	OneToManyMetadata,
	ManyToManyMetadata,
	IncludeOptions,
	With,
	RelationType,
	RelationTypeWithSubTypes,
	ConnectOptions,
	DisconnectOptions,
	FrostObject,
} from "@frost-orm/frost-web-client/global-types"

`
const LOCAL_IMPORTS = `
import {FrostDelegate} from "../"
import {
	OneToManyMetadata,
	ManyToManyMetadata,
	IncludeOptions,
	With,
	RelationType,
	RelationTypeWithSubTypes,
	ConnectOptions,
	DisconnectOptions,
	FrostObject,
} from "../global-types"

`
export function generate({
	models,
	types,
	enums,
	relations
}: {
	models: Model[];
	types: TypeDef[];
	enums: EnumDef[];
	relations:Record<string,Relation>;
},globalImports:boolean = true) {
	return (globalImports? GLOBAL_IMPORTS: LOCAL_IMPORTS) + generateEnums(enums) + generateTypes(types) + generateModelsTypes(models) + generateDelegates(models,relations);
}
