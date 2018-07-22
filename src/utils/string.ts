export class StringUtils {
    getCacheBustingKey(): string {
        let text: string = "";
        const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 37; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    static capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static writeLogMsg(message: string): void {
        console.log(`Image Sprites - ${message}`);
    }

    static writeErrorMsg(err: any, message: string): void {
        console.error(`Image Sprites - ${message}\nError Detail: ${err}`);
    }
}