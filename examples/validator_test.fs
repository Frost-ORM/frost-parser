model Sample {
    @@node(path:"/testing/samples")
    
    name string
    year  SchoolYear
    birthday Date?


}
model Student {
    @@node(path:"/testing/students")
    
    name string
    year  SchoolYear
    birthday Date?

    courses Course[] @Relation()
    club Club @Relation()

}

model Professor {
    @@node(path:"/testing/professors")
    
    name string
    year  SchoolYear
    birthday Date
    contactInfo ContactInfo

    courses Course[] @Relation()
    club Club @Relation()
}

model Course {
    @@node(path:"/testing/courses")
    
    name string
    level DifficultyLevel
    students Student[] @Relation()
    professor Professor @Relation()
}

model Club {
    @@node(path:"/testing/clubs")
    
    name string


    members Student[] @Relation()
    supervisor Professor @Relation()
}

enum SchoolYear {
    FRESHMAN = "FRESHMAN"
    SOPHOMORE = "SOPHOMORE"
    JUNIOR = "JUNIOR"
    SENIOR = "SENIOR"
}
enum ClubType {
    STEM = "STEM"
    SPORTS = "SPORTS"
    CREATIVE = "CREATIVE"
}
enum DifficultyLevel {
    INTRODUCTORY = "INTRODUCTORY"
    INTERMEDIATE = "INTERMEDIATE"
    UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE"
    ADVANCED_PLACEMENT = "ADVANCED_PLACEMENT"
}
type ContactInfo {
    phone   string
    email   string
}