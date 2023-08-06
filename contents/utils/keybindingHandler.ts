type KeybindingCallback = () => void;

export class KeybindingHandler {
  private keybindings: { [key: string]: KeybindingCallback } = {};
  private sequenceBuffer: string[] = [];
  private sequenceTimeout: any = null;

  registerKeybinding(key: string, callback: KeybindingCallback): void {
    this.keybindings[key] = callback;
  }

  handleKeypress(event: KeyboardEvent): void {
    const targetElement = event.target as HTMLElement;
    // If the keypress is inside an input or textarea, return immediately
    if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
      return;
    }

    const key = event.key;

    this.sequenceBuffer.push(key);

    // Clear buffer after a delay, making sure sequences are tight
    if (this.sequenceTimeout) {
      clearTimeout(this.sequenceTimeout);
    }

    this.sequenceTimeout = setTimeout(() => {
      this.sequenceBuffer = [];
    }, 1000);  // Clear after 1 second

    // Check for matches in keybindings
    for (let binding in this.keybindings) {
      if (this.sequenceBuffer.join('').endsWith(binding)) {
        this.keybindings[binding]();
        this.sequenceBuffer = [];  // Clear buffer after successful command
        return;
      }
    }
  }
}

