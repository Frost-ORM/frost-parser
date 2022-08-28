import { Model } from "..";

export default {
	models: <Model[]>[
		{
			name: "Student",
			properties: [
				{ name: "name", type: "string", optional: true },
				{ name: "birthday", type: "Date", optional: true },
			],
			relations: [
				{
					name: "professor_student",
					relationType: "one_to_one",
					localField: { name: "professor" },
					foreignField: { name: "student" },
					foreignModelName: "Professor",
					localModelName: "Student",
				},
			],
		},
		{
			name: "Professor",
			properties: [
				{ name: "name", type: "string", optional: true },
				{ name: "birthday", type: "Date", optional: true },
			],
			relations: [
				{
					name: "professor_student",
					relationType: "one_to_one",
					foreignField: { name: "professor" },
					localField: { name: "student" },
					localModelName: "Professor",
					foreignModelName: "Student",
				},
			],
		},
	],
};
