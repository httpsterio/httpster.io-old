# httpster.io
11.09.2022

Forked from [Supermaya](https://github.com/madebymike/supermaya), which was made by [MadebyMike](https://github.com/MadeByMike).

Pulled off all off the Keystone specific settings and imported some layout changes Mike made on his personal site but not in Supermaya. Using this as my personal boilerplate, just gonna strip it some and redesign.

Font was subsetted with 
```
pyftsubset site/src/fonts/Inter-roman.var.woff2 --output-file=site/src/fonts/inter-subset.woff2 --flavor=woff2 --layout-features=kern --text-file=font-glyphs.txt
```

font-glyphs is a text file containing the desired glyphs.

requires:
```bash
pip3 install pycryptodomex
pip3 install websockets
pip3 install mutagen
pip3 install zopfli
pip3 install brotli
pip3 install fonttools
```

## Todo:

[ ] design and write?

[?] figcaptions in parse-transform broken if they have title? Fix upstream. Sets img url to null (use data-src)

[ ] svg anchor imgs in headers doesn't accept ch units. change to pixes or omit width and go with ex for height (PR)

Done:

[x] go through glyphs and add the required. add é

[x] figure out why njk for-loops end up with whitespace from indentation

[x] fix netlify node_env in netlify.toml

