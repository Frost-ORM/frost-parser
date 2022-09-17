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
exports.getDelegatesMap = exports.ClubDelegate = exports.CourseDelegate = exports.ProfessorDelegate = exports.StudentDelegate = exports.FrostModels = exports.ClubType = exports.Duration = exports.DifficultyLevel = exports.SchoolYear = void 0;
var frost_web_client_1 = require("@frost-orm/frost-web-client");
var SchoolYear;
(function (SchoolYear) {
    SchoolYear["FRESHMAN"] = "FRESHMAN";
    SchoolYear["SOPHOMORE"] = "SOPHOMORE";
    SchoolYear["JUNIOR"] = "JUNIOR";
    SchoolYear["SENIOR"] = "SENIOR";
})(SchoolYear = exports.SchoolYear || (exports.SchoolYear = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["INTRODUCTORY"] = "INTRODUCTORY";
    DifficultyLevel["INTERMEDIATE"] = "INTERMEDIATE";
    DifficultyLevel["UPPER_INTERMEDIATE"] = "UPPER_INTERMEDIATE";
    DifficultyLevel["ADVANCED_PLACEMENT"] = "ADVANCED_PLACEMENT";
})(DifficultyLevel = exports.DifficultyLevel || (exports.DifficultyLevel = {}));
var Duration;
(function (Duration) {
    Duration[Duration["FULL_YEAR"] = 24] = "FULL_YEAR";
    Duration[Duration["FULL_SEMESTER"] = 12] = "FULL_SEMESTER";
    Duration[Duration["HALF_SEMESTER"] = 6] = "HALF_SEMESTER";
})(Duration = exports.Duration || (exports.Duration = {}));
var ClubType;
(function (ClubType) {
    ClubType["STEM"] = "STEM";
    ClubType["SPORTS"] = "SPORTS";
    ClubType["CREATIVE"] = "CREATIVE";
})(ClubType = exports.ClubType || (exports.ClubType = {}));
//export type ClubDelegate = FrostDelegate<ClubTypes>
exports.FrostModels = {
    "Student": {
        "path": "/testing/students",
        "name": "Student",
        "properties": [
            {
                "name": "name",
                "type": "string",
                "isArray": false,
                "optional": false
            },
            {
                "name": "year",
                "type": "SchoolYear",
                "isArray": false,
                "optional": false
            },
            {
                "name": "birthday",
                "type": "Date",
                "isArray": false,
                "optional": true
            },
            {
                "name": "email",
                "type": "string",
                "isArray": false,
                "optional": true
            },
            {
                "name": "courses",
                "type": "Course",
                "isArray": true,
                "optional": false
            },
            {
                "name": "club",
                "type": "Club",
                "isArray": false,
                "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "duration",
                            "type": "Duration",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "type",
                            "type": "ClubType",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "roomId",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
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
                "optional": false
            },
            {
                "name": "contactInfo",
                "type": "ContactInfo",
                "isArray": false,
                "optional": false
            },
            {
                "name": "department",
                "type": "string",
                "isArray": false,
                "optional": false
            },
            {
                "name": "email",
                "type": "string",
                "isArray": false,
                "optional": false
            },
            {
                "name": "courses",
                "type": "Course",
                "isArray": true,
                "optional": false
            },
            {
                "name": "club",
                "type": "Club",
                "isArray": false,
                "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "duration",
                            "type": "Duration",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                            "optional": false
                        },
                        {
                            "name": "type",
                            "type": "ClubType",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "roomId",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
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
                "optional": false
            },
            {
                "name": "level",
                "type": "DifficultyLevel",
                "isArray": false,
                "optional": false
            },
            {
                "name": "duration",
                "type": "Duration",
                "isArray": false,
                "optional": false
            },
            {
                "name": "department",
                "type": "string",
                "isArray": false,
                "optional": false
            },
            {
                "name": "students",
                "type": "Student",
                "isArray": true,
                "optional": false
            },
            {
                "name": "professor",
                "type": "Professor",
                "isArray": false,
                "optional": false
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
                    "name": "Course",
                    "path": "/testing/courses",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "duration",
                            "type": "Duration",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Student",
                    "path": "/testing/students",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                    "name": "Course",
                    "path": "/testing/courses",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "level",
                            "type": "DifficultyLevel",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "duration",
                            "type": "Duration",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "students",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "professor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Professor",
                    "path": "/testing/professors",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                "optional": false
            },
            {
                "name": "type",
                "type": "ClubType",
                "isArray": false,
                "optional": false
            },
            {
                "name": "roomId",
                "type": "string",
                "isArray": false,
                "optional": false
            },
            {
                "name": "members",
                "type": "Student",
                "isArray": true,
                "optional": false
            },
            {
                "name": "supervisor",
                "type": "Professor",
                "isArray": false,
                "optional": false
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
                    "name": "Club",
                    "path": "/testing/clubs",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "type",
                            "type": "ClubType",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "roomId",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Student",
                    "path": "/testing/students",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "year",
                            "type": "SchoolYear",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "birthday",
                            "type": "Date",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": true
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
                    "name": "Club",
                    "path": "/testing/clubs",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "type",
                            "type": "ClubType",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "roomId",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "members",
                            "type": "Student",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "supervisor",
                            "type": "Professor",
                            "isArray": false,
                            "optional": false
                        }
                    ]
                },
                "foreignModel": {
                    "name": "Professor",
                    "path": "/testing/professors",
                    "properties": [
                        {
                            "name": "name",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "contactInfo",
                            "type": "ContactInfo",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "department",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "email",
                            "type": "string",
                            "isArray": false,
                            "optional": false
                        },
                        {
                            "name": "courses",
                            "type": "Course",
                            "isArray": true,
                            "optional": false
                        },
                        {
                            "name": "club",
                            "type": "Club",
                            "isArray": false,
                            "optional": false
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
var StudentDelegate = /** @class */ (function (_super) {
    __extends(StudentDelegate, _super);
    function StudentDelegate(db) {
        return _super.call(this, exports.FrostModels["Student"], db) || this;
    }
    return StudentDelegate;
}(frost_web_client_1.FrostDelegate));
exports.StudentDelegate = StudentDelegate;
var ProfessorDelegate = /** @class */ (function (_super) {
    __extends(ProfessorDelegate, _super);
    function ProfessorDelegate(db) {
        return _super.call(this, exports.FrostModels["Professor"], db) || this;
    }
    return ProfessorDelegate;
}(frost_web_client_1.FrostDelegate));
exports.ProfessorDelegate = ProfessorDelegate;
var CourseDelegate = /** @class */ (function (_super) {
    __extends(CourseDelegate, _super);
    function CourseDelegate(db) {
        return _super.call(this, exports.FrostModels["Course"], db) || this;
    }
    return CourseDelegate;
}(frost_web_client_1.FrostDelegate));
exports.CourseDelegate = CourseDelegate;
var ClubDelegate = /** @class */ (function (_super) {
    __extends(ClubDelegate, _super);
    function ClubDelegate(db) {
        return _super.call(this, exports.FrostModels["Club"], db) || this;
    }
    return ClubDelegate;
}(frost_web_client_1.FrostDelegate));
exports.ClubDelegate = ClubDelegate;
function getDelegatesMap() {
    return {
        student: StudentDelegate,
        professor: ProfessorDelegate,
        course: CourseDelegate,
        club: ClubDelegate
    };
}
exports.getDelegatesMap = getDelegatesMap;
