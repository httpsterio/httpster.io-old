# httpster.io

Forked from [Supermaya](https://github.com/madebymike/supermaya), which was made by [MadebyMike](https://github.com/MadeByMike).

Pulled off all off the Keystone specific settings and imported some layout changes Mike made on his personal site but not in Supermaya. Using this as my personal boilerplate, just gonna strip it some and redesign.

Font was subsetted with 
```
glyphhanger .\text.txt --subset=Inter-roman.var.woff2 --formats=woff2 
```

text.txt is a text file containing the desired glyphs. Doesn't run on WSL, had to run on Windows.

## 

Todo:

[ ] go through glyphs and add the required. add é

[ ] design and write?

[ ] figcaptions in parse-transform broken if they have title? Fix upstream. Sets img url to null (use data-src)

[ ] svg anchor imgs in headers doesn't accept ch units. change to pixes or omit width and go with ex for height (PR)

Done: 

[x] figure out why njk for-loops end up with whitespace from indentation

[x] fix netlify node_env in netlify.toml
