import { BaseModel } from './base.model';
import { ProductImage } from './product.image.model';

export interface Product extends BaseModel{
    name: string,
    price: number
    description: string
    thumbUrl: string
    images: ProductImage[]
}