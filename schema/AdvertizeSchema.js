exports.default = `
type Advertize{
    _id: ID
    title: String
    slug: String
    description: String
    category: String
    price: String!
    websiteLink: String
    youtubeLink: String
    location: LocationOutput
    user: User
    email: String
    phone: String
    images: [ImageFileOutput]
    vehicle: VehicleType,
    property: PropertyType
    createdAt: String
    updatedAt: String
} 

input AdvertizeInput{
    _id: ID
    title: String!
    description: String!
    category: ID
    price: String!
    websiteLink: String
    youtubeLink: String
    location: LocationInput
    user: ID
    email: String
    phone: String
    images: [ImageFileInput]
    vehicle: VehicleInput,
    property: PropertyInput
    createdAt: String
    updatedAt: String
} 

type LocationOutput{
    address: String
    city: String
    state: String
    country: String
    postal: String
    lat: Float
    lng: Float
}

input LocationInput{
    address: String
    city: String
    state: String
    country: String
    postal: String
    lat: Float
    lng: Float
}

type VehicleType {
    year: String
    make: String,
    model: String
    trim: String
    bodyType: String
    condition: String
    miles: String
    transmission: String
    color: String
    fuelType: String
    noOfDoors: String
    noOfSeats: String
}

input VehicleInput {
    year: String
    make: String,
    model: String
    trim: String
    bodyType: String
    condition: String
    miles: String
    transmission: String
    color: String
    fuelType: String
    noOfDoors: String
    noOfSeats: String
}

input PropertyInput {
    bedRooms: String
    BathRooms: String
    Size: String
    Furnished: String
    Appliances: String
    rentals:  RentalsInput
}

input RentalsInput{
    unitType: String
    AggrementType: String
    MoveInDate: String
    PetFriendly: Boolean
    OutDoorSpace: String
    AirConditioning: Boolean
    smokingPermited: Boolean
    Parking: String
}

type PropertyType {
    bedRooms: String
    BathRooms: String
    Size: String
    Furnished: String
    Appliances: String
    rentals:  RentalsType
}

type RentalsType{
    unitType: String
    AggrementType: String
    MoveInDate: String
    PetFriendly: Boolean
    OutDoorSpace: String
    AirConditioning: Boolean
    smokingPermited: Boolean
    Parking: String
}

type ImageFileOutput{
    _id : ID
    fileName: String
    largeFile: String
    thumbFile: String
}

input ImageFileInput{
    fileName: String
    largeFile: String
    thumbFile: String
}

input GetAdvertizeQuery{
    first: Int
    last: Int
    after: Int
    before: Int
    skip: Int
}

type AdvertizeMeta {
    currentPage: Int
    noOfPages: Int
}

type Advertizements{
    advertizeData: [Advertize],
    meta: AdvertizeMeta
}

type Query{
    getAllAdvertizements: [Advertize]
    advertizements(
        first: Int,
        last: Int,
        after: Int,
        before: Int,
        skip: Int,
        where: String
    ): Advertizements
    getSingleAdvertize(_id: ID!) : Advertize
    getCurrentUserAdvertizements: [Advertize]
    getAdvertizementsByCategory(categoryId: ID!): [Advertize]
    searchAdvertizements(keywords: String, category: String, location: String): [Advertize]
}

type Mutation{
    postAdvertize( advertizeData: AdvertizeInput): String
}
`;
