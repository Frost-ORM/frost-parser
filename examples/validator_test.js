"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDelegatesMap = exports.ClubDelegate = exports.CourseDelegate = exports.ProfessorDelegate = exports.StudentDelegate = exports.SampleDelegate = exports.FrostModels = exports.DifficultyLevel = exports.ClubType = exports.SchoolYear = void 0;
var frost_web_client_1 = require("@frost-orm/frost-web-client");
var SchoolYear;
(function (SchoolYear) {
    SchoolYear["FRESHMAN"] = "FRESHMAN";
    SchoolYear["SOPHOMORE"] = "SOPHOMORE";
    SchoolYear["JUNIOR"] = "JUNIOR";
    SchoolYear["SENIOR"] = "SENIOR";
})(SchoolYear = exports.SchoolYear || (exports.SchoolYear = {}));
var ClubType;
(function (ClubType) {
    ClubType["STEM"] = "STEM";
    ClubType["SPORTS"] = "SPORTS";
    ClubType["CREATIVE"] = "CREATIVE";
})(ClubType = exports.ClubType || (exports.ClubType = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["INTRODUCTORY"] = "INTRODUCTORY";
    DifficultyLevel["INTERMEDIATE"] = "INTERMEDIATE";
    DifficultyLevel["UPPER_INTERMEDIATE"] = "UPPER_INTERMEDIATE";
    DifficultyLevel["ADVANCED_PLACEMENT"] = "ADVANCED_PLACEMENT";
})(DifficultyLevel = exports.DifficultyLevel || (exports.DifficultyLevel = {}));
//export type ClubDelegate = FrostDelegate<ClubTypes>
exports.FrostModels = {
    "Sample": {
        "path": "/testing/samples",
        "name": "Sample",
        "properties": [
            {
                "name": "name",
                "type": "string",
                "isArray": false,
                "optional": true
            },
            {
                "name": "year",
                "type": "SchoolYear",
                "isArray": false,
                "optional": true
            },
            {
                "name": "birthday",
                "type": "Date",
                "isArray": false,
                "optional": true
            }
        ],
        "relations": [],
        "relationsNames": []
    },
    "Student": {
        "path": "/testing/students",
        "name": "Student",
        "properties": [
            {
                "name": "name",
                "type": "string",
                "isArray": false,
                "optional": true
            },
            {
                "name": "year",
                "type": "SchoolYear",
                "isArray": false,
                "optional": true
            },
            {
                "name": "birthday",
                "type": "Date",
                "isArray": false,
                "optional": true
            },
            {
                "name": "courses",
                "type": "Course",
                "isArray": true,
                "optional": true
            },
            {
                "name": "club",
                "type": "Club",
                "isArray": false,
                "optional": true
            }
        ],
        "relations": [
            {
                "name": "student-course",
                "foreignModelName": "Course",
                "localField": {
                    "name": "courses",
                    "isArray": true
                },
                "localModelName": "Student",
                "defined": true,
                "foreignField": {
                    "name": "students",
                    "isArray": true
                },
                "relationType": "many_to_many",
                "localModel": {
                    "name": "Student",
                    "path": "/testing/students",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Course",
                    "path": "/testing/courses",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            },
            {
                "name": "student-club",
                "foreignModelName": "Club",
                "localField": {
                    "name": "club",
                    "isArray": false
                },
                "localModelName": "Student",
                "defined": true,
                "foreignField": {
                    "name": "members",
                    "isArray": true
                },
                "relationType": "one_to_many",
                "localModel": {
                    "name": "Student",
                    "path": "/testing/students",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Club",
                    "path": "/testing/clubs",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            }
        ],
        "relationsNames": [
            "student-course",
            "student-club"
        ]
    },
    "Professor": {
        "path": "/testing/professors",
        "name": "Professor",
        "properties": [
            {
                "name": "name",
                "type": "string",
                "isArray": false,
                "optional": true
            },
            {
                "name": "year",
                "type": "SchoolYear",
                "isArray": false,
                "optional": true
            },
            {
                "name": "birthday",
                "type": "Date",
                "isArray": false,
                "optional": true
            },
            {
                "name": "contactInfo",
                "type": "ContactInfo",
                "isArray": false,
                "optional": true
            },
            {
                "name": "courses",
                "type": "Course",
                "isArray": true,
                "optional": true
            },
            {
                "name": "club",
                "type": "Club",
                "isArray": false,
                "optional": true
            }
        ],
        "relations": [
            {
                "name": "professor-course",
                "foreignModelName": "Course",
                "localField": {
                    "name": "courses",
                    "isArray": true
                },
                "localModelName": "Professor",
                "defined": true,
                "foreignField": {
                    "name": "professor",
                    "isArray": false
                },
                "relationType": "one_to_many",
                "localModel": {
                    "name": "Professor",
                    "path": "/testing/professors",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Course",
                    "path": "/testing/courses",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            },
            {
                "name": "professor-club",
                "foreignModelName": "Club",
                "localField": {
                    "name": "club",
                    "isArray": false
                },
                "localModelName": "Professor",
                "defined": true,
                "foreignField": {
                    "name": "supervisor",
                    "isArray": false
                },
                "relationType": "one_to_one",
                "localModel": {
                    "name": "Professor",
                    "path": "/testing/professors",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Club",
                    "path": "/testing/clubs",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            }
        ],
        "relationsNames": [
            "professor-course",
            "professor-club"
        ]
    },
    "Course": {
        "path": "/testing/courses",
        "name": "Course",
        "properties": [
            {
                "name": "name",
                "type": "string",
                "isArray": false,
                "optional": true
            },
            {
                "name": "level",
                "type": "DifficultyLevel",
                "isArray": false,
                "optional": true
            },
            {
                "name": "students",
                "type": "Student",
                "isArray": true,
                "optional": true
            },
            {
                "name": "professor",
                "type": "Professor",
                "isArray": false,
                "optional": true
            }
        ],
        "relations": [
            {
                "name": "student-course",
                "foreignModelName": "Student",
                "localField": {
                    "name": "students",
                    "isArray": true
                },
                "localModelName": "Course",
                "defined": true,
                "foreignField": {
                    "name": "courses",
                    "isArray": true
                },
                "relationType": "many_to_many",
                "localModel": {
                    "name": "Student",
                    "path": "/testing/students",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Course",
                    "path": "/testing/courses",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            },
            {
                "name": "professor-course",
                "foreignModelName": "Professor",
                "localField": {
                    "name": "professor",
                    "isArray": false
                },
                "localModelName": "Course",
                "defined": true,
                "foreignField": {
                    "name": "courses",
                    "isArray": true
                },
                "relationType": "one_to_many",
                "localModel": {
                    "name": "Professor",
                    "path": "/testing/professors",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Course",
                    "path": "/testing/courses",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            }
        ],
        "relationsNames": [
            "student-course",
            "professor-course"
        ]
    },
    "Club": {
        "path": "/testing/clubs",
        "name": "Club",
        "properties": [
            {
                "name": "name",
                "type": "string",
                "isArray": false,
                "optional": true
            },
            {
                "name": "members",
                "type": "Student",
                "isArray": true,
                "optional": true
            },
            {
                "name": "supervisor",
                "type": "Professor",
                "isArray": false,
                "optional": true
            }
        ],
        "relations": [
            {
                "name": "student-club",
                "foreignModelName": "Student",
                "localField": {
                    "name": "members",
                    "isArray": true
                },
                "localModelName": "Club",
                "defined": true,
                "foreignField": {
                    "name": "club",
                    "isArray": false
                },
                "relationType": "one_to_many",
                "localModel": {
                    "name": "Student",
                    "path": "/testing/students",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Club",
                    "path": "/testing/clubs",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            },
            {
                "name": "professor-club",
                "foreignModelName": "Professor",
                "localField": {
                    "name": "supervisor",
                    "isArray": false
                },
                "localModelName": "Club",
                "defined": true,
                "foreignField": {
                    "name": "club",
                    "isArray": false
                },
                "relationType": "one_to_one",
                "localModel": {
                    "name": "Professor",
                    "path": "/testing/professors",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Club",
                    "path": "/testing/clubs",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": true
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": true
                        }
                    ]
                }
            }
        ],
        "relationsNames": [
            "student-club",
            "professor-club"
        ]
    }
};
var SampleDelegate = /** @class */ (function (_super) {
    __extends(SampleDelegate, _super);
    function SampleDelegate() {
        return _super.call(this, exports.FrostModels["Sample"]) || this;
    }
    return SampleDelegate;
}(frost_web_client_1.FrostDelegate));
exports.SampleDelegate = SampleDelegate;
var StudentDelegate = /** @class */ (function (_super) {
    __extends(StudentDelegate, _super);
    function StudentDelegate() {
        return _super.call(this, exports.FrostModels["Student"]) || this;
    }
    return StudentDelegate;
}(frost_web_client_1.FrostDelegate));
exports.StudentDelegate = StudentDelegate;
var ProfessorDelegate = /** @class */ (function (_super) {
    __extends(ProfessorDelegate, _super);
    function ProfessorDelegate() {
        return _super.call(this, exports.FrostModels["Professor"]) || this;
    }
    return ProfessorDelegate;
}(frost_web_client_1.FrostDelegate));
exports.ProfessorDelegate = ProfessorDelegate;
var CourseDelegate = /** @class */ (function (_super) {
    __extends(CourseDelegate, _super);
    function CourseDelegate() {
        return _super.call(this, exports.FrostModels["Course"]) || this;
    }
    return CourseDelegate;
}(frost_web_client_1.FrostDelegate));
exports.CourseDelegate = CourseDelegate;
var ClubDelegate = /** @class */ (function (_super) {
    __extends(ClubDelegate, _super);
    function ClubDelegate() {
        return _super.call(this, exports.FrostModels["Club"]) || this;
    }
    return ClubDelegate;
}(frost_web_client_1.FrostDelegate));
exports.ClubDelegate = ClubDelegate;
function getDelegatesMap() {
    return {
        sample: SampleDelegate,
        student: StudentDelegate,
        professor: ProfessorDelegate,
        course: CourseDelegate,
        club: ClubDelegate
    };
}
exports.getDelegatesMap = getDelegatesMap;
