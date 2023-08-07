import { KeybindingHandler } from './utils/keybindingHandler'
import { NavigationStackManager } from './utils/navigationStackManager'
import './style.css'
import { mountHelpModal } from './components/HelpModal';
import { sitesNavigation } from './utils/links';
import type { PlasmoCSConfig } from 'plasmo';

const navManager = new NavigationStackManager();
const handler = new KeybindingHandler();

handler.registerKeybinding('j', (count) => {
  navManager.navigateDown(count);
});

handler.registerKeybinding('k', (count) => {
  navManager.navigateUp(count);
});

handler.registerKeybinding('gg', () => {
  navManager.jumpToTop();
});

handler.registerKeybinding('G', (count) => {
  navManager.jumpToBottom(count);
});

handler.registerKeybinding('zz', () => {
  navManager.centerScroll();
});

handler.registerKeybinding('zt', () => {
  navManager.alignTopScroll();
});

handler.registerKeybinding('zb', () => {
  navManager.alignBottomScroll();
});

handler.registerKeybinding('o', () => {
  navManager.openLink();
});

handler.registerKeybinding('O', () => {
  navManager.openLinkInNewTab();
});

handler.registerKeybinding('u', () => {
  navManager.upvote();
});

// unvote
handler.registerKeybinding('U', () => {
  navManager.unvote();
});

// discussion
handler.registerKeybinding('d', () => {
  navManager.openDiscussion();
});

// discussion in new tab
handler.registerKeybinding('D', () => {
  navManager.openDiscussionInNewTab();
});

handler.registerKeybinding('Escape', () => {
  navManager.unfocus();
});

handler.registerKeybinding('Ctrl+o', () => {
  navManager.navigateBack();
});

handler.registerKeybinding('Ctrl+i', () => {
  navManager.navigateForward();
});

for (let key in sitesNavigation) {
  handler.registerKeybinding(key, () => {
    window.location.href = sitesNavigation[key];
  });
}

// more link
handler.registerKeybinding('m', () => {
  navManager.goToMoreLink();
});

handler.registerKeybinding('r', () => {
  window.location.reload();
});

document.addEventListener('keydown', (event) => {
  handler.handleKeypress(event);
});

// mouse click to unfocus
document.addEventListener('click', () => {
  navManager.unfocus();
});

mountHelpModal();

export const config: PlasmoCSConfig = {
  matches: ["https://news.ycombinator.com/*"] // Only relay messages from this domain
}
