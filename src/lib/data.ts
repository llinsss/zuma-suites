export const ROOMS = [
  {
    id: "studio-deluxe",
    name: "Studio Deluxe",
    slug: "studio-deluxe",
    tagline: "Smart Comfort, Kaduna's Finest",
    description:
      "A beautifully appointed studio apartment with premium furnishings, a fully equipped kitchenette, and panoramic city views. Perfect for the modern solo traveller or couple.",
    price: 85000,
    pricePer: "night",
    size: "45 sqm",
    guests: 2,
    beds: "1 King Bed",
    baths: 1,
    floor: "3rd – 8th Floor",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    ],
    amenities: ["Free WiFi", "55\" Smart TV", "Kitchenette", "Air Conditioning", "Daily Housekeeping", "Safe Deposit Box"],
    badge: "Best Value",
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    slug: "executive-suite",
    tagline: "Where Productivity Meets Prestige",
    description:
      "Designed for business travellers, the Executive Suite features a separate living area, workstation, and all the amenities needed to maintain your professional momentum while away from home.",
    price: 145000,
    pricePer: "night",
    size: "75 sqm",
    guests: 2,
    beds: "1 King Bed + Sofa Bed",
    baths: 1,
    floor: "9th – 14th Floor",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    ],
    amenities: ["Free WiFi", "65\" Smart TV", "Full Kitchen", "Dedicated Workspace", "Air Conditioning", "Daily Housekeeping", "Complimentary Breakfast", "Airport Transfer"],
    badge: "Most Popular",
  },
  {
    id: "two-bedroom-suite",
    name: "Two-Bedroom Suite",
    slug: "two-bedroom-suite",
    tagline: "Space for the Whole Family",
    description:
      "Two fully furnished bedrooms, a spacious living area and a complete kitchen make this suite ideal for families or colleagues travelling together.",
    price: 210000,
    pricePer: "night",
    size: "110 sqm",
    guests: 4,
    beds: "2 King Beds",
    baths: 2,
    floor: "9th – 14th Floor",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    ],
    amenities: ["Free WiFi", "2x 55\" Smart TVs", "Full Kitchen", "Dining Area", "Air Conditioning", "Daily Housekeeping", "Laundry Service", "Children's Amenities"],
    badge: "Family Pick",
  },
  {
    id: "penthouse",
    name: "The Zuma Penthouse",
    slug: "penthouse",
    tagline: "Above Everything Else",
    description:
      "The crown of Zuma Suites. Two floors of exquisite living, a private rooftop terrace, plunge pool, and 360° views of Kaduna city — an experience reserved for those who accept nothing but the best.",
    price: 520000,
    pricePer: "night",
    size: "280 sqm",
    guests: 6,
    beds: "3 King Beds",
    baths: 3,
    floor: "Floors 18 & 19",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    amenities: ["Dedicated Butler", "Private Rooftop Terrace", "Plunge Pool", "Home Cinema", "Full Chef's Kitchen", "Private Gym", "Concierge 24/7", "Airport Transfer (Both Ways)"],
    badge: "Signature",
  },
];

