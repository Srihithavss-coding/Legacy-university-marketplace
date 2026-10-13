import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";
import User from "./models/User.js";

dotenv.config();

const sampleListings = [
  {
    name: "First-year Chemistry Lab Coat",
    description: [
      "Brand new lab coat, never used",
      "Standard white cotton lab coat",
      "Size M, fits most first-year students",
      "Purchased from campus store but never needed"
    ],
    price: 350,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/lab_coat_1.jpg"],
    category: "Lab",
    campus: "Main Campus",
    condition: "Brand New",
    sellerId: "sample_seller_1",
    status: "ACTIVE",
    size: "M",
    department: "Chemistry"
  },
  {
    name: "Mechanical Engineering 3rd Sem Question Papers",
    description: [
      "Complete set of previous year question papers",
      "Includes: Thermodynamics, Fluid Mechanics, Material Science",
      "Solved papers with detailed solutions",
      "Covers 2020-2024 exams"
    ],
    price: 150,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/papers_1.jpg"],
    category: "Notes",
    campus: "Engineering Block",
    condition: "Like New",
    sellerId: "sample_seller_2",
    status: "ACTIVE",
    semester: "3",
    professor: "Dr. Sharma",
    academicYear: "2024"
  },
  {
    name: "Data Structures Handwritten Notes",
    description: [
      "Complete handwritten notes for Data Structures",
      "Includes: Arrays, Linked Lists, Trees, Graphs",
      "Well-organized with diagrams and examples",
      "Scored 90+ in the subject"
    ],
    price: 200,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/notes_1.jpg"],
    category: "Notes",
    campus: "CS Department",
    condition: "Like New",
    sellerId: "sample_seller_3",
    status: "ACTIVE",
    semester: "2",
    professor: "Prof. Kumar",
    academicYear: "2024"
  },
  {
    name: "Campus Bicycle - Hercules Geared",
    description: [
      "21-speed geared bicycle in excellent condition",
      "Perfect for campus commute",
      "Recently serviced - new brake pads and chain",
      "Includes helmet and lock"
    ],
    price: 4500,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/bicycle_1.jpg"],
    category: "Bicycles",
    campus: "Hostel Block A",
    condition: "Like New",
    sellerId: "sample_seller_4",
    status: "ACTIVE",
    bicycleBrand: "Hercules",
    gearType: "Geared",
    lockIncluded: true
  },
  {
    name: "Physics Lab Coat Size L",
    description: [
      "Used for one semester only",
      "Clean and well-maintained",
      "Size L, perfect for taller students",
      "No stains or tears"
    ],
    price: 200,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/lab_coat_2.jpg"],
    category: "Lab",
    campus: "Science Block",
    condition: "Gently Used",
    sellerId: "sample_seller_1",
    status: "ACTIVE",
    size: "L",
    department: "Physics"
  },
  {
    name: "Calculus Textbook - Stewart 8th Edition",
    description: [
      "Calculus: Early Transcendentals by James Stewart",
      "8th Edition, International Student Edition",
      "Minimal highlighting, clean pages",
      "Essential for first-year engineering"
    ],
    price: 800,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/textbook_1.jpg"],
    category: "Textbooks",
    campus: "Library",
    condition: "Like New",
    sellerId: "sample_seller_5",
    status: "ACTIVE",
    author: "James Stewart",
    edition: "8th",
    courseCode: "MAT101"
  },
  {
    name: "Simple Bicycle - Single Speed",
    description: [
      "Basic single-speed bicycle",
      "Good condition, minor rust on chain",
      "Perfect for short campus rides",
      "Budget-friendly option"
    ],
    price: 2500,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/bicycle_2.jpg"],
    category: "Bicycles",
    campus: "Hostel Block B",
    condition: "Gently Used",
    sellerId: "sample_seller_2",
    status: "ACTIVE",
    bicycleBrand: "Atlas",
    gearType: "Single Speed",
    lockIncluded: false
  },
  {
    name: "Electrical Circuits Notes",
    description: [
      "Comprehensive notes for Electrical Circuits",
      "Includes circuit diagrams and solved problems",
      "Handwritten with clear explanations",
      "Covers all important topics"
    ],
    price: 180,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/notes_2.jpg"],
    category: "Notes",
    campus: "EE Department",
    condition: "Good",
    sellerId: "sample_seller_3",
    status: "ACTIVE",
    semester: "3",
    professor: "Dr. Patel",
    academicYear: "2023"
  },
  {
    name: "Lab Coat Size S - Biology",
    description: [
      "Biology lab coat, barely used",
      "Size S, fits petite frame",
      "Excellent condition",
      "From campus store"
    ],
    price: 300,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/lab_coat_3.jpg"],
    category: "Lab",
    campus: "Biology Lab",
    condition: "Like New",
    sellerId: "sample_seller_4",
    status: "ACTIVE",
    size: "S",
    department: "Biology"
  },
  {
    name: "Used Desk Lamp - Study Light",
    description: [
      "LED desk lamp with adjustable brightness",
      "Good for late-night studying",
      "Selling as I'm graduating",
      "Works perfectly"
    ],
    price: 400,
    image: ["https://res.cloudinary.com/demo/image/upload/v1234567890/lamp_1.jpg"],
    category: "Misc",
    campus: "Hostel Block C",
    condition: "Good",
    sellerId: "sample_seller_5",
    status: "ACTIVE"
  }
];

const sampleUsers = [
  {
    name: "Rahul Sharma",
    email: "rahul@test.com",
    universityEmail: "rahul.s@university.edu",
    password: "password123",
    campus: "Main Campus",
    department: "Computer Science",
    verifiedStatus: "VERIFIED"
  },
  {
    name: "Priya Patel",
    email: "priya@test.com",
    universityEmail: "priya.p@university.edu",
    password: "password123",
    campus: "Engineering Block",
    department: "Mechanical Engineering",
    verifiedStatus: "VERIFIED"
  },
  {
    name: "Amit Kumar",
    email: "amit@test.com",
    universityEmail: "amit.k@university.edu",
    password: "password123",
    campus: "CS Department",
    department: "Computer Science",
    verifiedStatus: "VERIFIED"
  },
  {
    name: "Sneha Reddy",
    email: "sneha@test.com",
    universityEmail: "sneha.r@university.edu",
    password: "password123",
    campus: "Hostel Block A",
    department: "Electrical Engineering",
    verifiedStatus: "VERIFIED"
  },
  {
    name: "Vikram Singh",
    email: "vikram@test.com",
    universityEmail: "vikram.s@university.edu",
    password: "password123",
    campus: "Library",
    department: "Physics",
    verifiedStatus: "VERIFIED"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Listing.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data");

    // Insert sample users
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`Inserted ${insertedUsers.length} users`);

    // Update sellerIds in listings to match inserted user IDs
    const listingWithRealIds = sampleListings.map((listing, index) => ({
      ...listing,
      sellerId: insertedUsers[index % insertedUsers.length]._id.toString()
    }));

    // Insert sample listings
    const insertedListings = await Listing.insertMany(listingWithRealIds);
    console.log(`Inserted ${insertedListings.length} listings`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
