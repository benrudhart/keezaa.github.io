# Why `.nojekyll` exists

This site uses Apple Universal Links and must expose:

- `/.well-known/apple-app-site-association`

On GitHub Pages, keeping a `.nojekyll` file at repository root ensures dot-paths like `.well-known` are published as static files without Jekyll processing.

