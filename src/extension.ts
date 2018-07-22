'use strict';
import * as vscode from 'vscode';
import * as path from "path";
import { SpriteHelpers } from './helpers/sprite';

export function activate(context: vscode.ExtensionContext) {
    let disposablestartImageSprite = vscode.commands.registerCommand('extension.startImageSprite', (folder: any, items: any) => {
        const ext: string = path.extname(folder.fsPath);

        if (ext !== null && ext !== "" && ext !== undefined) {
            let imageItems: string[] = [];
            items.forEach((item: any) => {
                imageItems.push(item.fsPath);
            });
            new SpriteHelpers().startImageSprite(imageItems, () => {
                vscode.window.showInformationMessage("Image sprite has been generated successfully!");
            });
        } else {
            new SpriteHelpers().startImageSprite(folder.fsPath, () => {
                vscode.window.showInformationMessage("Image sprite has been generated successfully!");
            });
        }
    });

    let disposableUpdateImageSprite = vscode.commands.registerCommand('extension.updateImageSprite', (e: any) => {
        new SpriteHelpers().updateImageSprite(e.fsPath, () => {
            vscode.window.showInformationMessage("Image sprite has been updated successfully!");
        });
    });

    context.subscriptions.push(disposablestartImageSprite);
    context.subscriptions.push(disposableUpdateImageSprite);
}

// this method is called when your extension is deactivated
export function deactivate() {
}