export type Language = 'hu' | 'en';

export interface HeroLook {
  id: string;
  number: string;
  title: { hu: string; en: string };
  category: { hu: string; en: string };
  image: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  alt: { hu: string; en: string };
}

export interface GalleryRow {
  id: string;
  index: string;
  title: { hu: string; en: string };
  subtitle: { hu: string; en: string };
  images: GalleryImage[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: { hu: string; en: string };
  rating: number;
  text: { hu: string; en: string };
  avatar: string;
  googleMapsUrl: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: 'facebook' | 'instagram' | 'tiktok' | 'messenger' | 'maps';
}

export interface SiteData {
  brand: {
    name: string;
    wordmark: string;
    submark: string;
    tagline: { hu: string; en: string };
    city: string;
    address: string;
    phone: string;
    phoneFormatted: string;
    email: string;
    googleRating: number;
    reviewCount: number;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    hours: {
      days: { hu: string; en: string };
      saturday: { hu: string; en: string };
      sunday: { hu: string; en: string };
    };
  };
  social: SocialLink[];
  navigation: {
    links: Array<{
      id: string;
      href: string;
      label: { hu: string; en: string };
    }>;
    cta: { hu: string; en: string };
  };
  hero: {
    heading: { hu: string; en: string };
    subheading: { hu: string; en: string };
    primaryCta: { hu: string; en: string };
    secondaryCta: { hu: string; en: string };
    looks: HeroLook[];
  };
  about: {
    title: { hu: string; en: string };
    subtitle: { hu: string; en: string };
    story: { hu: string; en: string }[];
    features: Array<{
      title: { hu: string; en: string };
      description: { hu: string; en: string };
    }>;
    stats: Array<{
      value: string;
      label: { hu: string; en: string };
    }>;
    manifesto: Array<{
      id: string;
      statement: { hu: string; en: string };
    }>;
  };
  gallery: {
    title: { hu: string; en: string };
    subtitle: { hu: string; en: string };
    rows: GalleryRow[];
  };
  reviews: {
    title: { hu: string; en: string };
    subtitle: { hu: string; en: string };
    googleRatingBadge: { hu: string; en: string };
    directReviewCta: { hu: string; en: string };
    items: ReviewItem[];
  };
  contact: {
    title: { hu: string; en: string };
    subtitle: { hu: string; en: string };
    addressLabel: { hu: string; en: string };
    hoursLabel: { hu: string; en: string };
    phoneLabel: { hu: string; en: string };
    callCta: { hu: string; en: string };
    mapsCta: { hu: string; en: string };
    boutiqueNotice: { hu: string; en: string };
  };
  footer: {
    brandDescription: { hu: string; en: string };
    rightsReserved: { hu: string; en: string };
    ebroloNotice: { hu: string; en: string };
    ebroloUrl: string;
  };
}

export const siteData: SiteData = {
  brand: {
    name: "Grácia Divat",
    wordmark: "GRÁCIA",
    submark: "NŐI DIVAT • NYÍREGYHÁZA",
    tagline: {
      hu: "Az Időtlen Elegancia és Nőiesség Művészete",
      en: "The Art of Timeless Elegance & Feminine Poise"
    },
    city: "Nyíregyháza",
    address: "4400 Nyíregyháza, Luther utca 5.",
    phone: "+36707200730",
    phoneFormatted: "+36 70 720 0730",
    email: "kapcsolat@graciadivat.hu",
    googleRating: 4.7,
    reviewCount: 48,
    googleMapsUrl: "https://maps.app.goo.gl/HvarGShXKf9AT5Nq8",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Gr%C3%A1cia+Divat+Ny%C3%ADregyh%C3%A1za+Luther+utca+5&t=&z=16&ie=UTF8&iwloc=&output=embed",
    hours: {
      days: {
        hu: "Hétfő – Péntek: 10:00 – 17:00",
        en: "Monday – Friday: 10:00 – 17:00"
      },
      saturday: {
        hu: "Szombat: 10:00 – 13:00",
        en: "Saturday: 10:00 – 13:00"
      },
      sunday: {
        hu: "Vasárnap: Zárva",
        en: "Sunday: Closed"
      }
    }
  },
  social: [
    {
      id: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/GraciaDivatNyiregyhaza",
      icon: "facebook"
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/graciadivatnyiregyhaza/",
      icon: "instagram"
    },
    {
      id: "tiktok",
      name: "TikTok",
      url: "https://www.tiktok.com/@graciadivatnyiregyhaza",
      icon: "tiktok"
    },
    {
      id: "messenger",
      name: "Messenger",
      url: "https://m.me/GraciaDivatNyiregyhaza",
      icon: "messenger"
    },
    {
      id: "maps",
      name: "Google Maps",
      url: "https://maps.app.goo.gl/HvarGShXKf9AT5Nq8",
      icon: "maps"
    }
  ],
  navigation: {
    links: [
      { id: "hero", href: "#hero", label: { hu: "Kezdőlap", en: "Home" } },
      { id: "about", href: "#about", label: { hu: "A Grácia Világa", en: "Our Story" } },
      { id: "gallery", href: "#gallery", label: { hu: "Kollekció & Galéria", en: "Collection & Gallery" } },
      { id: "reviews", href: "#reviews", label: { hu: "Vélemények", en: "Reviews" } },
      { id: "contact", href: "#contact", label: { hu: "Üzletünk", en: "Boutique" } },
    ],
    cta: {
      hu: "Időpont & Hívás",
      en: "Call & Booking"
    }
  },
  hero: {
    heading: {
      hu: "Exkluzív alkalmi és estélyi ruhák a felejthetetlen pillanatokhoz.",
      en: "Exquisite occasion wear and evening gowns for life's defining moments."
    },
    subheading: {
      hu: "Nyíregyháza szívében található szalonunkban prémium minőségű estélyi, bál- és alkalmi ruhákkal várjuk a különleges pillanatokra készülő hölgyeket.",
      en: "Located in the heart of Nyíregyháza, our boutique welcomes women with exquisite evening gowns, prom dresses, and refined occasion wear."
    },
    primaryCta: {
      hu: "Kollekció",
      en: "Collection"
    },
    secondaryCta: {
      hu: "Itt találsz minket",
      en: "Find Us Here"
    },
    looks: [
      {
        id: "look-01",
        number: "01",
        title: {
          hu: "Éjfekete Szatén Estélyi",
          en: "Midnight Satin Evening Gown"
        },
        category: {
          hu: "Haute Gala & Estélyi",
          en: "Haute Gala & Evening"
        },
        image: "/images/hero/hero_look_01_black_satin.jpg"
      },
      {
        id: "look-02",
        number: "02",
        title: {
          hu: "Babarózsaszín Csipkés Báliruha",
          en: "Blush Pink Lace Ballgown"
        },
        category: {
          hu: "Bál & Szalagavató",
          en: "Prom & Grand Ball"
        },
        image: "/images/hero/hero_look_02_pink_lace.jpg"
      },
      {
        id: "look-03",
        number: "03",
        title: {
          hu: "Periwinkle Kék Jacquard Ruha",
          en: "Periwinkle Jacquard Dress"
        },
        category: {
          hu: "Koktél & Elegáns Események",
          en: "Cocktail & Day Soirée"
        },
        image: "/images/hero/hero_look_03_periwinkle_blue.jpg"
      },
      {
        id: "look-04",
        number: "04",
        title: {
          hu: "Csillogó Éjkék Flitteres Szett",
          en: "Midnight Navy Sequin Ensemble"
        },
        category: {
          hu: "Party & Koktél Estély",
          en: "Party & Cocktail Glamour"
        },
        image: "/images/hero/hero_look_04_navy_sequin.jpg"
      },
      {
        id: "look-05",
        number: "05",
        title: {
          hu: "Menta-Türkiz Infinity Estélyi",
          en: "Mint Turquoise Infinity Maxi"
        },
        category: {
          hu: "Koszorúslány & Nyári Bál",
          en: "Bridesmaid & Summer Gala"
        },
        image: "/images/hero/hero_look_05_mint_turquoise.jpg"
      },
      {
        id: "look-06",
        number: "06",
        title: {
          hu: "Mályvaszínű Virágos Selyemruha",
          en: "Mauve Lilac Floral Silk Midi"
        },
        category: {
          hu: "Elegáns Hétköznapok & Családi Ünnep",
          en: "Refined Daywear & Family Occasions"
        },
        image: "/images/hero/hero_look_06_mauve_floral.jpg"
      },
      {
        id: "look-07",
        number: "07",
        title: {
          hu: "Metál Bronz & Fekete Tüllruha",
          en: "Bronze Metallic & Black Tulle"
        },
        category: {
          hu: "Koktél & Szalagavató Party",
          en: "Cocktail & After-Party"
        },
        image: "/images/hero/hero_look_07_bronze_tulle.jpg"
      }
    ]
  },
  about: {
    title: {
      hu: "A stílus, ami kiemeli az egyéniségedet.",
      en: "Style curated to celebrate your individuality."
    },
    subtitle: {
      hu: "Nyíregyháza kedvenc női divatszalonja a Luther utcában már évek óta a megbízhatóság, a szakértelem és a női ragyogás szimbóluma.",
      en: "Located on Luther Street in Nyíregyháza, our salon has long stood for warm hospitality, personalized styling, and impeccable taste."
    },
    story: [
      {
        hu: "Hisszük, hogy a tökéletes ruha nem csupán egy darab textil: egy olyan élmény, amely önbizalmat ad, emlékezetessé teszi az esküvőket, bálokat, szalagavatókat és az élet nagy pillanatait.",
        en: "We believe the perfect gown is never just fabric: it is an empowering experience that brings confidence and unforgettable grace to weddings, galas, and life's defining milestones."
      },
      {
        hu: "Szalonunkban kiemelt figyelmet fordítunk a személyes, barátságos kiszolgálásra. Nálunk nincs sietség: időt szánunk rád, segítünk megtalálni az alkatodhoz és a személyiségedhez legtökéletesebben illeszkedő darabot, és szükség esetén a pontos méretre igazításban is támogatunk.",
        en: "In our boutique, personal attention and heartfelt care come first. We take the time to listen, find the exact cut matching your silhouette, and ensure a flawless fitting."
      }
    ],
    features: [
      {
        title: {
          hu: "Személyre Szabott Tanácsadás",
          en: "Bespoke Personal Styling"
        },
        description: {
          hu: "Segítőkész eladóink évtizedes szakértelmével támogatjuk, hogy a legragyogóbb önmagadat lásd a tükörben.",
          en: "Our experienced stylists help you find the design and color palette that truly enhances your radiance."
        }
      },
      {
        title: {
          hu: "Széles Méret- és Fazonválaszték",
          en: "Inclusive Sizing & Cuts"
        },
        description: {
          hu: "Minden korosztálynak és testalkatnak kínálunk elegáns, kényelmes és modern vonalvezetésű darabokat.",
          en: "Flattering silhouettes tailored for all generations, body types, and style preferences."
        }
      },
      {
        title: {
          hu: "Kiváló Ár-Érték Arány",
          en: "Exceptional Value & Quality"
        },
        description: {
          hu: "Prémium anyagok, tartós varrások és korrekt, elérhető árak kompromisszumok nélkül.",
          en: "High-grade fabrics, meticulous seams, and fair, transparent pricing without compromise."
        }
      }
    ],
    stats: [
      { value: "4.7 ★", label: { hu: "Kiváló Google Értékelés", en: "Top Google Rating" } },
      { value: "100+", label: { hu: "Készleten lévő prémium modell", en: "Curated in-store styles" } },
      { value: "100%", label: { hu: "Személyes odafigyelés és elégedettség", en: "Personal attention & care" } }
    ],
    manifesto: [
      {
        id: "m-01",
        statement: {
          hu: "Időt szánunk rád.",
          en: "Time dedicated exclusively to you."
        }
      },
      {
        id: "m-02",
        statement: {
          hu: "Minden nőnek, minden alkatra.",
          en: "For every woman, every silhouette."
        }
      },
      {
        id: "m-03",
        statement: {
          hu: "A felejthetetlen pillanatokért.",
          en: "Crafted for defining moments."
        }
      }
    ]
  },
  gallery: {
    title: {
      hu: "Kollekció & Galéria",
      en: "Collection & Gallery"
    },
    subtitle: {
      hu: "Tematikus válogatás legszebb estélyi, bál- és alkalmi modelljeinkből.",
      en: "A curated thematic portfolio of our finest evening, gala, and occasion wear."
    },
    rows: [
      {
        id: "row-6",
        index: "01",
        title: {
          hu: "Kollekció I.",
          en: "Collection I."
        },
        subtitle: {
          hu: "Kiemelt alkalmi és estélyi modellek.",
          en: "Featured occasion and evening gowns."
        },
        images: [
          {
            id: "r6-01",
            image: "/images/collection/6/741057256_1314118017552590_6206954150318605089_n.jfif",
            alt: { hu: "Virágmintás Harangruha", en: "Floral Midi Flare Dress" }
          },
          {
            id: "r6-02",
            image: "/images/collection/6/833924812_1412802301048658_4448948886660855242_n.jpg",
            alt: { hu: "Virágmintás Szatén Ruha", en: "Floral Satin Dress" }
          },
          {
            id: "r6-03",
            image: "/images/collection/6/834558539_1415577694104452_474404347899923378_n.jpg",
            alt: { hu: "Fényűző Bronz Szett", en: "Metallic Bronze Dress" }
          },
          {
            id: "r6-04",
            image: "/images/collection/6/836834662_1966847680651621_3458698954409468148_n.jfif",
            alt: { hu: "Kék Elegáns Női Szett", en: "Blue Elegance Ensemble" }
          },
          {
            id: "r6-05",
            image: "/images/collection/6/838715630_1415577724104449_3135148315910702048_n.jpg",
            alt: { hu: "Mályva Elegáns Ruha", en: "Magenta Elegant Dress" }
          },
          {
            id: "r6-06",
            image: "/images/collection/6/838951208_1415577687437786_4421182400951265603_n.jpg",
            alt: { hu: "Smaragdzöld Pliszírozott Ruha", en: "Emerald Pleated Dress" }
          },
          {
            id: "r6-07",
            image: "/images/collection/6/846052718_1422651810063707_4188965941198480815_n.jpg",
            alt: { hu: "Fekete Virágmintás Estélyi", en: "Black Floral Print Gown" }
          },
          {
            id: "r6-08",
            image: "/images/collection/6/848120277_1423642873297934_6365161787390287986_n.jpg",
            alt: { hu: "Vörös Szatén Estélyi", en: "Scarlet Satin Evening Gown" }
          },
          {
            id: "r6-09",
            image: "/images/collection/6/851548569_1423642989964589_505224681949788514_n.jpg",
            alt: { hu: "Csillogó Türkizkék Estélyi", en: "Glitter Teal Slit Gown" }
          }
        ]
      },
      {
        id: "row-3",
        index: "02",
        title: {
          hu: "Kollekció II.",
          en: "Collection II."
        },
        subtitle: {
          hu: "Finom vonalvezetés és exkluzív textúrák.",
          en: "Delicate silhouettes and exclusive textures."
        },
        images: [
          {
            id: "r3-01",
            image: "/images/collection/3/738438716_1336582418670647_6804799894639391131_n.jpg",
            alt: { hu: "Elegáns Alkalmi Modell 01", en: "Elegant Occasion Wear 01" }
          },
          {
            id: "r3-02",
            image: "/images/collection/3/738774554_1336582445337311_6726397191424147470_n.jpg",
            alt: { hu: "Elegáns Alkalmi Modell 02", en: "Elegant Occasion Wear 02" }
          },
          {
            id: "r3-03",
            image: "/images/collection/3/739471319_1336582425337313_3751572027920951438_n.jpg",
            alt: { hu: "Elegáns Alkalmi Modell 03", en: "Elegant Occasion Wear 03" }
          },
          {
            id: "r3-04",
            image: "/images/collection/3/764986939_1362833419378880_56585387296035392_n.jpg",
            alt: { hu: "Elegáns Alkalmi Modell 04", en: "Elegant Occasion Wear 04" }
          },
          {
            id: "r3-05",
            image: "/images/collection/3/765671623_1362833386045550_4588599438691583262_n.jpg",
            alt: { hu: "Elegáns Alkalmi Modell 05", en: "Elegant Occasion Wear 05" }
          },
          {
            id: "r3-06",
            image: "/images/collection/3/767268792_1362833392712216_6431585493090361046_n.jpg",
            alt: { hu: "Elegáns Alkalmi Modell 06", en: "Elegant Occasion Wear 06" }
          }
        ]
      },
      {
        id: "row-4",
        index: "03",
        title: {
          hu: "Kollekció III.",
          en: "Collection III."
        },
        subtitle: {
          hu: "Különleges részletek és kiegészítők.",
          en: "Distinctive details and accessories."
        },
        images: [
          {
            id: "r4-01",
            image: "/images/collection/4/772780064_1369281298734092_6625166089332599979_n.jpg",
            alt: { hu: "Fekete Gyöngyös Szandál", en: "Black Pearl Sandal" }
          },
          {
            id: "r4-02",
            image: "/images/collection/4/772866753_1369281075400781_1861220863227184162_n.jpg",
            alt: { hu: "Klasszikus Fehér Körömcipő", en: "Classic Ivory Pump" }
          },
          {
            id: "r4-03",
            image: "/images/collection/4/772891560_1369281225400766_1712320426336916002_n.jpg",
            alt: { hu: "Elegáns Modell 03", en: "Elegant Occasion Model 03" }
          },
          {
            id: "r4-04",
            image: "/images/collection/4/772989161_1369281242067431_6190624441311091662_n.jpg",
            alt: { hu: "Elegáns Modell 04", en: "Elegant Occasion Model 04" }
          },
          {
            id: "r4-05",
            image: "/images/collection/4/773158787_1369281122067443_5066095536113681747_n.jpg",
            alt: { hu: "Elegáns Modell 05", en: "Elegant Occasion Model 05" }
          },
          {
            id: "r4-06",
            image: "/images/collection/4/773280612_1369281155400773_9076531457090771858_n.jpg",
            alt: { hu: "Elegáns Modell 06", en: "Elegant Occasion Model 06" }
          },
          {
            id: "r4-07",
            image: "/images/collection/4/773360003_1369281372067418_860179072031276025_n.jpg",
            alt: { hu: "Elegáns Modell 07", en: "Elegant Occasion Model 07" }
          },
          {
            id: "r4-08",
            image: "/images/collection/4/773416627_1369281208734101_6832329299627285421_n.jpg",
            alt: { hu: "Elegáns Modell 08", en: "Elegant Occasion Model 08" }
          },
          {
            id: "r4-09",
            image: "/images/collection/4/773469449_1369281395400749_6963962716000551410_n.jpg",
            alt: { hu: "Elegáns Modell 09", en: "Elegant Occasion Model 09" }
          },
          {
            id: "r4-10",
            image: "/images/collection/4/773492117_1369281352067420_2191698562112289554_n.jpg",
            alt: { hu: "Elegáns Modell 10", en: "Elegant Occasion Model 10" }
          },
          {
            id: "r4-11",
            image: "/images/collection/4/773492880_1369281128734109_6124072338953982358_n.jpg",
            alt: { hu: "Elegáns Modell 11", en: "Elegant Occasion Model 11" }
          },
          {
            id: "r4-12",
            image: "/images/collection/4/773511018_1369281262067429_8409285711334904129_n.jpg",
            alt: { hu: "Elegáns Modell 12", en: "Elegant Occasion Model 12" }
          },
          {
            id: "r4-13",
            image: "/images/collection/4/773532794_1369281092067446_6628288313400481200_n.jpg",
            alt: { hu: "Elegáns Modell 13", en: "Elegant Occasion Model 13" }
          },
          {
            id: "r4-14",
            image: "/images/collection/4/773572696_1369281312067424_1100337498615542986_n.jpg",
            alt: { hu: "Elegáns Modell 14", en: "Elegant Occasion Model 14" }
          },
          {
            id: "r4-15",
            image: "/images/collection/4/773612949_1369281322067423_9141850234535979773_n.jpg",
            alt: { hu: "Elegáns Modell 15", en: "Elegant Occasion Model 15" }
          },
          {
            id: "r4-16",
            image: "/images/collection/4/774836353_1369281182067437_6151167995826237327_n.jpg",
            alt: { hu: "Elegáns Modell 16", en: "Elegant Occasion Model 16" }
          },
          {
            id: "r4-17",
            image: "/images/collection/4/816230016_1403363331992555_6269626696262063809_n.jpg",
            alt: { hu: "Fekete Bőr Magassarkú", en: "Black Leather High Heel" }
          },
          {
            id: "r4-18",
            image: "/images/collection/4/816996727_1403363288659226_6468888984598985857_n.jpg",
            alt: { hu: "Elegáns Cipő Modell 18", en: "Elegant Shoe 18" }
          },
          {
            id: "r4-19",
            image: "/images/collection/4/820936066_1403363285325893_3480505287883635283_n.jpg",
            alt: { hu: "Nude Elegáns Szaloncipő", en: "Nude Classic Salon Pump" }
          }
        ]
      },
      {
        id: "row-1",
        index: "04",
        title: {
          hu: "Kollekció IV.",
          en: "Collection IV."
        },
        subtitle: {
          hu: "Modern szabásvonalak és nadrágos szettek.",
          en: "Modern tailoring and pant ensembles."
        },
        images: [
          {
            id: "r1-01",
            image: "/images/collection/1/851449556_2180139079294050_2187199779299368370_n.jfif",
            alt: { hu: "Elegáns Női Szett 01", en: "Tailored Ensemble 01" }
          },
          {
            id: "r1-02",
            image: "/images/collection/1/852866524_2584129825384746_6855695258300463824_n.jfif",
            alt: { hu: "Elegáns Női Szett 02", en: "Tailored Ensemble 02" }
          },
          {
            id: "r1-03",
            image: "/images/collection/1/853048737_1117756923967583_8316222125862662749_n.jfif",
            alt: { hu: "Elegáns Női Szett 03", en: "Tailored Ensemble 03" }
          },
          {
            id: "r1-04",
            image: "/images/collection/1/853441483_1635254831633454_8098601985054324618_n.jfif",
            alt: { hu: "Elegáns Női Szett 04", en: "Tailored Ensemble 04" }
          },
          {
            id: "r1-05",
            image: "/images/collection/1/853996298_1134548322411143_1489055073668173400_n.jfif",
            alt: { hu: "Elegáns Női Szett 05", en: "Tailored Ensemble 05" }
          },
          {
            id: "r1-06",
            image: "/images/collection/1/854526440_1774865563775595_7030894026684921405_n.jfif",
            alt: { hu: "Elegáns Női Szett 06", en: "Tailored Ensemble 06" }
          },
          {
            id: "r1-07",
            image: "/images/collection/1/855003341_2850733058643476_3287402026116996215_n.jfif",
            alt: { hu: "Elegáns Női Szett 07", en: "Tailored Ensemble 07" }
          }
        ]
      },
      {
        id: "row-2",
        index: "05",
        title: {
          hu: "Kollekció V.",
          en: "Collection V."
        },
        subtitle: {
          hu: "Exkluzív szalonkreációk.",
          en: "Exclusive boutique creations."
        },
        images: [
          {
            id: "r2-01",
            image: "/images/collection/2/729275416_1328006306194925_3975141558700521203_n.jpg",
            alt: { hu: "Alkalmi Modell 01", en: "Occasion Model 01" }
          },
          {
            id: "r2-02",
            image: "/images/collection/2/730313783_1328006332861589_9038507053467881505_n.jpg",
            alt: { hu: "Alkalmi Modell 02", en: "Occasion Model 02" }
          },
          {
            id: "r2-03",
            image: "/images/collection/2/730331502_1328006339528255_4396784083072822906_n.jpg",
            alt: { hu: "Alkalmi Modell 03", en: "Occasion Model 03" }
          },
          {
            id: "r2-04",
            image: "/images/collection/2/731195683_1328006309528258_4831822428365916020_n.jpg",
            alt: { hu: "Alkalmi Modell 04", en: "Occasion Model 04" }
          }
        ]
      },
      {
        id: "row-5",
        index: "06",
        title: {
          hu: "Kollekció VI.",
          en: "Collection VI."
        },
        subtitle: {
          hu: "Alkalmi kiegészítők és táskák.",
          en: "Occasion accessories and handbags."
        },
        images: [
          {
            id: "r5-01",
            image: "/images/collection/5/797419421_1402225415439680_1226322458955015171_n.jpg",
            alt: { hu: "Elegáns Táska 01", en: "Evening Clutch 01" }
          },
          {
            id: "r5-02",
            image: "/images/collection/5/797481556_1402225405439681_2284183946296377710_n.jpg",
            alt: { hu: "Elegáns Táska 02", en: "Evening Clutch 02" }
          },
          {
            id: "r5-03",
            image: "/images/collection/5/799251162_1402225355439686_7826672594281441357_n.jpg",
            alt: { hu: "Elegáns Táska 03", en: "Evening Clutch 03" }
          },
          {
            id: "r5-04",
            image: "/images/collection/5/816989867_1402225368773018_4053652485973110603_n.jpg",
            alt: { hu: "Elegáns Táska 04", en: "Evening Clutch 04" }
          }
        ]
      }
    ]
  },
  reviews: {
    title: {
      hu: "Vélemények",
      en: "Reviews"
    },
    subtitle: {
      hu: "Vásárlóink és látogatóink értékelései.",
      en: "Authentic reviews from our clients and visitors."
    },
    googleRatingBadge: {
      hu: "4,7",
      en: "4.7"
    },
    directReviewCta: {
      hu: "További értékelések",
      en: "More Reviews"
    },
    items: [
      {
        id: "rev-01",
        author: "Nikolett Kovács",
        role: { hu: "Helyi Vásárló • Nyíregyháza", en: "Local Client • Nyíregyháza" },
        rating: 5,
        text: {
          hu: "Kedvenc ruházati üzletem Nyíregyházán. 😍 Ha alkalmi ruha, akkor csak itt vásárolok, mert: Csodás darabok vannak és nagyon kedves, segítőkész kiszolgálás. Ezúton is köszönöm! 🤗",
          en: "My favorite clothing store in Nyíregyháza. For occasion wear, this is the only place I shop: magnificent pieces and truly heartwarming, helpful service!"
        },
        avatar: "/images/reviews/nikolettkovacs.png",
        googleMapsUrl: "https://maps.app.goo.gl/ZsGUsDFyntgYq5n89"
      },
      {
        id: "rev-02",
        author: "Regina Kovács",
        role: { hu: "Visszatérő Vásárló", en: "Returning Client" },
        rating: 5,
        text: {
          hu: "Nagyon elégedett vagyok ezzel az üzlettel! Az üzlet rendezett, tiszta és átlátható, a választék tényleg széles – minden korosztálynak és stílusnak találni valamit. A kiszolgálás rendkívül kedves és segítőkész, minden kérdésemre mosolyogva válaszoltak. Bankkártyával gond nélkül tudtam fizetni, sőt, egy másik méretre történő csere is gyorsan és problémamentesen zajlott. A ruhák minősége kifogástalan, az árak is korrektek. Ritka manapság ilyen korrekt és ügyfélbarát bolt, öröm itt vásárolni!",
          en: "Extremely pleased with this boutique! The shop is spotless, organized, and the selection is genuinely wide for every age. The staff is wonderfully welcoming, size exchange was seamless, and the quality is flawless at fair prices. Truly a joy to shop here!"
        },
        avatar: "/images/reviews/reginakovacs.png",
        googleMapsUrl: "https://maps.app.goo.gl/1cZgbLFUWb3yRwyG6"
      },
      {
        id: "rev-03",
        author: "Bernadett Horn",
        role: { hu: "Alkalmi Ruha Vásárló", en: "Occasion Wear Client" },
        rating: 5,
        text: {
          hu: "Szuper kiszolgálás, kedves eladó, és gyönyörű ruhák! Köszönöm ezt a vásárlási élményt! ❤️🥰 A ruha amit vettem, több mint tökéletes.",
          en: "Superb service, delightful sales assistance, and gorgeous dresses! Thank you for this shopping experience: the gown I chose is beyond perfect."
        },
        avatar: "/images/reviews/bernadetthorn.png",
        googleMapsUrl: "https://maps.app.goo.gl/E8BU77TVccHRAmC96"
      },
      {
        id: "rev-04",
        author: "Ibolya Csengeriné Fekete",
        role: { hu: "Rendszeres Vásárló", en: "Loyal Regular" },
        rating: 5,
        text: {
          hu: "Mindig ebben az üzletben vásárolok alkalmi ruhát, mert egyszerűen verhetetlen a választék! Gyönyörű, minőségi darabok közül lehet válogatni, minden alkalomra találok valami különlegeset. A ruhák stílusosak és elegánsak, mindig kapok rengeteg dicséretet, amikor innen választott darabban jelenek meg. Az üzlet hangulata is nagyon kellemes, öröm itt vásárolni. Csak ajánlani tudom mindenkinek, aki igazán szép alkalmi ruhát keres!",
          en: "I always shop here for occasion wear because the selection is simply unbeatable! Always special, stylish, and elegant — I receive countless compliments whenever I wear a piece from Grácia. Warm atmosphere and pure joy!"
        },
        avatar: "/images/reviews/ibolya.png",
        googleMapsUrl: "https://maps.app.goo.gl/G3EBP8xSQQNdbZbL7"
      },
      {
        id: "rev-05",
        author: "Dóra Csengeri",
        role: { hu: "Törzsvásárló", en: "Long-standing Client" },
        rating: 5,
        text: {
          hu: "Fantasztikus üzlet, rendszeres vásárló vagyok. A ruhák mindig gyönyörűek, tökéletesek, hibátlanok. Az eladók kedvesek, segítőkészek, figyelmesen meghallgatják, mire van szükségem, és mindig remek tanácsokat adnak. Sose volt semmi gond. Szívből ajánlom mindenkinek, aki szereti a nőies, igényes és trendi ruhákat! Megbízható, jól működő üzlet!",
          en: "Fantastic boutique, I am a loyal customer. The dresses are always gorgeous and flawless. The staff listens with genuine care and offers outstanding styling advice. Highly recommended for any woman seeking feminine elegance!"
        },
        avatar: "/images/reviews/doracsengeri.png",
        googleMapsUrl: "https://maps.app.goo.gl/sNqrGnvQppBwh7Yk9"
      }
    ]
  },
  contact: {
    title: {
      hu: "Várunk szeretettel Nyíregyházán.",
      en: "We look forward to welcoming you."
    },
    subtitle: {
      hu: "Találd meg álmaid ruháját kényelmes, barátságos környezetben, szakértő segítségünkkel.",
      en: "Find your dream dress in a warm, welcoming boutique with personalized expert styling."
    },
    addressLabel: {
      hu: "Cím",
      en: "Address"
    },
    hoursLabel: {
      hu: "Nyitvatartás",
      en: "Opening Hours"
    },
    phoneLabel: {
      hu: "Telefonszám",
      en: "Phone Number"
    },
    callCta: {
      hu: "HÍVÁS",
      en: "CALL"
    },
    mapsCta: {
      hu: "ÚTVONALTERVEZÉS",
      en: "DIRECTIONS"
    },
    boutiqueNotice: {
      hu: "Próbára előzetes bejelentkezés nem kötelező, de alkalmi ruhák kiválasztásához javasoljuk, hogy szánj rá elegendő időt!",
      en: "Appointments are not strictly required, but for occasion fittings we encourage taking ample relaxed time to explore!"
    }
  },
  footer: {
    brandDescription: {
      hu: "Grácia Női Divatárú — Exkluzív alkalmi, estélyi és báliruhák Nyíregyháza szívében, a Luther utcában. Nőiesség, stílus és személyre szabott gondoskodás minden vendégünknek.",
      en: "Grácia Women's Fashion — Exclusive evening, gala, and prom dresses in the heart of Nyíregyháza on Luther Street. Feminine grace, bespoke attention, and timeless beauty."
    },
    rightsReserved: {
      hu: "Minden jog fenntartva.",
      en: "All rights reserved."
    },
    ebroloNotice: {
      hu: "Ez a weboldal bemutató célú mintaweboldal, amelyet az E-Brolo fejlesztett.",
      en: "This is a preview demonstration website developed by E-Brolo."
    },
    ebroloUrl: "https://ebrolo.hu/"
  }
};
