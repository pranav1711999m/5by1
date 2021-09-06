import { Unit } from './unit';

export interface Category {
    id?: string;
    name: string;
    hsnNumber?: string;
    unit: Unit;
    // Parent category
    parent?: Category;
    // Description of category
    description?: string;
}