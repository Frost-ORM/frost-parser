import { Logger } from "../helpers/logger";
export const { validate } = require("./validate-models");
require("util").inspect.defaultOptions.depth = 10;

const sample = [
	{
		model: [
			{
				type: "model",
				name: "Student",
				properties: [
					{
						type: "property",
						name: "name",
						propertyType: {
							dataType: "string",
							isArray: false,
							optional: false,
							name: "string",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "year",
						propertyType: {
							dataType: "SchoolYear",
							isArray: false,
							optional: false,
							name: "SchoolYear",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "birthday",
						propertyType: {
							dataType: "Date",
							isArray: false,
							optional: true,
							name: "Date",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "courses",
						propertyType: {
							dataType: "Course",
							isArray: true,
							optional: false,
							name: "Course",
						},
						modifiers: [{ type: "relation", name: null }],
					},
					{
						type: "property",
						name: "club",
						propertyType: {
							dataType: "Club",
							isArray: false,
							optional: false,
							name: "Club",
						},
						modifiers: [{ type: "relation", name: null }],
					},
				],
				pragmas: [
					{
						type: "pragma",
						name: "node",
						args: [{ name: "path", value: "/testing/students" }],
					},
				],
			},
			{
				type: "model",
				name: "Professor",
				properties: [
					{
						type: "property",
						name: "name",
						propertyType: {
							dataType: "string",
							isArray: false,
							optional: false,
							name: "string",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "year",
						propertyType: {
							dataType: "SchoolYear",
							isArray: false,
							optional: false,
							name: "SchoolYear",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "birthday",
						propertyType: {
							dataType: "Date",
							isArray: false,
							optional: false,
							name: "Date",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "contactInfo",
						propertyType: {
							dataType: "ContactInfo",
							isArray: false,
							optional: false,
							name: "ContactInfo",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "courses",
						propertyType: {
							dataType: "Course",
							isArray: true,
							optional: false,
							name: "Course",
						},
						modifiers: [{ type: "relation", name: null }],
					},
					{
						type: "property",
						name: "club",
						propertyType: {
							dataType: "Club",
							isArray: false,
							optional: false,
							name: "Club",
						},
						modifiers: [{ type: "relation", name: null }],
					},
				],
				pragmas: [
					{
						type: "pragma",
						name: "node",
						args: [{ name: "path", value: "/testing/professors" }],
					},
				],
			},
			{
				type: "model",
				name: "Course",
				properties: [
					{
						type: "property",
						name: "name",
						propertyType: {
							dataType: "string",
							isArray: false,
							optional: false,
							name: "string",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "students",
						propertyType: {
							dataType: "Student",
							isArray: true,
							optional: false,
							name: "Student",
						},
						modifiers: [{ type: "relation", name: null }],
					},
					{
						type: "property",
						name: "professor",
						propertyType: {
							dataType: "Professor",
							isArray: false,
							optional: false,
							name: "Professor",
						},
						modifiers: [{ type: "relation", name: null }],
					},
				],
				pragmas: [
					{
						type: "pragma",
						name: "node",
						args: [{ name: "path", value: "/testing/courses" }],
					},
				],
			},
			{
				type: "model",
				name: "Club",
				properties: [
					{
						type: "property",
						name: "name",
						propertyType: {
							dataType: "string",
							isArray: false,
							optional: false,
							name: "string",
						},
						modifiers: undefined,
					},
					{
						type: "property",
						name: "members",
						propertyType: {
							dataType: "Student",
							isArray: true,
							optional: false,
							name: "Student",
						},
						modifiers: [{ type: "relation", name: null }],
					},
					{
						type: "property",
						name: "supervisor",
						propertyType: {
							dataType: "Professor",
							isArray: false,
							optional: false,
							name: "Professor",
						},
						modifiers: [{ type: "relation", name: null }],
					},
				],
				pragmas: [
					{
						type: "pragma",
						name: "node",
						args: [{ name: "path", value: "/testing/clubs" }],
					},
				],
			},
		],
		enum: [
			{
				type: "enum",
				name: "SchoolYear",
				values: [
					{ name: "FRESHMAN", value: "FRESHMAN" },
					{ name: "SOPHOMORE", value: "SOPHOMORE" },
					{ name: "JUNIOR", value: "JUNIOR" },
					{ name: "SENIOR", value: "SENIOR" },
				],
			},
			{
				type: "enum",
				name: "ClubType",
				values: [
					{ name: "STEM", value: "STEM" },
					{ name: "SPORTS", value: "SPORTS" },
					{ name: "CREATIVE", value: "CREATIVE" },
				],
			},
			{
				type: "enum",
				name: "DiffcultyLevel",
				values: [
					{ name: "INTRODUCTRY", value: "INTRODUCTRY" },
					{ name: "INTERMEDIATE", value: "INTERMEDIATE" },
					{ name: "UPPER_INTERMEDIATE", value: "UPPER_INTERMEDIATE" },
					{ name: "ADVANCED_PLACEMENT", value: "ADVANCED_PLACEMENT" },
				],
			},
		],
		type: [
			{
				type: "type",
				name: "ContactInfo",
				values: [
					{
						name: "phone",
						value: { dataType: "string", isArray: false, optional: false },
					},
					{
						name: "email",
						value: { dataType: "string", isArray: false, optional: false },
					},
				],
			},
		],
	},
];

try {
	let output = validate(sample[0]);
	console.log(output);
} catch (error) {
	Logger.exitWithError("Error(s):", error.message);
}
