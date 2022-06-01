import { Color } from "./Color";

export interface Product {
    id: number;
    name: string;
    image: string;
    colors: Array<Color>;
}