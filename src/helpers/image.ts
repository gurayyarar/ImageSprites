import * as fs from "fs";
import * as sizeOf from "image-size";
import * as path from "path";
var Jimp = require("jimp");
import { IImage } from "../interfaces/image";
import { Options } from "../utils/options";
import { IOption } from "../interfaces/option";
import { Orientation } from "../utils/enum";
import { StringUtils } from "../utils/string";

export class ImageHelpers {
    getImagesDetailInfo(filesOrFolderPath: any, callback: any): void {
        if (typeof filesOrFolderPath === "string") {
            this.getImagesFromFolder(filesOrFolderPath, (files: string[]) => {
                let imageList: IImage[] = [];
                files.forEach((image: string) => {
                    var dimensions: any = sizeOf(image);
                    imageList.push({
                        file_path: image,
                        width: dimensions.width,
                        height: dimensions.height
                    });
                });
                callback(imageList);
            });
        } else {
            const files: string[] = filesOrFolderPath;
            let imageList: IImage[] = [];
            files.forEach((file: string) => {
                if (Options.allowImageFileExtensions().indexOf(path.extname(file)) > -1 && file.indexOf(".sprite.") === -1) {
                    var dimensions: any = sizeOf(file);
                    imageList.push({
                        file_path: file,
                        width: dimensions.width,
                        height: dimensions.height
                    });
                }
            });
            callback(imageList);
        }
    }

    drawSpriteImage(images: IImage[], size: number[], savePath: string, options: IOption, callback: any): void {
        var jimps: any[] = [];

        // tslint:disable-next-line:no-unused-expression
        new Jimp(size[0], size[1], (err: any, image: any) => {
            images.forEach((item: IImage) => {
                jimps.push(Jimp.read(item.file_path));
            });

            Promise.all(jimps).then((datas: any) => {
                return Promise.all(jimps);
            }).then((datas: any) => {
                if (options.orientation === Orientation.Vertical) {
                    const padding: number = options.padding;
                    let posY: number = padding;
                    datas.forEach((data: any, index: number) => {
                        image.composite(data, padding, posY);
                        posY += data.bitmap.height + padding;
                    });
                } else {
                    const padding: number = options.padding;
                    let posX: number = padding;
                    datas.forEach((data: any, index: number) => {
                        image.composite(data, posX, padding);
                        posX += data.bitmap.width + padding;
                    });
                }

                image.write(savePath, (err: any) => {
                    if (err) {
                        StringUtils.writeErrorMsg(err, "The image sprite couldn't save!");
                        throw err;
                    }
                    callback();
                });
            });
        });
    }

    private getImagesFromFolder(folderPath: string, callback: any): void {
        fs.readdir(folderPath, (err: any, files: string[]) => {
            let imageList: string[] = [];

            files.forEach((file: string) => {
                if (Options.allowImageFileExtensions().indexOf(path.extname(file)) > -1 && file.indexOf(".sprite.") === -1) {
                    imageList.push(`${folderPath}\\${file}`);
                }
            });
            callback(imageList);
        });
    }
}