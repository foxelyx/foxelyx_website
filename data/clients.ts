import type { RegionCode } from "@/lib/regions";

export type ClientService = "Website" | "Digital Marketing" | "SEO" | "UI/UX";

export type Client = {
  slug: string;
  name: string;
  industries: string[];
  services: ClientService[];
  region: RegionCode;
  description: string;
  highlights: string[];
  aboutPoints: { label: string; value: string }[];
  website?: string;
  instagram: { label: string; url: string }[];
  logo: string;
  color?: string;
  initials: string;
};

/** Ported from the published foxelyx.com client directory. */
export const CLIENTS = [
  {
    "slug": "woodcastle-furniture",
    "name": "Woodcastle Furniture",
    "industries": [
      "Furniture",
      "Retail",
      "Manufacturing"
    ],
    "services": [
      "Website",
      "Digital Marketing",
      "SEO"
    ],
    "region": "in",
    "description": "Woodcastle is a teak furniture house in Chevoor, Thrissur, crafting solid wood pieces since 1982. One of the first shops in the area, they furnish homes across Kerala with bedroom, living, dining, office, and outdoor collections.",
    "highlights": [
      "Designed and built woodcastlefurniture.com—collections, catalogue, and enquiry flow",
      "Ongoing full digital marketing support across their brand channels",
      "Positioned a 44-year Chevoor workshop as Kerala’s destination for 100% teak furniture",
      "Showcased bedroom, living, dining, office, and prayer-unit ranges online"
    ],
    "aboutPoints": [
      {
        "label": "Founded",
        "value": "1982"
      },
      {
        "label": "Location",
        "value": "Chevoor, Thrissur, Kerala"
      },
      {
        "label": "Speciality",
        "value": "100% teak wood furniture"
      },
      {
        "label": "Reach",
        "value": "10 lakh+ customers across Kerala & beyond"
      }
    ],
    "website": "https://www.woodcastlefurniture.com/",
    "instagram": [],
    "logo": "/images/clients/woodcastle-logo.png",
    "color": "#B8860B",
    "initials": "WC"
  },
  {
    "slug": "sg-solar",
    "name": "SG Solar",
    "industries": [
      "Solar",
      "Energy",
      "Construction"
    ],
    "services": [
      "Website"
    ],
    "region": "in",
    "description": "SG Solar installs residential, commercial, and industrial solar systems across Kerala from SG Complex, Vadakke Stand, Thrissur. They help homes and businesses cut electricity bills with subsidy support, net metering, and long-term maintenance.",
    "highlights": [
      "Designed and built sgsolarthrissur.com with services, projects, calculator, and pricing",
      "Ongoing digital marketing to generate residential and commercial solar enquiries",
      "Clear residential, commercial, and industrial plans for Kerala buyers",
      "Positioned a Thrissur installer with documented projects and subsidy guidance"
    ],
    "aboutPoints": [
      {
        "label": "Location",
        "value": "SG Complex, Vadakke Stand, Thrissur, Kerala"
      },
      {
        "label": "Speciality",
        "value": "Residential, commercial & industrial solar"
      },
      {
        "label": "Support",
        "value": "Subsidy, net metering & maintenance"
      }
    ],
    "website": "https://sgsolarthrissur.com/",
    "instagram": [],
    "logo": "/images/clients/sg-solar.png",
    "color": "#F59E0B",
    "initials": "SG"
  },
  {
    "slug": "mezmerix-builders",
    "name": "Mezmerix Builders",
    "industries": [
      "Construction",
      "Interior Design"
    ],
    "services": [
      "Website",
      "Digital Marketing",
      "SEO"
    ],
    "region": "in",
    "description": "Mezmerix Builders is a Kerala construction company based in Irinjalakuda, Thrissur, delivering contemporary homes and villas since 1988. They handle house and villa construction, renovation, interiors, and turnkey projects across Kerala, Coimbatore, and Bangalore.",
    "highlights": [
      "Designed and built mezmerix.in—portfolio, services, and enquiry flow",
      "Full digital marketing support for home-builder lead generation",
      "Showcased 35+ years of villas and contemporary homes across three states",
      "Content and site structure for construction, interiors, and turnkey work"
    ],
    "aboutPoints": [
      {
        "label": "Founded",
        "value": "1988"
      },
      {
        "label": "Location",
        "value": "Irinjalakuda, Thrissur, Kerala"
      },
      {
        "label": "Speciality",
        "value": "Homes, villas, renovation & interiors"
      },
      {
        "label": "Coverage",
        "value": "Kerala, Coimbatore & Bangalore"
      }
    ],
    "website": "https://mezmerix.in/",
    "instagram": [],
    "logo": "/images/clients/mezmerix-builders.png",
    "color": "#111111",
    "initials": "MX"
  },
  {
    "slug": "team-utc",
    "name": "TEAM UTC",
    "industries": [
      "Media",
      "Production",
      "Advertising"
    ],
    "services": [
      "Website"
    ],
    "region": "in",
    "description": "TEAM UTC is a Kerala creative house for digital marketing, branding, and photo and video production. Their portfolio spans TV commercials and brand films for jewellery, FMCG, and retail—including work such as Ishara Gold and a road-safety film featuring Dulquer Salman.",
    "highlights": [
      "Designed and built teamutc.net with services, team, and video portfolio",
      "Ongoing digital marketing support for a production and design house",
      "Organised TVC and brand-film work into a watchable showcase",
      "Positioned UTC as Kerala’s creative house for ads, design, and SEO"
    ],
    "aboutPoints": [
      {
        "label": "Location",
        "value": "Kerala, India"
      },
      {
        "label": "Speciality",
        "value": "TVC, brand films, design & digital"
      },
      {
        "label": "Work",
        "value": "Jewellery, FMCG, retail & public-service films"
      }
    ],
    "website": "https://teamutc.net/",
    "instagram": [],
    "logo": "/images/clients/team-utc.png",
    "color": "#111827",
    "initials": "TU"
  },
  {
    "slug": "scorio-lights",
    "name": "Scorio Lights",
    "industries": [
      "Lighting",
      "Manufacturing"
    ],
    "services": [
      "UI/UX"
    ],
    "region": "in",
    "description": "Scorio Lights is a premium lighting brand delivering high-performance, aesthetically refined lighting solutions for residential, commercial, and architectural spaces.",
    "highlights": [
      "Built a bold, modern brand identity with a distinctive visual language",
      "Digital campaigns targeting interior designers and commercial buyers",
      "Showcased product range through high-quality creative content"
    ],
    "aboutPoints": [],
    "instagram": [],
    "logo": "/images/clients/scorio-lights.png",
    "color": "#D91E5B",
    "initials": "SL"
  },
  {
    "slug": "ente-startup",
    "name": "Ente Startup",
    "industries": [
      "Media",
      "Startup Ecosystem",
      "Digital Publishing"
    ],
    "services": [
      "UI/UX"
    ],
    "region": "in",
    "description": "Ente Startup (എന്റെ Startup) is a leading Malayalam-language digital media platform dedicated to the startup and entrepreneurship ecosystem. Covering startup news, SME stories, AI trends, personal finance, and growth strategies, it empowers Kerala's next generation of entrepreneurs with actionable insights.",
    "highlights": [
      "Premier Malayalam-language platform for startup news, stories and insights",
      "Covers AI, personal finance, corporate finance, and investment management",
      "Strong community reach via Facebook, YouTube, and Instagram",
      "Dedicated sections for startup stories, case studies & SME spotlights",
      "Bridges the gap between global startup trends and Kerala's entrepreneurial community"
    ],
    "aboutPoints": [
      {
        "label": "Language",
        "value": "Malayalam (with English content)"
      },
      {
        "label": "Focus",
        "value": "Startups, SMEs, AI, Finance & Entrepreneurship"
      },
      {
        "label": "Platforms",
        "value": "Website, Facebook, YouTube, Instagram"
      },
      {
        "label": "Audience",
        "value": "Kerala entrepreneurs, investors & startup enthusiasts"
      }
    ],
    "website": "https://entestartup.com/",
    "instagram": [
      {
        "label": "Instagram",
        "url": "https://www.instagram.com/ente_startup"
      }
    ],
    "logo": "/images/clients/ente-startup.png",
    "color": "#2BADA0",
    "initials": "ES"
  },
  {
    "slug": "bright-fortune-international",
    "name": "Bright Fortune International (P) Ltd",
    "industries": [
      "Study Abroad",
      "Language Training",
      "Tours & Travels"
    ],
    "services": [
      "Digital Marketing"
    ],
    "region": "in",
    "description": "Bright Fortune International is a leading study-abroad consultancy and travel agency helping students find the best universities worldwide, while also offering language training and curated tour packages.",
    "highlights": [
      "Grew Instagram following by 3x across two accounts",
      "Consistent seasonal campaign execution for Onam, Christmas & New Year",
      "Promoted study-abroad destinations across UK, Canada, Australia & Europe"
    ],
    "aboutPoints": [],
    "instagram": [
      {
        "label": "Study Abroad",
        "url": "https://www.instagram.com/bright_fortune_international"
      },
      {
        "label": "Tours & Travels",
        "url": "https://www.instagram.com/brightfortune_toursandtravels/"
      }
    ],
    "logo": "/images/clients/bright-fortune-international.png",
    "color": "#F7AE21",
    "initials": "BF"
  },
  {
    "slug": "amico-care-education",
    "name": "Amico Care Education Overseas LLP",
    "industries": [
      "Study Abroad",
      "Language Training",
      "Work Visa"
    ],
    "services": [
      "Digital Marketing",
      "Website",
      "SEO"
    ],
    "region": "in",
    "description": "Amico Care Education Overseas is a full-service overseas education and work-visa consultancy, guiding aspirants through every step from language training to visa approval.",
    "highlights": [
      "Built a strong social media presence for student recruitment",
      "Ran targeted campaigns for IELTS & OET language programs",
      "Promoted work-visa services for the UK, Canada, and Gulf countries",
      "Designed and built amicocarellp.com for study, work, and immigration enquiries"
    ],
    "aboutPoints": [],
    "website": "https://amicocarellp.com/",
    "instagram": [
      {
        "label": "Instagram",
        "url": "https://www.instagram.com/amico_care/"
      }
    ],
    "logo": "/images/clients/amico-care-logo.png",
    "color": "#3D30D0",
    "initials": "AC"
  },
  {
    "slug": "aadhi-group",
    "name": "Aadhi Group Of Leaf And Spares",
    "industries": [
      "Automotive",
      "Heavy Vehicles"
    ],
    "services": [
      "Digital Marketing",
      "Website",
      "SEO"
    ],
    "region": "in",
    "description": "Aadhi Group Of Leaf And Spares is one of Kerala's leading heavy vehicle spare part suppliers, operating since 2020. A pioneer in mass distribution of leaf springs manufactured by JAMNA Auto Industries Ltd & Toyo Springs Ltd, they serve all major truck brands including Tata, Ashok Leyland, Mahindra, BharatBenz and more.",
    "highlights": [
      "Kerala-wide distribution network with outlets in Kochi, Muvattupuzha, Thodupuzha & Trivandrum",
      "Authorised distributor for JAMNA (JAI brand) & Toyo Springs — India's top leaf spring makers",
      "Led by Mr. Binu Paul, with 25+ years of automobile industry expertise",
      "6+ year digital partnership — our longest-running client",
      "Serves BharatBenz, Tata Prima, Mahindra Blazo, Ashok Leyland AVTR & more",
      "Offers up to 45-60 days credit facility for wholesale buyers"
    ],
    "aboutPoints": [
      {
        "label": "Founded",
        "value": "2020"
      },
      {
        "label": "Location",
        "value": "Kochi, Kerala"
      },
      {
        "label": "Speciality",
        "value": "Leaf Springs, Suspension & Heavy Vehicle Spares"
      },
      {
        "label": "Coverage",
        "value": "All Kerala Distribution"
      },
      {
        "label": "Brands Served",
        "value": "Tata, Leyland, BharatBenz, Mahindra, Avatar"
      }
    ],
    "website": "https://aadhileafs.com/",
    "instagram": [
      {
        "label": "Instagram",
        "url": "https://www.instagram.com/aadhigroupofleafandspares/"
      }
    ],
    "logo": "/images/clients/aadhi-group.png",
    "color": "#E7793A",
    "initials": "AG"
  },
  {
    "slug": "punja-leaf",
    "name": "Punja Leaf and Autospares",
    "industries": [
      "Automotive",
      "Heavy Vehicles"
    ],
    "services": [
      "Digital Marketing",
      "Website",
      "SEO"
    ],
    "region": "in",
    "description": "Punja Leaf and Autospares is the trusted sister brand of Aadhi Group, specialising in heavy and light vehicle repairs, leaf spring services and autospares across Kerala. Operating a 24x7 service model, Punja ensures trucks and commercial vehicles are always road-ready.",
    "highlights": [
      "24x7 service operation ensuring zero vehicle downtime for customers",
      "Specialises in leaf spring replacement and bogie repairs for heavy vehicles",
      "Sister brand of Aadhi Group — joint digital & SEO strategy for maximum reach",
      "Services BharatBenz, Tata, Mahindra, and all major commercial vehicle brands",
      "Strong local brand recognition in the Kerala spare parts market"
    ],
    "aboutPoints": [
      {
        "label": "Service Model",
        "value": "24x7 Operations"
      },
      {
        "label": "Speciality",
        "value": "Heavy & Light Vehicle Repairs, Leaf Springs"
      },
      {
        "label": "Coverage",
        "value": "All Kerala"
      },
      {
        "label": "Sister Brand",
        "value": "Aadhi Group Of Leaf And Spares"
      }
    ],
    "instagram": [
      {
        "label": "Instagram",
        "url": "https://www.instagram.com/punjaleafandautospares/"
      }
    ],
    "logo": "/images/clients/punja-leaf.png",
    "color": "#4E061A",
    "initials": "PL"
  },
  {
    "slug": "ceegees-dental",
    "name": "Ceegees Grace Dental Centre",
    "industries": [
      "Healthcare",
      "Dental"
    ],
    "services": [
      "Website"
    ],
    "region": "in",
    "description": "Ceegees Grace Dental Centre, located in Adoor, Kerala, has been delivering exceptional dental care since 1990. Founded by Dr. Susan Jacob — who also practiced dentistry in the UAE for over 20 years — the clinic was re-established in 2017 with a vision to blend global dental standards with the warmth of a hometown clinic.",
    "highlights": [
      "Established in 1990 — over 35 years of trusted dental care in Kerala",
      "Led by Dr. Susan Jacob, with 20+ years of international UAE practice experience",
      "Full-spectrum services: General Dentistry, Cosmetic, RCT, Implants & Orthodontics",
      "Team of 8 specialist doctors covering all dental disciplines",
      "Ethical practice — no hidden charges, transparent pricing for all treatments",
      "Child-friendly pediatric dentistry with habit-breaking appliances & sealants"
    ],
    "aboutPoints": [
      {
        "label": "Founded",
        "value": "1990 (Re-established 2017)"
      },
      {
        "label": "Location",
        "value": "Adoor, Kerala, India"
      },
      {
        "label": "Opening Hours",
        "value": "Mon to Sat, 9:00 AM – 6:00 PM"
      },
      {
        "label": "Contact",
        "value": "+91 4734276112"
      },
      {
        "label": "Specialities",
        "value": "General, Cosmetic, Pediatric, Implants, Orthodontics, RCT"
      }
    ],
    "website": "https://www.ceegeesdental.com/",
    "instagram": [],
    "logo": "/images/clients/ceegees-dental.png",
    "color": "#3BBFB0",
    "initials": "CG"
  },
  {
    "slug": "armor-coat-epoxy",
    "name": "Armor Coat Epoxy",
    "industries": [
      "Construction",
      "Flooring"
    ],
    "services": [
      "Digital Marketing"
    ],
    "region": "in",
    "description": "Armor Coat Epoxy is a specialist industrial and commercial epoxy flooring company delivering high-performance, durable, and aesthetically superior flooring solutions for warehouses, factories, garages, and commercial spaces across India.",
    "highlights": [
      "Specialists in industrial-grade epoxy flooring for commercial & warehouse spaces",
      "Premium finish solutions for garages, showrooms, and residential interiors",
      "Built a modern React-based website with stunning portfolio gallery",
      "Clear service showcases driving direct quote requests from B2B clients",
      "Known for durable, chemical-resistant, and low-maintenance floor coatings"
    ],
    "aboutPoints": [
      {
        "label": "Speciality",
        "value": "Epoxy Flooring — Industrial, Commercial & Residential"
      },
      {
        "label": "Website Tech",
        "value": "React-powered, modern portfolio site"
      },
      {
        "label": "Client Types",
        "value": "Warehouses, Factories, Showrooms, Garages"
      }
    ],
    "website": "https://www.armorcoat.in/",
    "instagram": [],
    "logo": "/images/clients/armor-coat-epoxy.png",
    "color": "#C0392B",
    "initials": "AC"
  },
  {
    "slug": "vajra-learning-centre",
    "name": "Vajra Learning Centre",
    "industries": [
      "Education",
      "Tutoring"
    ],
    "services": [
      "Website"
    ],
    "region": "in",
    "description": "Vajra Learning Centre — The Learning Ladder — is a dedicated educational institution empowering students to reach their full academic potential through structured tuition, coaching programmes, and skill-building initiatives.",
    "highlights": [
      "Structured coaching programmes for school and competitive exam students",
      "Built a strong local brand presence through targeted digital campaigns",
      "Promoted skill-building and academic excellence across key student segments"
    ],
    "aboutPoints": [],
    "instagram": [],
    "logo": "/images/clients/vajra-learning-centre.png",
    "color": "#1A237E",
    "initials": "VL"
  },
  {
    "slug": "kiv-tyres",
    "name": "KIV Tyres",
    "industries": [
      "Automotive",
      "Spare Parts"
    ],
    "services": [
      "Website"
    ],
    "region": "in",
    "description": "KIV Tyres is a specialist supplier of wheel barrow spare parts and tyres, offering a comprehensive range of replacement components for wheelbarrows and light industrial equipment.",
    "highlights": [
      "Developed a distinctive brand identity for the wheel barrow spare parts niche",
      "Targeted campaigns reaching construction and agricultural equipment buyers",
      "Built product awareness across B2B and B2C customer segments"
    ],
    "aboutPoints": [],
    "instagram": [],
    "logo": "/images/clients/kiv-tyres.png",
    "color": "#3A7A3A",
    "initials": "KT"
  },
  {
    "slug": "agha-and-co",
    "name": "Agha & Co",
    "industries": [
      "Legal",
      "Law Firm"
    ],
    "services": [
      "Website"
    ],
    "region": "in",
    "description": "Agha & Co is a specialist international law firm committed to excellence in the practice of law. The firm offers expert counsel on Islamic Law, Islamic Finance & Takaful, Saudi & UAE Law, Corporate & Commercial Law (M&A, JVs, franchises), Project Finance, Bankruptcy, Real Estate, and High Net Worth Estate Planning.",
    "highlights": [
      "Specialist counsel on Islamic Law, Islamic Finance & Takaful insurance",
      "Expert cross-border M&A, Joint Ventures, franchises & corporate restructuring",
      "Acts as on-the-ground counsel for large international law firms in UAE & Saudi Arabia",
      "Founded by Oliver Agha — a globally recognised Islamic Law practitioner",
      "Full-service firm covering litigation, real estate, bankruptcy & generational wealth planning"
    ],
    "aboutPoints": [
      {
        "label": "Founded by",
        "value": "Oliver Agha"
      },
      {
        "label": "Jurisdiction",
        "value": "UAE, Saudi Arabia & Cross-border International"
      },
      {
        "label": "Specialities",
        "value": "Islamic Law, Finance, Corporate M&A, Real Estate, Bankruptcy"
      },
      {
        "label": "Clients",
        "value": "International law firms, corporates & HNW individuals"
      }
    ],
    "website": "https://aghaandco.com/",
    "instagram": [],
    "logo": "/images/clients/agha-and-co.png",
    "color": "#9B7A2F",
    "initials": "A&"
  },
  {
    "slug": "skybridge-freight",
    "name": "Skybridge Freight Solutions LLC",
    "industries": [
      "Logistics",
      "Freight"
    ],
    "services": [
      "Website"
    ],
    "region": "ae",
    "description": "Skybridge Freight Solutions LLC is a leading UAE-based international logistics company incorporated in 2007. With over 100 experienced logistics personnel across 4 strategic offices in Dubai, Jebel Ali & Abu Dhabi, SFS provides a complete range of integrated supply chain solutions globally, with the motto \"Your Partner in Freight\".",
    "highlights": [
      "Incorporated in 2007 — over 17 years of international logistics excellence",
      "100+ logistics personnel across 4 offices in Dubai, Jebel Ali & Abu Dhabi",
      "Part of the prestigious Asyad Group — a leading logistics conglomerate",
      "Full logistics suite: Air, Sea, Land freight, Warehousing, Tank Container & Air Charter",
      "Handles dangerous goods, door-to-door delivery, and procurement services",
      "Serves Airliners, Hospital Groups, Oil Companies, Pharma & Telecom industries"
    ],
    "aboutPoints": [
      {
        "label": "Founded",
        "value": "2007"
      },
      {
        "label": "HQ",
        "value": "Dubai, UAE"
      },
      {
        "label": "Offices",
        "value": "Dubai, Jebel Ali & Abu Dhabi"
      },
      {
        "label": "Team",
        "value": "100+ logistics professionals"
      },
      {
        "label": "Group",
        "value": "Part of Asyad Group"
      },
      {
        "label": "Services",
        "value": "Air, Sea, Land, Warehouse, Dangerous Goods, Air Charter"
      }
    ],
    "website": "https://www.skybridgefreight.com/",
    "instagram": [],
    "logo": "/images/clients/skybridge-freight.png",
    "color": "#E55A1C",
    "initials": "SF"
  },
  {
    "slug": "al-thaliah",
    "name": "Al Thaliah Al Jadeeda",
    "industries": [
      "Oil & Gas",
      "Transportation"
    ],
    "services": [
      "Website"
    ],
    "region": "ae",
    "description": "Al Thaliah Al Jadeeda is a trusted transportation and logistics company operating in Oman, offering end-to-end flatbed truck rentals, pick-up & delivery, and personalised logistics solutions. They serve businesses requiring dependable movement of equipment, cargo, and oversized loads across the Sultanate.",
    "highlights": [
      "Flatbed truck rentals from 40 to 80 feet for all freight sizes",
      "Same-day, next-day & standard pick-up and delivery across Oman",
      "Customised logistics packages including crane, shovel & forklift assistance",
      "Road access permitting support for oversized and special cargo",
      "Competitive pricing with volume discounts and flexible payment options"
    ],
    "aboutPoints": [
      {
        "label": "Location",
        "value": "Sultanate of Oman"
      },
      {
        "label": "Truck Sizes",
        "value": "40ft, 60ft & 80ft Flatbed Fleet"
      },
      {
        "label": "Services",
        "value": "Truck Rental, Pickup & Delivery, Personalised Logistics"
      },
      {
        "label": "Contact",
        "value": "+968 95433841"
      }
    ],
    "website": "https://www.althaliahaljadeeda.com/",
    "instagram": [],
    "logo": "/images/clients/al-thaliah.png",
    "color": "#7B0A1E",
    "initials": "AT"
  },
  {
    "slug": "khazain-oil",
    "name": "Khazain Oil Field Transportation",
    "industries": [
      "Oil & Gas",
      "Transportation"
    ],
    "services": [
      "Website"
    ],
    "region": "ae",
    "description": "Khazain Oil Field Transportation is a trusted logistics company based in Muscat, Sultanate of Oman, providing top-notch flatbed truck rentals, pick-up & delivery, and personalised logistics services across the Sultanate. They specialise in moving equipment, cargo, and oversized loads with a skilled, dedicated workforce.",
    "highlights": [
      "Operating in Muscat & across the Sultanate of Oman",
      "Flatbed truck fleet: 40ft, 60ft & 80ft for all cargo types",
      "Same-day, next-day & standard delivery options available",
      "Personalised packages for urgent and time-sensitive shipments",
      "Assistance with cranes, shovels, forklifts & road access permits",
      "Skilled logistics workforce with expertise in complex transport challenges"
    ],
    "aboutPoints": [
      {
        "label": "C.R.",
        "value": "1475306"
      },
      {
        "label": "Address",
        "value": "P.O. Box 51, PC 111, Muscat, Oman"
      },
      {
        "label": "Contact",
        "value": "+968 95433841"
      },
      {
        "label": "Truck Sizes",
        "value": "40ft, 60ft & 80ft Flatbeds"
      },
      {
        "label": "Services",
        "value": "Truck Rental, Pickup & Delivery, Crane & Equipment Assistance"
      }
    ],
    "website": "https://khazainoilfieldtransportation.com/",
    "instagram": [],
    "logo": "/images/clients/khazain-oil.png",
    "color": "#1A3A6B",
    "initials": "KO"
  }
] as Client[];

export const FEATURED_CLIENTS = [
  "woodcastle-furniture",
  "mezmerix-builders",
  "amico-care-education",
  "skybridge-freight",
] as const;

export function getClient(slug: string) {
  return CLIENTS.find((client) => client.slug === slug);
}

export function clientsInRegion(region: RegionCode) {
  return CLIENTS.filter((client) => client.region === region);
}
