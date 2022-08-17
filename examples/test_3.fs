model Fruit{
    apple   Apple[]
    orange   Orange     @Relation()   @Relation()
}

model Animals{
    dog   Dog[]
    cat   Cat     @Relation()
}

type Dog{
    name String
    bread String
}

enum Breed {
    DOG = "dog"
    CAT = "cat"
    FOX
}