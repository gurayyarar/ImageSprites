'use strict';
import * as vscode from 'vscode';
import { IOption } from '../interfaces/option';

export class Options {
    public static getOptions(): IOption {
        const configValues: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("imageSprites.settings");

        let orientation: string = configValues.get("orientation") as string;
        let output: string = configValues.get("output") as string;
        let padding: number = configValues.get("padding") as number;
        let stylesheet: string = configValues.get("stylesheet") as string;
        let customStyles: any = configValues.get("custom_styles") as any;
        let pathPrefix: string = configValues.get("path_prefix") as string;
        let enableCacheBusting: boolean = configValues.get("enable_cache_busting") as boolean;

        output = output === undefined ? "png" : output;
        pathPrefix = pathPrefix === undefined ? "" : pathPrefix;
        enableCacheBusting = enableCacheBusting === undefined ? true : false;
        padding = padding === undefined ? 5 : padding;
        stylesheet = stylesheet === undefined ? "css" : stylesheet;
        orientation = orientation === undefined ? "vertical" : orientation;
        customStyles = customStyles === undefined ? { "display": "inline-block" } : customStyles;

        return {
            custom_styles: customStyles,
            orientation: orientation,
            padding: padding,
            stylesheet: stylesheet,
            path_prefix: pathPrefix,
            output: output,
            enable_cache_busting: enableCacheBusting
        };
    }

    public static allowImageFileExtensions(): string[] {
        return [".png", ".jpg", ".bmp"];
    }
}