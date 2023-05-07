---
title: Subsetting fonts with Python 3 and FontTools
date: "2023-05-06"
description: ""
writingtime: "null"
draft:true
tags:
  - fonts
  - webdev
  - typography
  - commandline
---

I'm an avid fan of the static site generator Eleventy. In fact, this site was built with it _(and the lovely starter project Supermaya by [Mike Riethmuller](https://github.com/MadeByMike/supermaya))_. While trying to get my site to raise in the ranks on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/httpster-io/), I did my darnedest to optimize every aspect of the site. One of the things I did was to subset the fonts I use on the site. This is a short post on why and how I did it.

## What is font subsetting and why should I care?

Don't you just hate it when pages are slow to load? Even more annoying is when a page seems to have loaded but the proper fonts come in with a delay and the text jumps around. This is because the browser has to download the font files before it can render the text. The larger the font files, the longer it takes to download them. Larger fonts take a longer time to download than a small font, even if the larger font is only used for a few characters.

Subsetting a font means removing all of the extra symbols and characters from the font file that you don't need and generating a new, subsetted font file with just the necessary characters. This new font file is much smaller than the original and will download faster. If you want to take people with slower internet speeds into consideration or you want to make your site more green, it certainly doesn't hurt to optimize your site's overall data footprint.