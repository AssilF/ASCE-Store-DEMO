export type PortTag =
  | "gps"
  | "rf24"
  | "wifi"
  | "bluetooth"
  | "espnow"

export type Category =
  | "platform"
  | "battery"
  | "circuit"
  | "motor"
  | "wheel"
  | "mount"
  | "sensor"
  | "peripheral"
  | "service"

export interface Variant {
  sku: string
  name: string
  optimalCurrent?: number
  minCurrent?: number
  weight?: number
  price: number
  [key: string]: unknown
}

export interface Product {
  sku: string
  name: string
  category: Category
  variants?: Variant[]
  compatiblePlatforms?: string[]
  optimalCurrent?: number
  minCurrent?: number
  weight?: number
  incompatibleWith?: string[]
  ports?: PortTag[]
  price: number
}

export const products: Product[] = [
  {
    sku: "platform-thegill",
    name: "The'gill",
    category: "platform",
    variants: [
      { sku: "thegill-heavy", name: "Heavy", weight: 3, price: 120 },
      { sku: "thegill-chelon", name: "Chelon", weight: 2.6, price: 110 },
      { sku: "thegill-rapht", name: "Rapht", weight: 2.4, price: 105 }
    ],
    price: 100
  },
  {
    sku: "platform-drongaze",
    name: "Drongaze",
    category: "platform",
    variants: [
      { sku: "drongaze-sghir", name: "Sghir", weight: 1.8, price: 90 },
      { sku: "drongaze-open", name: "OPEN", weight: 1.6, price: 85 }
    ],
    price: 80
  },
  {
    sku: "platform-microtomba",
    name: "µTomba",
    category: "platform",
    variants: [
      { sku: "microtomba-handycap", name: "Handy Cap 7800", weight: 1, price: 70 },
      { sku: "microtomba-evolite", name: "Evolite", weight: 0.8, price: 65 }
    ],
    price: 60
  },
  {
    sku: "platform-ilite",
    name: "ILITE",
    category: "platform",
    price: 55
  },
  {
    sku: "platform-bulky",
    name: "Bulky",
    category: "platform",
    variants: [
      { sku: "bulky-bare", name: "Bare", weight: 3.5, price: 130 },
      { sku: "bulky-shell", name: "Shell", weight: 4, price: 150 }
    ],
    price: 125
  },
  {
    sku: "platform-mechiane",
    name: "Mech'Iane",
    category: "platform",
    variants: [
      { sku: "mechiane-pro-360", name: "Pro 360° servo", weight: 2, price: 140 },
      { sku: "mechiane-pro-270", name: "Pro 270° servo", weight: 1.9, price: 135 },
      { sku: "mechiane-slim", name: "Slim", weight: 1.5, price: 120 }
    ],
    price: 115
  },
  {
    sku: "platform-zen",
    name: "Zen",
    category: "platform",
    price: 90
  },
  {
    sku: "battery-2200-4s",
    name: "2200mAh 4S 25C GILLER battery",
    category: "battery",
    compatiblePlatforms: ["Bulky", "The'gill", "Drongaze Mini"],
    weight: 0.3,
    optimalCurrent: 2.2,
    price: 25
  },
  {
    sku: "battery-1600-2s",
    name: "1600mAh 2S 10C Li-Ion pack",
    category: "battery",
    compatiblePlatforms: ["µTomba", "Bulky"],
    weight: 0.2,
    optimalCurrent: 1.6,
    price: 20
  },
  {
    sku: "battery-1000-flat",
    name: "1000mAh flat Li-Ion 3.7v cell",
    category: "battery",
    compatiblePlatforms: ["ILITE", "µTomba"],
    weight: 0.1,
    minCurrent: 0.5,
    optimalCurrent: 1,
    price: 10
  },
  {
    sku: "battery-8800-3s",
    name: "8800mAh 3S Li-Ion Cell pack",
    category: "battery",
    compatiblePlatforms: ["Bulky"],
    weight: 0.6,
    optimalCurrent: 8.8,
    price: 55
  },
  {
    sku: "battery-5200-3s",
    name: "5200mAh 3S 35C",
    category: "battery",
    compatiblePlatforms: ["Drongaze", "The'gill", "Bulky"],
    weight: 0.4,
    optimalCurrent: 5.2,
    price: 40
  },
  {
    sku: "circuit-giller",
    name: "Giller",
    category: "circuit",
    ports: ["wifi", "bluetooth", "espnow"],
    weight: 0.05,
    price: 60
  },
  {
    sku: "circuit-bulker",
    name: "Bulker",
    category: "circuit",
    ports: ["wifi", "bluetooth"],
    weight: 0.05,
    price: 55
  },
  {
    sku: "circuit-drongazer-stm32",
    name: "Drongazer STM32",
    category: "circuit",
    ports: ["rf24"],
    weight: 0.05,
    price: 50
  },
  {
    sku: "circuit-iliter",
    name: "ILITER",
    category: "circuit",
    weight: 0.04,
    price: 45
  },
  {
    sku: "circuit-microtomba-evo-esp32",
    name: "Microtomba Evolite ESP32 Kit",
    category: "circuit",
    ports: ["wifi", "bluetooth", "espnow"],
    weight: 0.03,
    price: 35
  },
  {
    sku: "circuit-handycap-arduino-mega",
    name: "Microtomba Handy Cap 7800 Arduino Mega Kit",
    category: "circuit",
    weight: 0.07,
    price: 30
  },
  {
    sku: "circuit-evolite-arduino-nano",
    name: "Microtomba Evolite Arduino Nano Kit",
    category: "circuit",
    weight: 0.02,
    price: 25
  },
  {
    sku: "motor-tt",
    name: "TT Motor",
    category: "motor",
    compatiblePlatforms: ["Bulky", "µTomba"],
    weight: 0.05,
    optimalCurrent: 0.3,
    price: 5
  },
  {
    sku: "motor-asce-easydays",
    name: "ASCE Easydays motor",
    category: "motor",
    compatiblePlatforms: ["µTomba"],
    weight: 0.04,
    optimalCurrent: 0.25,
    price: 6
  },
  {
    sku: "motor-johnson-48",
    name: "ASCE Johnson 48:1 gearbox",
    category: "motor",
    compatiblePlatforms: ["Zen", "The'gill"],
    weight: 0.2,
    optimalCurrent: 0.8,
    price: 20
  },
  {
    sku: "motor-johnson-20",
    name: "ASCE Johnson 20:1 gearbox",
    category: "motor",
    compatiblePlatforms: ["Zen", "The'gill"],
    weight: 0.18,
    optimalCurrent: 1,
    price: 22
  },
  {
    sku: "motor-a2212",
    name: "A2212 Brushless",
    category: "motor",
    weight: 0.06,
    optimalCurrent: 3,
    price: 30
  },
  {
    sku: "wheel-zen",
    name: "Zen wheels",
    category: "wheel",
    compatiblePlatforms: ["Zen", "The'gill"],
    weight: 0.1,
    price: 15
  },
  {
    sku: "wheel-gills",
    name: "Gills",
    category: "wheel",
    compatiblePlatforms: ["The'gill", "Zen"],
    weight: 0.12,
    price: 18
  },
  {
    sku: "wheel-gills-mk2",
    name: "Gills MK2",
    category: "wheel",
    compatiblePlatforms: ["The'gill", "Zen"],
    weight: 0.13,
    price: 20
  },
  {
    sku: "wheel-tt",
    name: "TT motor wheels",
    category: "wheel",
    compatiblePlatforms: ["TT Motor"],
    weight: 0.05,
    price: 5
  },
  {
    sku: "wheel-asce-tt",
    name: "ASCE TT motor wheels",
    category: "wheel",
    compatiblePlatforms: ["TT Motor"],
    weight: 0.06,
    price: 6
  },
  {
    sku: "mount-bulky-reservoir",
    name: "Bulky Extra reservoir",
    category: "mount",
    compatiblePlatforms: ["Bulky"],
    weight: 0.2,
    price: 25
  },
  {
    sku: "mount-bulky-stereocamera",
    name: "Bulky Raspberry Pi Stereocamera top",
    category: "mount",
    compatiblePlatforms: ["Bulky"],
    weight: 0.3,
    price: 35
  },
  {
    sku: "mount-thegill-mechiane",
    name: "The'gill mount for Mech'Iane",
    category: "mount",
    compatiblePlatforms: ["The'gill"],
    weight: 0.15,
    price: 20
  },
  {
    sku: "mount-thegill-basket",
    name: "The'gill mount for Basket",
    category: "mount",
    compatiblePlatforms: ["The'gill"],
    weight: 0.14,
    price: 18
  },
  {
    sku: "sensor-bulky-infrared-fire",
    name: "Bulky Infrared Fire Set",
    category: "sensor",
    compatiblePlatforms: ["Bulky"],
    weight: 0.1,
    price: 20
  },
  {
    sku: "sensor-bulky-line-follower",
    name: "Bulky Line Follower Set",
    category: "sensor",
    compatiblePlatforms: ["Bulky"],
    weight: 0.1,
    price: 18
  },
  {
    sku: "sensor-thegill-water-leak",
    name: "The'gill water leakage sensor",
    category: "sensor",
    compatiblePlatforms: ["The'gill"],
    weight: 0.05,
    price: 12
  },
  {
    sku: "sensor-light",
    name: "Light sensor",
    category: "sensor",
    weight: 0.02,
    price: 8
  },
  {
    sku: "sensor-color",
    name: "Color sensor",
    category: "sensor",
    compatiblePlatforms: ["µTomba"],
    weight: 0.02,
    price: 10
  },
  {
    sku: "sensor-texo-line",
    name: "µTomba Texo line sensor array",
    category: "sensor",
    compatiblePlatforms: ["µTomba"],
    weight: 0.05,
    price: 22
  },
  {
    sku: "sensor-tcrt-line",
    name: "µTomba 2x TCRT line sensor array",
    category: "sensor",
    compatiblePlatforms: ["µTomba"],
    weight: 0.04,
    price: 18
  },
  {
    sku: "peripheral-5v-rail",
    name: "ASCE 5V 5A power rail",
    category: "peripheral",
    weight: 0.05,
    price: 15
  },
  {
    sku: "peripheral-3v3-rail",
    name: "ASCE 3.3V 5A power rail",
    category: "peripheral",
    weight: 0.05,
    price: 15
  },
  {
    sku: "peripheral-9v-rail",
    name: "ASCE 9V 10A power rail",
    category: "peripheral",
    weight: 0.07,
    price: 20
  },
  {
    sku: "peripheral-thegill-fins",
    name: "ASCE The'gill bracket fins",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.1,
    price: 25
  },
  {
    sku: "peripheral-solaroid",
    name: "ASCE Solaroid",
    category: "peripheral",
    compatiblePlatforms: ["The'gill", "Bulky", "Drongaze"],
    weight: 0.3,
    price: 60
  },
  {
    sku: "peripheral-solaris",
    name: "ASCE Solaris",
    category: "peripheral",
    compatiblePlatforms: ["Bulky", "The'gill"],
    weight: 0.4,
    price: 75
  },
  {
    sku: "peripheral-mechiane-adapter-gill",
    name: "ASCE Mech'Iane for The'gill",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.2,
    price: 45
  },
  {
    sku: "peripheral-mechiane-adapter-bulky",
    name: "ASCE Mech'Iane for Bulky",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    weight: 0.25,
    price: 50
  },
  {
    sku: "peripheral-bulky-crane",
    name: "ASCE Bulky crane",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    weight: 0.7,
    price: 80
  },
  {
    sku: "peripheral-bulky-pump",
    name: "ASCE Bulky Pump and reservoir",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    weight: 0.6,
    price: 65
  },
  {
    sku: "peripheral-bulky-oled",
    name: "ASCE Bulky OLED",
    category: "peripheral",
    compatiblePlatforms: ["The'gill Heavy"],
    weight: 0.05,
    price: 30
  },
  {
    sku: "peripheral-thegill-encoder",
    name: "ASCE The'gill Encoder set",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.05,
    price: 28
  },
  {
    sku: "peripheral-thegill-servo-bin",
    name: "ASCE The'gill Servo Bin",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.3,
    price: 40
  },
  {
    sku: "peripheral-thegill-reaction-wheel",
    name: "ASCE The'gill Reaction Wheel System",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.5,
    ports: ["bluetooth"],
    price: 95
  },
  {
    sku: "peripheral-bulky-camera",
    name: "ASCE Bulky Camera",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    weight: 0.2,
    price: 55
  },
  {
    sku: "peripheral-thegill-lightwork",
    name: "ASCE The'gill Lightwork",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.15,
    price: 35
  },
  {
    sku: "peripheral-bulky-lightwork",
    name: "ASCE Bulky Lightwork",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    weight: 0.15,
    price: 35
  },
  {
    sku: "peripheral-thegill-led",
    name: "ASCE The'gill LED set",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    weight: 0.08,
    price: 20
  },
  {
    sku: "peripheral-bulky-led",
    name: "ASCE Bulky LED set",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    weight: 0.08,
    price: 20
  },
  {
    sku: "peripheral-bulky-gps",
    name: "ASCE Bulky GPS",
    category: "peripheral",
    compatiblePlatforms: ["Bulky"],
    ports: ["gps"],
    weight: 0.06,
    price: 50
  },
  {
    sku: "peripheral-thegill-gps",
    name: "ASCE The'gill GPS",
    category: "peripheral",
    compatiblePlatforms: ["The'gill"],
    ports: ["gps"],
    weight: 0.06,
    price: 50
  },
  {
    sku: "peripheral-drongaze-camera",
    name: "ASCE Drongaze Camera",
    category: "peripheral",
    compatiblePlatforms: ["Drongaze"],
    weight: 0.25,
    price: 60
  },
  {
    sku: "peripheral-drongaze-gps",
    name: "ASCE Drongaze GPS",
    category: "peripheral",
    compatiblePlatforms: ["Drongaze"],
    ports: ["gps"],
    weight: 0.06,
    price: 50
  },
  {
    sku: "peripheral-mechiane-camera",
    name: "Mech'Iane Camera",
    category: "peripheral",
    weight: 0.2,
    price: 45
  },
  {
    sku: "peripheral-mechiane-pinch",
    name: "Mech'Iane Pinch Gripper",
    category: "peripheral",
    weight: 0.3,
    price: 40
  },
  {
    sku: "peripheral-mechiane-claw",
    name: "Mech'Iane Claw Gripper",
    category: "peripheral",
    weight: 0.35,
    price: 42
  },
  {
    sku: "peripheral-mechiane-screw",
    name: "Mech'Iane Screw Gripper",
    category: "peripheral",
    weight: 0.32,
    price: 44
  },
  {
    sku: "service-drongaze-blade-prop",
    name: "Drongaze ASCE blade propellers",
    category: "service",
    price: 15
  },
  {
    sku: "service-drongaze-triplet-prop",
    name: "Drongaze ASCE triplet propellers",
    category: "service",
    price: 20
  },
  {
    sku: "service-thegill-silicon-coating",
    name: "The'gill silicon coating",
    category: "service",
    price: 30
  },
  {
    sku: "service-thegill-waterproofing",
    name: "The'gill total waterproofing",
    category: "service",
    price: 50
  },
  {
    sku: "service-bulky-water-pump-nozzles",
    name: "Bulky Water pump nozzles",
    category: "service",
    price: 12
  }
]
