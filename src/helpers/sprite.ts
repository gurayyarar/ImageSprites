import * as vscode from 'vscode';
import * as fs from "fs";
import * as path from "path";
import { IImage } from "../interfaces/image";
import { Options } from "../utils/options";
import { ImageHelpers } from './image';
import { FileHelpers } from './file';
import { Orientation, RightClickType } from '../utils/enum';
import { StyleGeneratorHelpers } from './style-generator';
import { IStyleGeneratorItem } from '../interfaces/style-generator';
import { StringUtils } from '../utils/string';
import { ISpriteSettings } from '../interfaces/sprite-setting';
import { IOption } from '../interfaces/option';

export class SpriteHelpers {
    startImageSprite(imagesOrFolderPath: any, callback: any): void {
        const rightClickType: RightClickType = typeof imagesOrFolderPath === "string" ? RightClickType.Folder : RightClickType.File;

        new ImageHelpers().getImagesDetailInfo(imagesOrFolderPath, (images: IImage[]) => {
            if (images.length === 0) {
                vscode.window.showErrorMessage("The folder doesn't have any image for sprite!");
            } else {
                let saveDialogOptions: vscode.SaveDialogOptions = {
                    filters: { "Sprite Files": ["sprite"] },
                    defaultUri: vscode.Uri.file(rightClickType === RightClickType.Folder ? imagesOrFolderPath : path.dirname(imagesOrFolderPath[0]))
                };

                vscode.window.showSaveDialog(saveDialogOptions).then((file: any) => {
                    let relativePath: any;
                    const fileFsPath: string = vscode.Uri.parse(file).fsPath;
                    const folder: string = path.dirname(fileFsPath);
                    const styleName: string = path.basename(fileFsPath, path.extname(fileFsPath));

                    if (rightClickType === RightClickType.Folder) {
                        relativePath = path.relative(folder, imagesOrFolderPath);
                    } else {
                        relativePath = [];
                        imagesOrFolderPath.forEach((itemPath: any) => {
                            relativePath.push(path.relative(folder, itemPath));
                        });
                    }

                    new FileHelpers().writeSpriteSettings(rightClickType, styleName, relativePath, fileFsPath, () => {
                        const styleFileName: string = path.join(folder, `${styleName}.sprite.${Options.getOptions().stylesheet}`);
                        const styleItem: IStyleGeneratorItem = {
                            sprite_image: styleName,
                            items: images,
                            options: Options.getOptions()
                        };
                        const styleStr: string = new StyleGeneratorHelpers(styleItem).getStyleText();

                        new FileHelpers().writeStyle(styleFileName, styleStr, () => {
                            const imageFileName: string = path.join(folder, `${styleName}.sprite.${Options.getOptions().output}`);
                            const spriteImageSize: number[] = new SpriteHelpers().getSpriteImageSize(images, Options.getOptions());

                            new ImageHelpers().drawSpriteImage(images, spriteImageSize, imageFileName, Options.getOptions(), () => {
                                callback();
                            });
                        });
                    });
                });
            }
        });
    }

    updateImageSprite(spriteFilePath: string, callback: any): void {
        fs.readFile(spriteFilePath, "utf8", (err: any, data: any) => {
            if (err) {
                StringUtils.writeErrorMsg(err, "The sprite configuration file couldn't read!");
                throw err;
            }

            let options: ISpriteSettings = JSON.parse(data);
            let filesOrFolderPath: any;
            const folderPath: string = path.dirname(spriteFilePath);

            if (options.images === undefined) {
                filesOrFolderPath = path.resolve(folderPath, <string>options.folder);
            } else {
                filesOrFolderPath = [];
                options.images.forEach((image: string) => {
                    filesOrFolderPath.push(path.resolve(folderPath, image));
                });
            }

            new ImageHelpers().getImagesDetailInfo(filesOrFolderPath, (images: IImage[]) => {
                const styleItem: IStyleGeneratorItem = {
                    sprite_image: options.style_name,
                    items: images,
                    options: options
                };

                const styleFileName: string = path.join(folderPath, `${options.style_name}.sprite.${options.stylesheet}`);
                const styleStr: string = new StyleGeneratorHelpers(styleItem).getStyleText();

                new FileHelpers().writeStyle(styleFileName, styleStr, () => {
                    const imageFileName: string = path.join(folderPath, `${options.style_name}.sprite.${options.output}`);
                    const spriteImageSize: number[] = new SpriteHelpers().getSpriteImageSize(images, options);

                    new ImageHelpers().drawSpriteImage(images, spriteImageSize, imageFileName, options, () => {
                        callback();
                    });
                });
            });
        });
    }

    getSpriteImageSize(images: IImage[], options: IOption): number[] {
        const padding = options.padding;
        let width: number = 0;
        let height: number = 0;
        let resultArray: number[] = [];

        if (options.orientation === Orientation.Vertical) {
            width = Math.max.apply(Math, images.map((item: IImage) => { return item.width; })) + (padding * 2);

            images.forEach((item: IImage) => { height += item.height; });
            height += (images.length + 1) * padding;
        } else {
            height = Math.max.apply(Math, images.map((item: IImage) => { return item.height; })) + (padding * 2);

            images.forEach((item: IImage) => { width += item.width; });
            width += (images.length + 1) * padding;
        }

        resultArray.push(width);
        resultArray.push(height);
        return resultArray;
    }
}