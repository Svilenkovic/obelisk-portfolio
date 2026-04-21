export interface Product {
    id: number;
    collection_id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount_price: number | null;
    sizes: string; // JSON string: ["S","M","L","XL","XXL"]
    colors: string; // JSON string: ["#000000","#FFFFFF"]
    design_image: string;
    image_url?: string;
    is_featured: number;
    stock_status: string;
}

export interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
    is_active: number;
}

export interface CartItem {
    product: Product;
    size: string;
    color: string;
    quantity: number;
}

export interface OrderItem {
    product_id: number;
    quantity: number;
    size: string;
    color: string;
    price: number;
}

export interface Order {
    id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_city: string;
    customer_zip: string;
    total_amount: number;
    status: string;
    items: OrderItem[];
    created_at?: string;
}
