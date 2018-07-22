import { IImage } from "./image";
import { IOption } from "./option";

export interface IStyleGeneratorItem {
    sprite_image: string;
    options: IOption;
    items: IImage[];
}