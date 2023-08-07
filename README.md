# Vim-inspired keybinding for HackerNews website

https://github.com/Yukaii/hackernews-vim-keybinding/assets/4230968/9e16b212-af1e-44a9-97b5-c025a0e34f76

## Usage

| Keybinding | Description                  |
| :--------- | :--------------------------- |
| `<num>j`   | Navigate Down                |
| `<num>k`   | Navigate Up                  |
| `gg`       | Jump to first                |
| `G`        | Jump to last                 |
| `<num>G`   | Jump to `<num>`th            |
| `o`        | Open Link                    |
| `O`        | Open Link in New Tab         |
| `v`        | Upvote                       |
| `u`        | Unvote                       |
| `d`        | Open comments                |
| `D`        | Open comments in New Tab     |
| `Escape`   | Unfocus                      |
| `m`        | Read More                    |
| `r`        | Reload                       |
| `zz`       | Scroll active item to center |
| `zt`       | Scroll active item to top    |
| `zb`       | Scroll active item to bottom |
| `Ctrl+o`   | Navigate back                |
| `Ctrl+i`   | Navigate forward             |

### Site navigation

| Keybinding | URL                                                                                  |
| :--------- | :----------------------------------------------------------------------------------- |
| `gh`       | [https://news.ycombinator.com/news](https://news.ycombinator.com/news)               |
| `gs`       | [https://news.ycombinator.com/show](https://news.ycombinator.com/show)               |
| `gt`       | Go to Threads                                                                        |
| `ga`       | [https://news.ycombinator.com/ask](https://news.ycombinator.com/ask)                 |
| `gj`       | [https://news.ycombinator.com/jobs](https://news.ycombinator.com/jobs)               |
| `gn`       | [https://news.ycombinator.com/submit](https://news.ycombinator.com/submit)           |
| `gc`       | [https://news.ycombinator.com/newcomments](https://news.ycombinator.com/newcomments) |

## Special Thanks to GPT-4 chan

https://chat.openai.com/share/dc85aa8e-039d-48ae-84a9-eb72289d5992

## Prior Works

I knew some may exist, but I want to make my own version 🤣.

- Refined Hacker News: https://github.com/plibither8/refined-hacker-news
    - Support many features. My extension only focus on vim style keyboard navigation with my own taste.
- `hackernews-platinum`: https://github.com/fberger/hackernews-platinum
- `hacker-news-keyboard-navigation`: https://github.com/ZYinMD/hacker-news-keyboard-navigation
- `hackercut`: https://chrome.google.com/webstore/detail/hacker-news-shortcut/dmiimkldokblocpmleogaeohkbffnobo

## License

MIT

<!-- Plasmo archived

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

-->
