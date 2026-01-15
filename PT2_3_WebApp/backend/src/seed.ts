import mongoose from "mongoose";
import Product from "./models/Product";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/xsurface";

const mockProducts = [
  {
    name: "PVKA (Stana)",
    code: "PVKA-ST-001",
    price: 850,
    category: "UPVC/VPVC",
    description: "แผ่น UPVC คุณภาพสูง ทนทาน กันน้ำ",
    image: "https://via.placeholder.com/400x300/667eea/ffffff?text=PVKA+Stana",
  },
  {
    name: "PVKA (Stana) COOLMATTER",
    code: "PVKA-ST-002",
    price: 950,
    category: "UPVC/VPVC",
    description: "แผ่น UPVC เทคโนโลยีระบายความร้อน",
    image: "https://via.placeholder.com/400x300/764ba2/ffffff?text=PVKA+Coolmatter",
  },
  {
    name: "Ceramic Tile Premium",
    code: "TILE-PR-001",
    price: 650,
    category: "Tile",
    description: "กระเบื้องเซรามิค ลายหินอ่อน คุณภาพพรีเมียม",
    image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Ceramic+Tile",
  },
  {
    name: "Marble Stone Classic",
    code: "STONE-MC-001",
    price: 1200,
    category: "Stone",
    description: "หินอ่อนแท้ นำเข้าจากอิตาลี",
    image: "https://via.placeholder.com/400x300/ec4899/ffffff?text=Marble+Stone",
  },
  {
    name: "Teak Wood Panel",
    code: "WOOD-TK-001",
    price: 2500,
    category: "Wood",
    description: "แผ่นไม้สักทอง ชั้น A",
    image: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Teak+Wood",
  },
  {
    name: "Oak Wood Flooring",
    code: "WOOD-OK-001",
    price: 1800,
    category: "Wood",
    description: "พื้นไม้โอ๊ค กันน้ำ กันปลวก",
    image: "https://via.placeholder.com/400x300/a16207/ffffff?text=Oak+Wood",
  },
  {
    name: "Mirror Wall Decorative",
    code: "MIRROR-WD-001",
    price: 750,
    category: "Mirror",
    description: "กระจกตกแต่งผนัง ลายสวยงาม",
    image: "https://via.placeholder.com/400x300/06b6d4/ffffff?text=Mirror",
  },
  {
    name: "WPC Composite Board",
    code: "WPC-CB-001",
    price: 1100,
    category: "WPC",
    description: "แผ่น WPC ผสมไม้และพลาสติก ทนทานยาวนาน",
    image: "https://via.placeholder.com/400x300/10b981/ffffff?text=WPC+Board",
  },
  {
    name: "WPC Outdoor Deck",
    code: "WPC-OD-001",
    price: 1350,
    category: "WPC",
    description: "พื้นไม้เทียม สำหรับติดตั้งกลางแจ้ง",
    image: "https://via.placeholder.com/400x300/059669/ffffff?text=WPC+Deck",
  },
  {
    name: "Aluminum Panel Silver",
    code: "METAL-AL-001",
    price: 890,
    category: "Metal",
    description: "แผ่นอลูมิเนียม สีเงิน กันสนิม",
    image: "https://via.placeholder.com/400x300/6b7280/ffffff?text=Aluminum",
  },
  {
    name: "Stainless Steel Sheet",
    code: "METAL-SS-001",
    price: 1450,
    category: "Metal",
    description: "แผ่นสแตนเลส 304 ทนทาน ไม่เป็นสนิม",
    image: "https://via.placeholder.com/400x300/94a3b8/ffffff?text=Steel",
  },
  {
    name: "Wallpaper Modern Design",
    code: "WALL-MD-001",
    price: 550,
    category: "Wallpaper",
    description: "วอลเปเปอร์ลายทันสมัย ติดง่าย",
    image: "https://via.placeholder.com/400x300/be185d/ffffff?text=Wallpaper",
  },
  {
    name: "Vinyl Flooring Classic",
    code: "VINYL-CL-001",
    price: 680,
    category: "Tile",
    description: "พื้นไวนิล ลายไม้ กันน้ำ 100%",
    image: "https://via.placeholder.com/400x300/7c3aed/ffffff?text=Vinyl+Floor",
  },
  {
    name: "Granite Stone Black",
    code: "STONE-GB-001",
    price: 1600,
    category: "Stone",
    description: "หินแกรนิตสีดำ เงางาม หรูหรา",
    image: "https://via.placeholder.com/400x300/1e293b/ffffff?text=Granite",
  },
  {
    name: "PVKA Decorative Panel",
    code: "PVKA-DP-001",
    price: 920,
    category: "UPVC/VPVC",
    description: "แผ่น UPVC ลายตกแต่ง หลากหลายสี",
    image: "https://via.placeholder.com/400x300/5b21b6/ffffff?text=PVKA+Panel",
  },
  {
    name: "Bamboo Wood Panel",
    code: "WOOD-BB-001",
    price: 1650,
    category: "Wood",
    description: "แผ่นไม้ไผ่ อัดแรงสูง เป็นมิตรกับสิ่งแวดล้อม",
    image: "https://via.placeholder.com/400x300/65a30d/ffffff?text=Bamboo",
  },
  {
    name: "LED Mirror Smart",
    code: "MIRROR-LED-001",
    price: 2200,
    category: "Mirror",
    description: "กระจกไฟ LED พร้อมระบบควบคุมอัจฉริยะ",
    image: "https://via.placeholder.com/400x300/0891b2/ffffff?text=LED+Mirror",
  },
  {
    name: "Copper Metal Sheet",
    code: "METAL-CP-001",
    price: 1750,
    category: "Metal",
    description: "แผ่นทองแดง สำหรับตกแต่ง สวยงามเป็นเอกลักษณ์",
    image: "https://via.placeholder.com/400x300/ea580c/ffffff?text=Copper",
  },
  {
    name: "WPC Wall Cladding",
    code: "WPC-WC-001",
    price: 1280,
    category: "WPC",
    description: "แผ่นหุ้มผนัง WPC กันน้ำ ทนแดดทนฝน",
    image: "https://via.placeholder.com/400x300/16a34a/ffffff?text=WPC+Cladding",
  },
  {
    name: "Luxury Vinyl Tile",
    code: "VINYL-LX-001",
    price: 780,
    category: "Tile",
    description: "กระเบื้องไวนิลหรู ลายหินอ่อนธรรมชาติ",
    image: "https://via.placeholder.com/400x300/c026d3/ffffff?text=Luxury+Vinyl",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const created = await Product.insertMany(mockProducts);
    console.log(`Created ${created.length} mock products`);

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedDatabase();
