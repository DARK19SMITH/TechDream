export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  category: "conseil" | "actualite" | "astuce";
  date: string;
  published: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "pc" | "laptop" | "gaming" | "professionnel" | "accessoire";
  specs: string[];
  inStock: boolean;
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "Comment optimiser les performances de votre PC",
    content: "Découvrez nos astuces pour améliorer les performances de votre ordinateur...",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800",
    category: "conseil",
    date: "2026-01-15",
    published: true,
  },
  {
    id: "2",
    title: "Les tendances tech de 2026",
    content: "L'intelligence artificielle et le cloud computing dominent cette année...",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    category: "actualite",
    date: "2026-01-12",
    published: true,
  },
  {
    id: "3",
    title: "5 astuces pour sécuriser vos données",
    content: "Protégez vos informations personnelles avec ces conseils essentiels...",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
    category: "astuce",
    date: "2026-01-10",
    published: true,
  },
  {
    id: "4",
    title: "Guide d'achat : choisir son premier PC Gaming",
    content: "Tous les critères à considérer pour un setup gaming performant...",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800",
    category: "conseil",
    date: "2026-01-08",
    published: true,
  },
];

const initialProducts: Product[] = [
  {
    id: "1",
    name: "TechDream Pro X1",
    description: "Station de travail haute performance pour professionnels",
    price: 2499,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800",
    category: "professionnel",
    specs: ["Intel i9-14900K", "64GB DDR5", "RTX 4080", "2TB NVMe SSD"],
    inStock: true,
  },
  {
    id: "2",
    name: "TechDream Gaming Elite",
    description: "PC Gaming ultime pour les passionnés",
    price: 3299,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
    category: "gaming",
    specs: ["AMD Ryzen 9 7950X", "32GB DDR5", "RTX 4090", "1TB NVMe SSD"],
    inStock: true,
  },
  {
    id: "3",
    name: "TechDream Laptop Air",
    description: "Ultrabook léger et puissant pour la mobilité",
    price: 1599,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    category: "laptop",
    specs: ["Intel i7-1365U", "16GB RAM", "Iris Xe", "512GB SSD"],
    inStock: true,
  },
  {
    id: "4",
    name: "TechDream Office Basic",
    description: "PC bureautique fiable et économique",
    price: 799,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800",
    category: "pc",
    specs: ["Intel i5-13400", "16GB DDR4", "Intel UHD 730", "256GB SSD"],
    inStock: true,
  },
  {
    id: "5",
    name: "TechDream Gaming Starter",
    description: "Entrée de gamme gaming accessible",
    price: 1299,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800",
    category: "gaming",
    specs: ["AMD Ryzen 5 7600", "16GB DDR5", "RTX 4060", "500GB NVMe"],
    inStock: true,
  },
  {
    id: "6",
    name: "TechDream Laptop Pro",
    description: "Laptop professionnel haute performance",
    price: 2199,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800",
    category: "laptop",
    specs: ["Intel i9-13900H", "32GB DDR5", "RTX 4070", "1TB SSD"],
    inStock: false,
  },
];

let articles = [...initialArticles];
const products = [...initialProducts];

export const getArticles = () => articles.filter((a) => a.published);
export const getAllArticles = () => articles;
export const getArticleById = (id: string) => articles.find((a) => a.id === id);

export const addArticle = (article: Omit<Article, "id">) => {
  const newArticle = { ...article, id: Date.now().toString() };
  articles = [newArticle, ...articles];
  return newArticle;
};

export const updateArticle = (id: string, data: Partial<Article>) => {
  articles = articles.map((a) => (a.id === id ? { ...a, ...data } : a));
  return getArticleById(id);
};

export const deleteArticle = (id: string) => {
  articles = articles.filter((a) => a.id !== id);
};

export const getProducts = () => products;
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductsByCategory = (category: Product["category"]) =>
  products.filter((p) => p.category === category);
