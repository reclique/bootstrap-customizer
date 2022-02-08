# Customizeable bootstrap without build step

This is a small application that can take bootstrap variables through a URL and responds and returns the comiled CSS. It's great for rapid prototyping or situations were you don't want to build every bootstrap color. This tool will be less necessary once bootstrap defaults to CSS variables globally instead of relying in SASS variables.

!> This tool is published at [customizer.reclique.com](https://customizer.reclique.com)


## Developing

Once you've cloned/downloaded the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Cloudflare automatically listens for changes on the master branch and deploys them. There is no need to run `npm run build` since ~cloudflare~ `eb` will do it.

You can preview the production build with `npm run preview`.

## TODOs

* ~deploy to cloudflare~ Abandoned because cloudflare pages cannot use `fs`. Deploying to aws-eb instead
* ~add tags~
* ~link to variable page~
* prism (or other) syntax highlighting
* do we need legal language?
* add language about submitting PRs with new bootstrap versions?
* default css to minimized and flag to skip minimizing?