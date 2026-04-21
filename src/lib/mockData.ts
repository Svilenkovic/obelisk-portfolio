import { Product, Collection } from './types';

export const mockCollections: Collection[] = [
  {
    id: 1,
    name: "Poreklo",
    slug: "poreklo",
    description: "Kolekcija inspirisana korenima. Čist minimalizam i vrhunski materijali.",
    image_url: "",
    is_active: 1
  }
];

export const mockProducts: Product[] = [
  {
    id: 101, collection_id: 1, name: "NAPOLI", slug: "nacionale-napoli", 
    description: "Italijanska elegancija utkana u savršenu pamučnu osnovu.", 
    price: 8500, discount_price: null, sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["#111111"]), design_image: "NAPOLI", is_featured: 1, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 102, collection_id: 1, name: "MEDELLIN", slug: "nacionale-medellin", 
    description: "Tamna i duboka estetika uličnog luksuza.", 
    price: 9000, discount_price: null, sizes: JSON.stringify(["M", "L", "XL"]), colors: JSON.stringify(["#f0ece4"]), design_image: "MEDELLIN", is_featured: 1, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 103, collection_id: 1, name: "SINALOA", slug: "nacionale-sinaloa", 
    description: "Zlatni preplet, robustna tekstura. Limitirani dizajn iz naše najekskluzivnije serije.", 
    price: 11000, discount_price: 9500, sizes: JSON.stringify(["S", "M", "L"]), colors: JSON.stringify(["#c9a84c"]), design_image: "SINALOA", is_featured: 1, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 104, collection_id: 1, name: "JALISCO", slug: "nacionale-jalisco", 
    description: "Jarki uticaji, zemljani tonovi, savršeno za svakodnevnu dominaciju na ulicama.", 
    price: 8500, discount_price: null, sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]), colors: JSON.stringify(["#3d301b"]), design_image: "JALISCO", is_featured: 0, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 105, collection_id: 1, name: "CUBA", slug: "nacionale-cuba", 
    description: "Lagani organski pamuk, idealan za letnje zalaske sunca.", 
    price: 9000, discount_price: null, sizes: JSON.stringify(["M", "L"]), colors: JSON.stringify(["#4a503d"]), design_image: "CUBA", is_featured: 0, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 106, collection_id: 1, name: "MONACO", slug: "nacionale-monaco", 
    description: "Vrhnunski standard. Bezkompromisan luksuz prepoznatljiv širom sveta na najskupljim jahtama.", 
    price: 12000, discount_price: 10000, sizes: JSON.stringify(["S", "L", "XL"]), colors: JSON.stringify(["#1a1c29"]), design_image: "MONACO", is_featured: 0, stock_status: "out_of_stock",
    image_url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 107, collection_id: 1, name: "SICILY", slug: "nacionale-sicily", 
    description: "Klasična tradicija prefinjenog kroja, bez modernih kompromisa po pitanju kvaliteta.", 
    price: 8500, discount_price: null, sizes: JSON.stringify(["S", "M", "L"]), colors: JSON.stringify(["#ffffff"]), design_image: "SICILY", is_featured: 0, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=800&auto=format&fit=crop"
  }
];
