import { FrostDelegate } from "@frost-orm/frost-web-client";
import { OneToManyMetadata, ManyToManyMetadata, IncludeOptions, With, ConnectOptions, DisconnectOptions, FrostObject } from "@frost-orm/frost-web-client/global-types";
export declare enum SchoolYear {
    FRESHMAN = "FRESHMAN",
    SOPHOMORE = "SOPHOMORE",
    JUNIOR = "JUNIOR",
    SENIOR = "SENIOR"
}
export declare enum DifficultyLevel {
    INTRODUCTORY = "INTRODUCTORY",
    INTERMEDIATE = "INTERMEDIATE",
    UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
    ADVANCED_PLACEMENT = "ADVANCED_PLACEMENT"
}
export declare enum Duration {
    FULL_YEAR = 24,
    FULL_SEMESTER = 12,
    HALF_SEMESTER = 6
}
export declare enum ClubType {
    STEM = "STEM",
    SPORTS = "SPORTS",
    CREATIVE = "CREATIVE"
}
export declare type ContactInfo = {
    phone: string;
    email: string;
};
export declare type Student = FrostObject & {
    name: string;
    year: SchoolYear;
    birthday?: Date;
    email?: string;
};
export declare type StudentIncludeCourse = {
    courses?: Course[];
};
export declare type StudentIncludeClub = {
    club?: Club;
};
export declare type StudentIncludeAll = StudentIncludeCourse & StudentIncludeClub;
export declare type StudentManyToManyRelationsFieldsKeys = "courses";
export declare type StudentOneToManyRelationsMasterFieldsKeys = "club";
export declare type StudentOneToManyRelationsSalveFieldsKeys = never;
export declare type StudentOneToManyRelationsFieldsKeys = "club";
export declare type StudentRelationsFieldsKeys = StudentManyToManyRelationsFieldsKeys | StudentOneToManyRelationsFieldsKeys;
export declare type StudentRelationsFieldsKeysByType = {
    many_to_many: StudentManyToManyRelationsFieldsKeys;
    one_to_many: StudentOneToManyRelationsFieldsKeys;
    one_to_many_master_fields: StudentOneToManyRelationsMasterFieldsKeys;
    one_to_many_slave_fields: StudentOneToManyRelationsSalveFieldsKeys;
};
export declare type StudentPropertiesKeys = "name" | "year" | "birthday" | "email" | "courses" | "club";
export declare type StudentFrostMetadata = {
    __frost__: {
        'one_to_many': {
            club?: OneToManyMetadata | null;
        };
        'many_to_many': {
            courses?: ManyToManyMetadata | null;
        };
    };
};
export declare type StudentConnectOptions = ConnectOptions<StudentRelationsFieldsKeysByType>;
export declare type StudentDisconnectOptions = DisconnectOptions<StudentRelationsFieldsKeysByType>;
export declare type StudentIncludeOptions = IncludeOptions<StudentRelationsFieldsKeys>;
export declare type StudentFetchReturnType<I extends StudentIncludeOptions> = With<Student, StudentIncludeAll, I>;
export declare type StudentTypes<T extends StudentIncludeOptions = StudentIncludeOptions> = {
    FullModel: Student & StudentIncludeAll & StudentFrostMetadata;
    Model: Student;
    IncludeAll: StudentIncludeAll;
    RelationsFieldsKeys: StudentRelationsFieldsKeys;
    RelationsFieldsKeysByType: StudentRelationsFieldsKeysByType;
    PropertiesKeys: StudentPropertiesKeys;
    FrostMetadata: StudentFrostMetadata;
    ConnectOptions: StudentConnectOptions;
    DisconnectOptions: StudentDisconnectOptions;
    IncludeOptions: StudentIncludeOptions;
};
export declare type Professor = FrostObject & {
    name: string;
    contactInfo: ContactInfo;
    department: string;
    email: string;
};
export declare type ProfessorIncludeCourse = {
    courses?: Course[];
};
export declare type ProfessorIncludeClub = {
    club?: Club;
};
export declare type ProfessorIncludeAll = ProfessorIncludeCourse & ProfessorIncludeClub;
export declare type ProfessorOneToManyRelationsMasterFieldsKeys = never;
export declare type ProfessorOneToManyRelationsSalveFieldsKeys = "courses";
export declare type ProfessorOneToManyRelationsFieldsKeys = "courses";
export declare type ProfessorOneToOneRelationsFieldsKeys = "club";
export declare type ProfessorRelationsFieldsKeys = ProfessorOneToManyRelationsFieldsKeys | ProfessorOneToOneRelationsFieldsKeys;
export declare type ProfessorRelationsFieldsKeysByType = {
    one_to_many: ProfessorOneToManyRelationsFieldsKeys;
    one_to_many_master_fields: ProfessorOneToManyRelationsMasterFieldsKeys;
    one_to_many_slave_fields: ProfessorOneToManyRelationsSalveFieldsKeys;
    one_to_one: ProfessorOneToOneRelationsFieldsKeys;
};
export declare type ProfessorPropertiesKeys = "name" | "contactInfo" | "department" | "email" | "courses" | "club";
export declare type ProfessorFrostMetadata = {
    __frost__: {
        'one_to_one': {
            club?: string | null;
        };
        'one_to_many': {
            courses?: OneToManyMetadata | null;
        };
    };
};
export declare type ProfessorConnectOptions = ConnectOptions<ProfessorRelationsFieldsKeysByType>;
export declare type ProfessorDisconnectOptions = DisconnectOptions<ProfessorRelationsFieldsKeysByType>;
export declare type ProfessorIncludeOptions = IncludeOptions<ProfessorRelationsFieldsKeys>;
export declare type ProfessorFetchReturnType<I extends ProfessorIncludeOptions> = With<Professor, ProfessorIncludeAll, I>;
export declare type ProfessorTypes<T extends ProfessorIncludeOptions = ProfessorIncludeOptions> = {
    FullModel: Professor & ProfessorIncludeAll & ProfessorFrostMetadata;
    Model: Professor;
    IncludeAll: ProfessorIncludeAll;
    RelationsFieldsKeys: ProfessorRelationsFieldsKeys;
    RelationsFieldsKeysByType: ProfessorRelationsFieldsKeysByType;
    PropertiesKeys: ProfessorPropertiesKeys;
    FrostMetadata: ProfessorFrostMetadata;
    ConnectOptions: ProfessorConnectOptions;
    DisconnectOptions: ProfessorDisconnectOptions;
    IncludeOptions: ProfessorIncludeOptions;
};
export declare type Course = FrostObject & {
    name: string;
    level: DifficultyLevel;
    duration: Duration;
    department: string;
};
export declare type CourseIncludeStudent = {
    students?: Student[];
};
export declare type CourseIncludeProfessor = {
    professor?: Professor;
};
export declare type CourseIncludeAll = CourseIncludeStudent & CourseIncludeProfessor;
export declare type CourseManyToManyRelationsFieldsKeys = "students";
export declare type CourseOneToManyRelationsMasterFieldsKeys = "professor";
export declare type CourseOneToManyRelationsSalveFieldsKeys = never;
export declare type CourseOneToManyRelationsFieldsKeys = "professor";
export declare type CourseRelationsFieldsKeys = CourseManyToManyRelationsFieldsKeys | CourseOneToManyRelationsFieldsKeys;
export declare type CourseRelationsFieldsKeysByType = {
    many_to_many: CourseManyToManyRelationsFieldsKeys;
    one_to_many: CourseOneToManyRelationsFieldsKeys;
    one_to_many_master_fields: CourseOneToManyRelationsMasterFieldsKeys;
    one_to_many_slave_fields: CourseOneToManyRelationsSalveFieldsKeys;
};
export declare type CoursePropertiesKeys = "name" | "level" | "duration" | "department" | "students" | "professor";
export declare type CourseFrostMetadata = {
    __frost__: {
        'one_to_many': {
            professor?: OneToManyMetadata | null;
        };
        'many_to_many': {
            students?: ManyToManyMetadata | null;
        };
    };
};
export declare type CourseConnectOptions = ConnectOptions<CourseRelationsFieldsKeysByType>;
export declare type CourseDisconnectOptions = DisconnectOptions<CourseRelationsFieldsKeysByType>;
export declare type CourseIncludeOptions = IncludeOptions<CourseRelationsFieldsKeys>;
export declare type CourseFetchReturnType<I extends CourseIncludeOptions> = With<Course, CourseIncludeAll, I>;
export declare type CourseTypes<T extends CourseIncludeOptions = CourseIncludeOptions> = {
    FullModel: Course & CourseIncludeAll & CourseFrostMetadata;
    Model: Course;
    IncludeAll: CourseIncludeAll;
    RelationsFieldsKeys: CourseRelationsFieldsKeys;
    RelationsFieldsKeysByType: CourseRelationsFieldsKeysByType;
    PropertiesKeys: CoursePropertiesKeys;
    FrostMetadata: CourseFrostMetadata;
    ConnectOptions: CourseConnectOptions;
    DisconnectOptions: CourseDisconnectOptions;
    IncludeOptions: CourseIncludeOptions;
};
export declare type Club = FrostObject & {
    name: string;
    type: ClubType;
    roomId: string;
};
export declare type ClubIncludeStudent = {
    members?: Student[];
};
export declare type ClubIncludeProfessor = {
    supervisor?: Professor;
};
export declare type ClubIncludeAll = ClubIncludeStudent & ClubIncludeProfessor;
export declare type ClubOneToManyRelationsMasterFieldsKeys = never;
export declare type ClubOneToManyRelationsSalveFieldsKeys = "members";
export declare type ClubOneToManyRelationsFieldsKeys = "members";
export declare type ClubOneToOneRelationsFieldsKeys = "supervisor";
export declare type ClubRelationsFieldsKeys = ClubOneToManyRelationsFieldsKeys | ClubOneToOneRelationsFieldsKeys;
export declare type ClubRelationsFieldsKeysByType = {
    one_to_many: ClubOneToManyRelationsFieldsKeys;
    one_to_many_master_fields: ClubOneToManyRelationsMasterFieldsKeys;
    one_to_many_slave_fields: ClubOneToManyRelationsSalveFieldsKeys;
    one_to_one: ClubOneToOneRelationsFieldsKeys;
};
export declare type ClubPropertiesKeys = "name" | "type" | "roomId" | "members" | "supervisor";
export declare type ClubFrostMetadata = {
    __frost__: {
        'one_to_one': {
            supervisor?: string | null;
        };
        'one_to_many': {
            members?: OneToManyMetadata | null;
        };
    };
};
export declare type ClubConnectOptions = ConnectOptions<ClubRelationsFieldsKeysByType>;
export declare type ClubDisconnectOptions = DisconnectOptions<ClubRelationsFieldsKeysByType>;
export declare type ClubIncludeOptions = IncludeOptions<ClubRelationsFieldsKeys>;
export declare type ClubFetchReturnType<I extends ClubIncludeOptions> = With<Club, ClubIncludeAll, I>;
export declare type ClubTypes<T extends ClubIncludeOptions = ClubIncludeOptions> = {
    FullModel: Club & ClubIncludeAll & ClubFrostMetadata;
    Model: Club;
    IncludeAll: ClubIncludeAll;
    RelationsFieldsKeys: ClubRelationsFieldsKeys;
    RelationsFieldsKeysByType: ClubRelationsFieldsKeysByType;
    PropertiesKeys: ClubPropertiesKeys;
    FrostMetadata: ClubFrostMetadata;
    ConnectOptions: ClubConnectOptions;
    DisconnectOptions: ClubDisconnectOptions;
    IncludeOptions: ClubIncludeOptions;
};
export declare const FrostModels: {
    Student: {
        path: string;
        name: string;
        properties: {
            name: string;
            type: string;
            isArray: boolean;
            optional: boolean;
        }[];
        relations: {
            name: string;
            foreignModelName: string;
            localField: {
                name: string;
                isArray: boolean;
            };
            localModelName: string;
            defined: boolean;
            foreignField: {
                name: string;
                isArray: boolean;
            };
            relationType: string;
            localModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
            foreignModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
        }[];
        relationsNames: string[];
    };
    Professor: {
        path: string;
        name: string;
        properties: {
            name: string;
            type: string;
            isArray: boolean;
            optional: boolean;
        }[];
        relations: {
            name: string;
            foreignModelName: string;
            localField: {
                name: string;
                isArray: boolean;
            };
            localModelName: string;
            defined: boolean;
            foreignField: {
                name: string;
                isArray: boolean;
            };
            relationType: string;
            localModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
            foreignModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
        }[];
        relationsNames: string[];
    };
    Course: {
        path: string;
        name: string;
        properties: {
            name: string;
            type: string;
            isArray: boolean;
            optional: boolean;
        }[];
        relations: {
            name: string;
            foreignModelName: string;
            localField: {
                name: string;
                isArray: boolean;
            };
            localModelName: string;
            defined: boolean;
            foreignField: {
                name: string;
                isArray: boolean;
            };
            relationType: string;
            localModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
            foreignModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
        }[];
        relationsNames: string[];
    };
    Club: {
        path: string;
        name: string;
        properties: {
            name: string;
            type: string;
            isArray: boolean;
            optional: boolean;
        }[];
        relations: {
            name: string;
            foreignModelName: string;
            localField: {
                name: string;
                isArray: boolean;
            };
            localModelName: string;
            defined: boolean;
            foreignField: {
                name: string;
                isArray: boolean;
            };
            relationType: string;
            localModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
            foreignModel: {
                name: string;
                path: string;
                properties: {
                    name: string;
                    type: string;
                    isArray: boolean;
                    optional: boolean;
                }[];
            };
        }[];
        relationsNames: string[];
    };
};
export declare class StudentDelegate extends FrostDelegate<StudentTypes> {
    constructor(db: any);
}
export declare class ProfessorDelegate extends FrostDelegate<ProfessorTypes> {
    constructor(db: any);
}
export declare class CourseDelegate extends FrostDelegate<CourseTypes> {
    constructor(db: any);
}
export declare class ClubDelegate extends FrostDelegate<ClubTypes> {
    constructor(db: any);
}
export declare type DelegatesMap = {
    student: typeof StudentDelegate;
    professor: typeof ProfessorDelegate;
    course: typeof CourseDelegate;
    club: typeof ClubDelegate;
};
export declare function getDelegatesMap(): DelegatesMap;
