import * as fs from "fs";
import { ISpriteSettings } from "../interfaces/sprite-setting";
import { RightClickType } from "../utils/enum";
import { Options } from "../utils/options";
import { StringUtils } from "../utils/string";

export class FileHelpers {
    writeSpriteSettings(type: RightClickType, styleName: string, items: any, path: string, callback: any) {
        var fileVals: ISpriteSettings = {
            style_name: styleName,
            folder: "",
            images: "",
            orientation: Options.getOptions().orientation,
            padding: Options.getOptions().padding,
            custom_styles: Options.getOptions().custom_styles,
            stylesheet: Options.getOptions().stylesheet,
            path_prefix: Options.getOptions().path_prefix,
            output: Options.getOptions().output,
            enable_cache_busting: Options.getOptions().enable_cache_busting
        };

        if (type === RightClickType.Folder) {
            fileVals.folder = items;
            delete fileVals.images;
        } else {
            fileVals.images = items;
            delete fileVals.folder;
        }
        console.log(fileVals);
        fs.writeFile(path, JSON.stringify(fileVals, null, 3), (err: any) => {
            if (err) {
                StringUtils.writeErrorMsg(err, "The configuration file couldn't save!");
                throw err;
            }
            callback();
        });
    }

    writeStyle(fileName: string, writingText: string, callback: any): void {
        fs.writeFile(fileName, writingText, (err: any) => {
            if (err) {
                StringUtils.writeErrorMsg(err, "The generated style file couldn't save!");
                throw err;
            }
            callback();
        });
    }
}