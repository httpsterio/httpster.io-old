---
title: Subsetting fonts with Python 3 and FontTools
date: "2023-05-06"
description: ""
writingtime: "null"
draft: false
tags:
  - fonts
  - webdev
  - typography
  - commandline
---

## TL;DR

`pip3 install fonttools brotli`
```pyftsubset YOURFONT.woff2 --output-file=YOURFONT-subset.woff2 --text-file=characters.txt --flavor=woff2 --layout-features=kern```

## Forewords

I'm an avid fan of the static site generator Eleventy. In fact, this site was built with it _(and the lovely starter project Supermaya by [Mike Riethmuller](https://github.com/MadeByMike/supermaya))_. While trying to get my site to raise in the ranks on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/httpster-io/), I did my darnedest to optimize every aspect of the site. One of the things I did was to subset the fonts I use on the site. This is a short post on why and how I did it.

## What is font subsetting and why should I care?

Don't you just hate it when pages are slow to load? Even more annoying is when a page seems to have loaded but the proper fonts come in with a delay and the text jumps around. This is because the browser has to download the font files before it can render the text properly. Larger fonts take a longer time to download than a small font, even if the larger font is only used for a few characters.

Subsetting a font means removing all of the extra symbols and characters from the font file that you don't need and generating a new, subsetted font file with just the necessary characters. This new font file is much smaller than the original and will download faster. If you want to take people with slower internet speeds into consideration or you want to make your site more green, it certainly doesn't hurt to optimize your site's overall data footprint.

## What are my options?

There's mainly two proper ways of subsetting a font. The first one would be to use an online tool like Font Squirrel's [Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator). It's a great tool, but it doesn't for example support woff2 fonts nor does it really help you in any ways.

The other option would be to use a command line tool like [Glyphhanger](https://github.com/zachleat/glyphhanger) by Zach Leatherman or FontTools directly. Glyphhanger uses FontTools under the hood and provides some fun extra features like the ability to scan web pages for used characters and to gather all the used characters and symbols automatically. Glyphhanger is a great tool, but it's a bit of a hassle to install and use. I've had some issues with it in the past, so I personally prefer to use FontTools directly. Less dependencies, less things to break.

If you're on MacOS and want to have a go with Glyphhanger, I can strongly recommend Sara Soueidan's article [How I set up Glyphhanger on MacOS for optimizing and converting font files for the Web](https://www.sarasoueidan.com/blog/glyphhanger/). It's a great article even if you're not a Mac user.

## I'm sold! Let's do it!

You'll need two things—A terminal emulator and Python3.

### 1. Make sure you have python3 installed
If you're on Mac or Linux, you can open your default terminal and type `which python3` and if you see something like `/usr/bin/python3` or similar, you're good to go. If not, go and install it. 

If you're on Windows, you'll most likely need to install Python3. You can download it from [python.org](https://www.python.org/downloads/). Make sure to check the box that says "Add Python 3.x to PATH" during the installation.

Now, you're ready to install FontTools.

### 2. Installing FontTools and Brotli
You can install FontTools by opening your terminal and typing `pip3 install fonttools brotli`. If you get an error message, you might need to install `pip3` or use `pip` instead. If you're on Windows, you might need to use `py -m pip install fonttools brotli`. Brotli is required when process woff2 files and FontTools will throw an error if you don't have it installed.

If you're using Ubuntu on WSL, you will also have to install `pycryptodomex`, `websockets`, `mutagen` and `zopfli` with `pip3 install pycryptodomex websockets mutagen zopfli`.

### 3. Create a file with the characters you want to keep

Create a basic ´.txt´ file and inside the file, list all the characters you're going to use on your website. My list of characters looks like this:

```1234567890!"#%&/()=?``´@£$€{[]}\~^'*-–—_.,:;<>|’½§qwertyuiopåasdfghjklöäzxcvbnmæøQWERTYUIOPÅASDFGHJKLÖÄZXCVBNMÆØéáíçñëèāÉÁÍÇÑËÈĀ```

Save the file as `characters.txt` in the same folder as your font files.

Notice, how you have to add both the lowercase and the uppercase variants of each letter. Any characters you don't list here will be removed from the font file, so try to be as thorough as possible.

### 4. Figure out which features you want to keep

Your font most likely comes with a kerning table, which is a table that tells the browser how much space to put between each character. Most fonts come with a bunch of other features you might or might not want to keep. I'm using Inter as an example and it comes with a whopping 35 OpenType features like symbols for cardinal numbers, fraction numbers etc. I don't need any of those, but you might. So, it's a good idea to check which options are available for your font. I personally prefer to use [FontDrop!](https://fontdrop.info/) to inspect the font before I start subsetting it.

You can also use the command `pyftsubset YOURFONT.woff2 --layout-features=?` to list all the available features.

Make note of the features you want to keep and write them up somewhere. I'm going to keep only the kerning so I'm just going to write `kern`.

### 5. Subset the font

You have all the tools installed, your font in an woff2, otf or ttf format and a list of characters you want to keep. Now, it's time to subset the font. Open your terminal and navigate to the folder where your font files are. Then, type the following command:

```pyftsubset YOURFONT.woff2 --output-file=YOURFONT-subset.woff2 --text-file=characters.txt --flavor=woff2 --layout-features=kern``` and run it.

Remember to replace `YOURFONT` with the actual name of the font you're using and replace `kern` with the features you want to keep. If you want to keep multiple features, separate them with a comma like this: `--layout-features=kern,liga`. If you simply want to keep all of the layout features, you can also just type `--layout-features=*` instead.

If you're using a ttf or otf font, you can replace `--flavor=woff2` with `--flavor=woff` or `--flavor=truetype` respectively, but for webfonts, woff2 is most efficient.