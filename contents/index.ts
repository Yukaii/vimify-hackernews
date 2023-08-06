import { KeybindingHandler } from './utils/keybindingHandler'
import { NavigationStackManager } from './utils/navigationStackManager'
import './style.css'

const navManager = new NavigationStackManager();
const handler = new KeybindingHandler();

handler.registerKeybinding('j', () => {
  navManager.navigateDown();
});

handler.registerKeybinding('k', () => {
  navManager.navigateUp();
});

handler.registerKeybinding('gg', () => {
  navManager.jumpToTop();
});

handler.registerKeybinding('G', () => {
  navManager.jumpToBottom();
});

handler.registerKeybinding('Escape', () => {
  navManager.unfocus();
});

const sitesNavigation = {
  'gh': 'https://news.ycombinator.com/news',
  'gs': 'https://news.ycombinator.com/show',
  'gt': 'https://news.ycombinator.com/threads',
  'ga': 'https://news.ycombinator.com/ask',
  'gj': 'https://news.ycombinator.com/jobs',
  'gn': 'https://news.ycombinator.com/submit',
}

for (let key in sitesNavigation) {
  handler.registerKeybinding(key, () => {
    window.location.href = sitesNavigation[key];
  });
}

// more link
handler.registerKeybinding('m', () => {
  navManager.goToMoreLink();
});

document.addEventListener('keydown', (event) => {
  handler.handleKeypress(event);
});
