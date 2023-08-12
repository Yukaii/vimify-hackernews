type KeybindingCallback = (count?: number) => void

export class KeybindingHandler {
  private keybindings: { [key: string]: KeybindingCallback } = {}
  private sequenceBuffer: string[] = []
  private sequenceTimeout: number | null = null
  private countBuffer: string = ""

  registerKeybinding(key: string, callback: KeybindingCallback): void {
    this.keybindings[key] = callback
  }

  handleKeypress(event: KeyboardEvent): void {
    const targetElement = event.target as HTMLElement
    // If the keypress is inside an input or textarea, return immediately
    if (
      targetElement.tagName === "INPUT" ||
      targetElement.tagName === "TEXTAREA"
    ) {
      return
    }

    let key = event.key

    // If a number is pressed, store it in countBuffer
    if (/\d/.test(key)) {
      this.countBuffer += key
      return
    }

    // Capture Meta and Control key combinations
    if (event.metaKey) {
      key = `Meta+${key}`
    } else if (event.ctrlKey) {
      key = `Ctrl+${key}`
    }

    this.sequenceBuffer.push(key)

    // Clear buffer after a delay, making sure sequences are tight
    if (this.sequenceTimeout) {
      clearTimeout(this.sequenceTimeout)
    }

    this.sequenceTimeout = window.setTimeout(() => {
      this.sequenceBuffer = []
      this.countBuffer = ""
    }, 10 * 1000) // Clear after 10 second

    // Check for matches in keybindings
    // start with longest bindings first
    const bindingKeys = Object.keys(this.keybindings).sort(
      (a, b) => b.length - a.length
    )

    for (const binding of bindingKeys) {
      if (this.sequenceBuffer.join("").endsWith(binding)) {
        const count = this.countBuffer ? parseInt(this.countBuffer) : undefined
        this.keybindings[binding](count)
        this.sequenceBuffer = [] // Clear buffer after successful command
        this.countBuffer = ""
        return
      }
    }
  }
}