export const TESTIMONIALS = [
  {
    name: "Amara Okafor",
    role: "CEO, Okafor Holdings",
    location: "Lagos, Nigeria",
    text: "We stayed at the pre-opening event and were blown away. The attention to detail rivals anything I have seen in Dubai. Kaduna finally has something world-class.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
  },
  {
    name: "David Mensah",
    role: "Senior Consultant, PwC",
    location: "Accra, Ghana",
    text: "Travelled to Kaduna for a government project and Zuma Suites made a tough assignment genuinely enjoyable. The Executive Suite is better equipped than my apartment back home.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Director, NNPC",
    location: "Abuja, Nigeria",
    text: "Finally, a property in the North that doesn't compromise on quality. The security, the WiFi, the service — all impeccable. This is my new default when in Kaduna.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export const AMENITIES = [
  { icon: "wifi", title: "High-Speed Fibre WiFi", description: "100Mbps dedicated fibre with backup connectivity. Stay connected without interruption." },
  { icon: "generator", title: "24/7 Power Supply", description: "Industrial generator with automatic changeover. Zero downtime, guaranteed." },
  { icon: "pool", title: "Infinity Pool", description: "Rooftop infinity pool with panoramic views of Kaduna city skyline." },
  { icon: "gym", title: "Fully Equipped Gym", description: "State-of-the-art fitness centre with Technogym equipment and personal trainers on call." },
  { icon: "restaurant", title: "Saffron Restaurant", description: "Award-winning restaurant serving continental and Nigerian cuisine from 6am to midnight." },
  { icon: "security", title: "24/7 Security", description: "Armed security personnel, CCTV surveillance, and biometric access control throughout." },
  { icon: "parking", title: "Secure Parking", description: "Underground parking with CCTV, dedicated spots per suite, and valet service." },
  { icon: "spa", title: "Zuma Spa & Wellness", description: "Full-service spa with massage rooms, sauna, steam room, and beauty salon." },
  { icon: "conference", title: "Conference Facilities", description: "Three fully equipped conference rooms accommodating 10 to 120 delegates." },
  { icon: "kitchen", title: "Fully Stocked Kitchen", description: "Every suite comes with premium appliances, cookware, and a welcome pantry." },
  { icon: "laundry", title: "Laundry & Dry Cleaning", description: "Same-day laundry, dry cleaning, and pressing service available daily." },
  { icon: "concierge", title: "Concierge Services", description: "24-hour front desk, airport transfers, tour bookings, and business support." },
];

export const BLOG_POSTS = [
  {
    slug: "top-things-to-do-kaduna",
    title: "Top 10 Things to Do in Kaduna State",
    excerpt: "From the Kajuru Castle and Kwidon Hills to the vibrant Kasuwan Barci market — discover the best of Kaduna beyond the boardroom.",
    category: "Travel Guide",
    date: "September 1, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
  },
  {
    slug: "why-kaduna-is-the-next-business-hub",
    title: "Why Kaduna Is Becoming Nigeria's Next Major Business Hub",
    excerpt: "With billions in infrastructure investment and a growing tech scene, Kaduna State is positioning itself as the North's economic powerhouse.",
    category: "Business",
    date: "August 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    slug: "corporate-travel-tips-nigeria",
    title: "Corporate Travel in Nigeria: A Complete Guide for Executives",
    excerpt: "Everything you need to know about business travel to Northern Nigeria — from visa requirements to the best accommodation options.",
    category: "Corporate Travel",
    date: "August 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
];

export const FAQS = [
  {
    question: "When does Zuma Suites open?",
    answer: "Zuma Suites officially opens to the public in November 2026. Early reservations are now open and we are offering exclusive pre-launch rates for guests who book before September 30, 2026.",
  },
  {
    question: "Where exactly is Zuma Suites located in Kaduna?",
    answer: "Zuma Suites is located on Ahmadu Bello Way, Central Business District, Kaduna — minutes from Kaduna International Airport and the state government secretariat.",
  },
  {
    question: "What is the minimum stay duration?",
    answer: "Minimum stay is 1 night. We also offer weekly and monthly rates with significant discounts for extended stays — ideal for consultants, diplomats, and project teams.",
  },
  {
    question: "Do you accept Nigerian Naira payments?",
    answer: "Yes. We accept NGN via bank transfer, Paystack, and POS. We also accept USD and GBP for international guests via Stripe and wire transfer.",
  },
  {
    question: "Is there a generator / constant power supply?",
    answer: "Absolutely. We operate on 24/7 industrial generator backup with automatic transfer switches. There is zero noticeable downtime for our guests.",
  },
  {
    question: "Do you provide airport transfers?",
    answer: "Yes. Complimentary airport transfers are included with Executive Suite, Two-Bedroom, and Penthouse bookings. Studio guests can arrange transfers at a subsidised rate through concierge.",
  },
  {
    question: "Is Zuma Suites pet-friendly?",
    answer: "We welcome small, well-behaved pets in select ground-floor suites with prior arrangement. A refundable pet deposit applies. Please contact us before booking.",
  },
  {
    question: "What security measures are in place?",
    answer: "Zuma Suites features 24/7 armed security, biometric entry, comprehensive CCTV coverage, secure underground parking, and a dedicated security command room.",
  },
];
