export interface Category {
    name: string;
    description: string;
    icon: string;
}

export const eventCategories: Category[] = [
    // Music & Entertainment
    {
        name: "Music & Concerts",
        description: "Live music performances, concerts, festivals, and music events",
        icon: "FaMusic"
    },
    {
        name: "Festivals",
        description: "Music festivals, cultural festivals, and multi-day celebrations",
        icon: "FaGlassCheers"
    },
    {
        name: "Nightlife & Parties",
        description: "Club events, DJ nights, parties, and nightlife entertainment",
        icon: "FaCocktail"
    },
    {
        name: "Comedy",
        description: "Stand-up comedy shows, comedy clubs, and humorous performances",
        icon: "FaTheaterMasks"
    },
    {
        name: "Theater & Performing Arts",
        description: "Theater productions, plays, musicals, and stage performances",
        icon: "FaMask"
    },
    {
        name: "Dance",
        description: "Dance performances, ballet, contemporary dance, and dance parties",
        icon: "FaRunning"
    },

    // Sports & Fitness
    {
        name: "Sports",
        description: "Sporting events, matches, tournaments, and athletic competitions",
        icon: "FaFootballBall"
    },
    {
        name: "Health & Wellness",
        description: "Yoga classes, fitness workshops, wellness retreats, and health seminars",
        icon: "FaHeartbeat"
    },
    {
        name: "Running & Walking",
        description: "Marathons, fun runs, charity walks, and running events",
        icon: "FaRunning"
    },

    // Arts & Culture
    {
        name: "Arts & Culture",
        description: "Art exhibitions, gallery openings, and cultural events",
        icon: "FaPalette"
    },
    {
        name: "Museums & Galleries",
        description: "Museum exhibitions, art gallery events, and cultural showcases",
        icon: "FaUniversity"
    },
    {
        name: "Photography",
        description: "Photography workshops, exhibitions, and photo walks",
        icon: "FaCamera"
    },
    {
        name: "Film & Media",
        description: "Film screenings, movie premieres, and media events",
        icon: "FaFilm"
    },

    // Food & Drink
    {
        name: "Food & Drink",
        description: "Food festivals, wine tastings, culinary events, and dining experiences",
        icon: "FaUtensils"
    },
    {
        name: "Wine & Beer Tasting",
        description: "Wine tastings, beer festivals, and beverage sampling events",
        icon: "FaWineGlass"
    },
    {
        name: "Cooking Classes",
        description: "Culinary workshops, cooking demonstrations, and food preparation classes",
        icon: "FaHatChef"
    },

    // Business & Professional
    {
        name: "Business & Networking",
        description: "Business conferences, networking events, and professional meetups",
        icon: "FaBriefcase"
    },
    {
        name: "Conferences",
        description: "Professional conferences, summits, and industry conventions",
        icon: "FaUsers"
    },
    {
        name: "Seminars & Workshops",
        description: "Educational seminars, skill-building workshops, and training sessions",
        icon: "FaChalkboardTeacher"
    },
    {
        name: "Career & Job Fairs",
        description: "Career fairs, job expos, and recruitment events",
        icon: "FaUserTie"
    },

    // Technology & Innovation
    {
        name: "Technology",
        description: "Tech conferences, hackathons, product launches, and innovation events",
        icon: "FaLaptopCode"
    },
    {
        name: "Gaming & Esports",
        description: "Gaming tournaments, esports competitions, and gaming conventions",
        icon: "FaGamepad"
    },
    {
        name: "Science & Innovation",
        description: "Scientific conferences, innovation showcases, and research presentations",
        icon: "FaFlask"
    },
    {
        name: "Startups & Entrepreneurship",
        description: "Startup events, pitch competitions, and entrepreneurship workshops",
        icon: "FaRocket"
    },

    // Education & Learning
    {
        name: "Education & Learning",
        description: "Educational events, lectures, and learning workshops",
        icon: "FaGraduationCap"
    },
    {
        name: "Literature & Books",
        description: "Book readings, author signings, literary festivals, and book clubs",
        icon: "FaBook"
    },
    {
        name: "Language & Culture",
        description: "Language learning events, cultural exchange programs, and heritage celebrations",
        icon: "FaGlobe"
    },

    // Community & Social
    {
        name: "Community & Social",
        description: "Community gatherings, social events, and local meetups",
        icon: "FaHandsHelping"
    },
    {
        name: "Charity & Fundraising",
        description: "Charity events, fundraisers, benefit concerts, and donation drives",
        icon: "FaHeart"
    },
    {
        name: "Religious & Spiritual",
        description: "Religious gatherings, spiritual retreats, and faith-based events",
        icon: "FaPrayingHands"
    },
    {
        name: "LGBTQ+",
        description: "Pride events, LGBTQ+ gatherings, and inclusive social events",
        icon: "FaHeart"
    },

    // Family & Kids
    {
        name: "Family & Kids",
        description: "Family-friendly events, children's activities, and parenting workshops",
        icon: "FaBaby"
    },
    {
        name: "Kids & Youth",
        description: "Youth programs, children's entertainment, and educational activities",
        icon: "FaChild"
    },
    {
        name: "Parenting",
        description: "Parenting workshops, family support groups, and childcare seminars",
        icon: "FaHome"
    },

    // Travel & Outdoor
    {
        name: "Travel & Outdoor",
        description: "Travel expos, outdoor adventures, hiking trips, and exploration events",
        icon: "FaHiking"
    },
    {
        name: "Adventure & Outdoor",
        description: "Adventure sports, camping events, and outdoor activities",
        icon: "FaMountain"
    },
    {
        name: "Nature & Environment",
        description: "Environmental events, nature walks, conservation programs, and eco-friendly activities",
        icon: "FaLeaf"
    },

    // Fashion & Beauty
    {
        name: "Fashion & Beauty",
        description: "Fashion shows, beauty expos, style workshops, and makeup events",
        icon: "FaTshirt"
    },
    {
        name: "Wedding & Bridal",
        description: "Wedding expos, bridal shows, and marriage-related events",
        icon: "FaRing"
    },

    // Automotive & Transportation
    {
        name: "Automotive",
        description: "Car shows, auto expos, racing events, and vehicle exhibitions",
        icon: "FaCar"
    },

    // Home & Lifestyle
    {
        name: "Home & Garden",
        description: "Home improvement shows, garden expos, and interior design events",
        icon: "FaHome"
    },
    {
        name: "Crafts & DIY",
        description: "Craft fairs, DIY workshops, maker events, and handmade markets",
        icon: "FaPaintBrush"
    },
    {
        name: "Pets & Animals",
        description: "Pet shows, animal adoption events, and pet care workshops",
        icon: "FaDog"
    },

    // Hobbies & Special Interest
    {
        name: "Hobbies & Special Interest",
        description: "Hobby clubs, special interest groups, and enthusiast meetups",
        icon: "FaPuzzlePiece"
    },
    {
        name: "Collectibles & Antiques",
        description: "Antique shows, collectible fairs, and vintage markets",
        icon: "FaGem"
    },

    // Government & Politics
    {
        name: "Government & Politics",
        description: "Political rallies, town halls, civic engagement events, and public forums",
        icon: "FaLandmark"
    },

    // Seasonal & Holiday
    {
        name: "Seasonal & Holiday",
        description: "Holiday celebrations, seasonal festivals, and special occasion events",
        icon: "FaGift"
    },
    {
        name: "Christmas & Winter",
        description: "Christmas markets, winter festivals, and holiday celebrations",
        icon: "FaSnowflake"
    },
    {
        name: "Halloween",
        description: "Halloween parties, haunted houses, and costume events",
        icon: "FaGhost"
    },

    // Other
    {
        name: "Other",
        description: "Events that don't fit into standard categories",
        icon: "FaEllipsisH"
    }
];