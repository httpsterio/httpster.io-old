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

[ ] go through glyphs and add the required

[ ] figure out why njk for-loops end up with whitespace from indentation

[ ] fix netlify node_env in netlify.toml

[ ] design and write?