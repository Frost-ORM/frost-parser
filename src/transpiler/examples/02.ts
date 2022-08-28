import { ValidatorOutput } from "../../validator/validate-models";

export default <ValidatorOutput>{
	models: [
		{
			path: "/testing/students",
			name: "Student",
			properties: [
				{
					name: "name",
					type: "string",
					isArray: false,
					optional: true,
				},
				{
					name: "year",
					type: "SchoolYear",
					isArray: false,
					optional: true,
				},
				{
					name: "birthday",
					type: "Date",
					isArray: false,
					optional: true,
				},
				{
					name: "courses",
					type: "Course",
					isArray: true,
					optional: true,
				},
				{ name: "club", type: "Club", isArray: false, optional: true },
			],
			relations: [
				{
					name: "student-course",
					foreignModelName: "Course",
					localField: { name: "courses", isArray: true },
					localModelName: "Student",
					foreignField: { name: "students", isArray: true },
					relationType: "many_to_many",
				},
				{
					name: "student-club",
					foreignModelName: "Club",
					localField: { name: "club", isArray: false },
					localModelName: "Student",
					foreignField: { name: "members", isArray: true },
					relationType: "one_to_many",
				},
			],
		},
		{
			path: "/testing/professors",
			name: "Professor",
			properties: [
				{
					name: "name",
					type: "string",
					isArray: false,
					optional: true,
				},
				{
					name: "year",
					type: "SchoolYear",
					isArray: false,
					optional: true,
				},
				{
					name: "birthday",
					type: "Date",
					isArray: false,
					optional: true,
				},
				{
					name: "contactInfo",
					type: "ContactInfo",
					isArray: false,
					optional: true,
				},
				{
					name: "courses",
					type: "Course",
					isArray: true,
					optional: true,
				},
				{ name: "club", type: "Club", isArray: false, optional: true },
			],
			relations: [
				{
					name: "professor-course",
					foreignModelName: "Course",
					localField: { name: "courses", isArray: true },
					localModelName: "Professor",
					foreignField: { name: "professor", isArray: false },
					relationType: "one_to_many",
				},
				{
					name: "professor-club",
					foreignModelName: "Club",
					localField: { name: "club", isArray: false },
					localModelName: "Professor",
					foreignField: { name: "supervisor", isArray: false },
					relationType: "one_to_one",
				},
			],
		},
		{
			path: "/testing/courses",
			name: "Course",
			properties: [
				{
					name: "name",
					type: "string",
					isArray: false,
					optional: true,
				},
				{
					name: "students",
					type: "Student",
					isArray: true,
					optional: true,
				},
				{
					name: "professor",
					type: "Professor",
					isArray: false,
					optional: true,
				},
			],
			relations: [
				{
					name: "student-course",
					foreignModelName: "Student",
					localField: { name: "students", isArray: true },
					localModelName: "Course",
					foreignField: { name: "courses", isArray: true },
					relationType: "many_to_many",
				},
				{
					name: "professor-course",
					foreignModelName: "Professor",
					localField: { name: "professor", isArray: false },
					localModelName: "Course",
					foreignField: { name: "courses", isArray: true },
					relationType: "one_to_many",
				},
			],
		},
		{
			path: "/testing/clubs",
			name: "Club",
			properties: [
				{
					name: "name",
					type: "string",
					isArray: false,
					optional: true,
				},
				{
					name: "members",
					type: "Student",
					isArray: true,
					optional: true,
				},
				{
					name: "supervisor",
					type: "Professor",
					isArray: false,
					optional: true,
				},
			],
			relations: [
				{
					name: "student-club",
					foreignModelName: "Student",
					localField: { name: "members", isArray: true },
					localModelName: "Club",
					foreignField: { name: "club", isArray: false },
					relationType: "one_to_many",
				},
				{
					name: "professor-club",
					foreignModelName: "Professor",
					localField: { name: "supervisor", isArray: false },
					localModelName: "Club",
					foreignField: { name: "club", isArray: false },
					relationType: "one_to_one",
				},
			],
		},
	],
	relations: {
		"student-course": {
			name: "student-course",
			foreignModelName: "Course",
			localField: { name: "courses", isArray: true },
			localModelName: "Student",
			defined: true,
			foreignField: { name: "students", isArray: true },
			relationType: "many_to_many",
		},
		"student-club": {
			name: "student-club",
			foreignModelName: "Club",
			localField: { name: "club", isArray: false },
			localModelName: "Student",
			defined: true,
			foreignField: { name: "members", isArray: true },
			relationType: "one_to_many",
		},
		"professor-course": {
			name: "professor-course",
			foreignModelName: "Course",
			localField: { name: "courses", isArray: true },
			localModelName: "Professor",
			defined: true,
			foreignField: { name: "professor", isArray: false },
			relationType: "one_to_many",
		},
		"professor-club": {
			name: "professor-club",
			foreignModelName: "Club",
			localField: { name: "club", isArray: false },
			localModelName: "Professor",
			defined: true,
			foreignField: { name: "supervisor", isArray: false },
			relationType: "one_to_one",
		},
	},
	enums: [
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
			name: "DifficultyLevel",
			values: [
				{ name: "INTRODUCTORY", value: "INTRODUCTORY" },
				{ name: "INTERMEDIATE", value: "INTERMEDIATE" },
				{ name: "UPPER_INTERMEDIATE", value: "UPPER_INTERMEDIATE" },
				{ name: "ADVANCED_PLACEMENT", value: "ADVANCED_PLACEMENT" },
			],
		},
		{
			type: "enum",
			name: "Test",
			values: [
				{ name: "a", value: "A" },
				{ name: "b", value: 2 },
				{ name: "c", value: null },
				{ name: "d", value: "c" },
			],
		},
	],
	types: [
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
};
