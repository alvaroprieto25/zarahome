import { Size } from "./Size";

export interface Color {
    id: number;
    name: string;
    image: string;
    sizes: Array<Size>;
}