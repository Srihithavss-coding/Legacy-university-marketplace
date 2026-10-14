import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.png";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_iamge from "./add_address_image.svg";

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_iamge,
  box_icon,
};

export const categories = [
  {
    text: "Textbooks & Course Materials",
    path: "Textbooks",
    image: box_icon,
    bgColor: "#E8F1FF",
  },
  {
    text: "Lab Equipment & Lab Coats",
    path: "Lab",
    image: trust_icon,
    bgColor: "#E1F5EC",
  },
  {
    text: "Old Question Papers & Notes",
    path: "Notes",
    image: coin_icon,
    bgColor: "#F1E3F9",
  },
  {
    text: "Bicycles & Transport",
    path: "Bicycles",
    image: delivery_truck_icon,
    bgColor: "#FEE6CD",
  },
  {
    text: "Miscellaneous / Dorm Gear",
    path: "Misc",
    image: leaf_icon,
    bgColor: "#FEF6DA",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "All Listings", url: "#" },
      { text: "Sell an Item", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "How to Buy", url: "#" },
      { text: "How to Sell", url: "#" },
      { text: "Safety Tips", url: "#" },
      { text: "University Verification", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: box_icon,
    title: "Campus Marketplace",
    description: "Buy and sell within your university community.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Get great deals on textbooks, lab coats, and more.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Students",
    description: "Safe transactions with verified university emails.",
  },
  {
    icon: black_arrow_icon,
    title: "Easy to Use",
    description: "List items in minutes and connect with buyers.",
  },
];

export const dummyProducts = [
  // Lab Coats
  {
    _id: "lab01",
    name: "First-year Chemistry Lab Coat",
    category: "Lab",
    price: 350,
    image: [trust_icon],
    description: [
      "Brand new lab coat, never used",
      "Standard white cotton lab coat",
      "Size M, fits most first-year students",
      "Purchased from campus store but never needed"
    ],
    condition: "Brand New",
    campus: "Main Campus",
    size: "M",
    department: "Chemistry",
    sellerId: "user1",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "lab02",
    name: "Physics Lab Coat Size L",
    category: "Lab",
    price: 200,
    image: [trust_icon],
    description: [
      "Used for one semester only",
      "Clean and well-maintained",
      "Size L, perfect for taller students",
      "No stains or tears"
    ],
    condition: "Gently Used",
    campus: "Science Block",
    size: "L",
    department: "Physics",
    sellerId: "user2",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "lab03",
    name: "Biology Lab Coat Size S",
    category: "Lab",
    price: 300,
    image: [trust_icon],
    description: [
      "Biology lab coat, barely used",
      "Size S, fits petite frame",
      "Excellent condition",
      "From campus store"
    ],
    condition: "Like New",
    campus: "Biology Lab",
    size: "S",
    department: "Biology",
    sellerId: "user3",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },

  // Notes & Question Papers
  {
    _id: "notes01",
    name: "Mechanical Engineering 3rd Sem Question Papers",
    category: "Notes",
    price: 150,
    image: [coin_icon],
    description: [
      "Complete set of previous year question papers",
      "Includes: Thermodynamics, Fluid Mechanics, Material Science",
      "Solved papers with detailed solutions",
      "Covers 2020-2024 exams"
    ],
    condition: "Like New",
    campus: "Engineering Block",
    semester: "3",
    professor: "Dr. Sharma",
    academicYear: "2024",
    sellerId: "user4",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "notes02",
    name: "Data Structures Handwritten Notes",
    category: "Notes",
    price: 200,
    image: [coin_icon],
    description: [
      "Complete handwritten notes for Data Structures",
      "Includes: Arrays, Linked Lists, Trees, Graphs",
      "Well-organized with diagrams and examples",
      "Scored 90+ in the subject"
    ],
    condition: "Like New",
    campus: "CS Department",
    semester: "2",
    professor: "Prof. Kumar",
    academicYear: "2024",
    sellerId: "user5",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "notes03",
    name: "Electrical Circuits Notes",
    category: "Notes",
    price: 180,
    image: [coin_icon],
    description: [
      "Comprehensive notes for Electrical Circuits",
      "Includes circuit diagrams and solved problems",
      "Handwritten with clear explanations",
      "Covers all important topics"
    ],
    condition: "Good",
    campus: "EE Department",
    semester: "3",
    professor: "Dr. Patel",
    academicYear: "2023",
    sellerId: "user1",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },

  // Textbooks
  {
    _id: "text01",
    name: "Calculus Textbook - Stewart 8th Edition",
    category: "Textbooks",
    price: 800,
    image: [box_icon],
    description: [
      "Calculus: Early Transcendentals by James Stewart",
      "8th Edition, International Student Edition",
      "Minimal highlighting, clean pages",
      "Essential for first-year engineering"
    ],
    condition: "Like New",
    campus: "Library",
    author: "James Stewart",
    edition: "8th",
    courseCode: "MAT101",
    sellerId: "user2",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },

  // Bicycles
  {
    _id: "bike01",
    name: "Campus Bicycle - Hercules Geared",
    category: "Bicycles",
    price: 4500,
    image: [delivery_truck_icon],
    description: [
      "21-speed geared bicycle in excellent condition",
      "Perfect for campus commute",
      "Recently serviced - new brake pads and chain",
      "Includes helmet and lock"
    ],
    condition: "Like New",
    campus: "Hostel Block A",
    bicycleBrand: "Hercules",
    gearType: "Geared",
    lockIncluded: true,
    sellerId: "user3",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "bike02",
    name: "Simple Bicycle - Single Speed",
    category: "Bicycles",
    price: 2500,
    image: [delivery_truck_icon],
    description: [
      "Basic single-speed bicycle",
      "Good condition, minor rust on chain",
      "Perfect for short campus rides",
      "Budget-friendly option"
    ],
    condition: "Gently Used",
    campus: "Hostel Block B",
    bicycleBrand: "Atlas",
    gearType: "Single Speed",
    lockIncluded: false,
    sellerId: "user4",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },

  // Misc
  {
    _id: "misc01",
    name: "Used Desk Lamp - Study Light",
    category: "Misc",
    price: 400,
    image: [leaf_icon],
    description: [
      "LED desk lamp with adjustable brightness",
      "Good for late-night studying",
      "Selling as I'm graduating",
      "Works perfectly"
    ],
    condition: "Good",
    campus: "Hostel Block C",
    sellerId: "user5",
    status: "ACTIVE",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
