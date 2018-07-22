# Image Sprites
An image sprite is a collection of images put into a single image. A web page with many images can take a long time to load and generates multiple server requests. Using image sprites will reduce the number of server requests and save bandwidth.

## Features
- Easy to create and update image sprites
- Supports png, jpg and bmp images
- Configure vertical or horizontal sprite layouts
- Produce LESS, Sass or CSS file with sprite image locations
- You can manage all sprites with different setting options

## Create Image Sprites
You can choose one which you need to sprite
### 1) Sprite all images in a folder
Right click on a folder containing images and select `Create Image Sprite`

![Sprite All Image In Folder](https://github.com/gurayyarar/ImageSprites/raw/master/images/docs/folder-sprite.gif)

### 2) Sprite some images
Select the images, right click and select `Create Image Sprite`

![Sprite Some Images](https://github.com/gurayyarar/ImageSprites/raw/master/images/docs/files-sprite.gif)

These two ways will generate a `.sprite` setting file as well as the resulting `image file` and a `.css` file as a default.

![Sprite Result](https://github.com/gurayyarar/ImageSprites/raw/master/images/docs/display-sprite.jpg)


## The .sprite File
The `.sprite` file containing about the image sprite settings. It looks something like this:
```
{
   "style_name": "images",
   "images": [
      "..\\images\\access_exports.png",
      "..\\images\\access_imports.png",
      "..\\images\\accordion.png",
      "..\\images\\account_balances.png",
      "..\\images\\account_functions.png"
   ],
   "orientation": "vertical",
   "padding": 5,
   "custom_styles": {
      "display": "inline-block"
   },
   "stylesheet": "css",
   "path_prefix": "",
   "output": "png",
   "enable_cache_busting": true
}
```

### .sprite file options
|Key|Description|Value Type|Values|Default|
|---|-----------|----------|------|-------|
|style_name|Class name `.style_name { /* css codes */ }`|string| | |
|images|An array of relative file paths to the image files|string[]|||
|folder|Relative folder path contains sprited images|string|||
|orientation|The layout of sprited image|string|`vertical` `horizontal`|`vertical`|
|padding|Distance of whitespace inserted around each individual image in the sprite. The value is in pixels.|number||5
|custom_styles|Allows you to inject any css declarations into the generated stylesheets.|object||`{ "display": "inline-block" }`|
|stylesheet|Outputs LESS, Sass or plain CSS files|string|`css` `scss` `less`|`css`|
|path_prefix|Adds a prefix string to the image path in the url(path) value in the stylesheet.|string|||
|output|Sprite image file format|string|`png` `jpg` `bmp`|`png`|
|enable_cache_busting|Enable/Disable cache busting|boolean|`true` `false`|`true`


## Update Image Sprite
You can update with following commands;
1) Right click on a `.sprite` file and select `Update Image Sprite`
2) Right click on editor when a `.sprite` file opened and select `Update Image Sprite`.

![Update Image Sprite](https://github.com/gurayyarar/ImageSprites/raw/master/images/docs/update-sprite.gif)


## Extension Settings
The first `.sprite` file is creating based on this options.

|Key|Description|Value Type|Values|Default|
|---|-----------|----------|------|-------|
|orientation|The layout of sprited image|string|`vertical` `horizontal`|`vertical`|
|padding|Distance of whitespace inserted around each individual image in the sprite. The value is in pixels.|number||5
|custom_styles|Allows you to inject any css declarations into the generated stylesheets.|object||`{ "display": "inline-block" }`|
|stylesheet|Outputs LESS, Sass or plain CSS files|string|`css` `scss` `less`|`css`|
|path_prefix|Adds a prefix string to the image path in the url(path) value in the stylesheet.|string|||
|output|Sprite image file format|string|`png` `jpg` `bmp`|`png`|
|enable_cache_busting|Enable/Disable cache busting|boolean|`true` `false`|`true`

### Example
```
"imageSprites.settings": {
    "padding": 5,
    "orientation": "vertical",
    "stylesheet": "css",
    "output": "png",
    "enable_cache_busting": false
}
```


## License
**Image Sprites** is an open source project that is licensed under the [MIT license](http://opensource.org/licenses/MIT).


## Donations
Donations are **greatly appreciated!**

**[BUY ME A COFFEE](http://bit.ly/2NCtG3k)**