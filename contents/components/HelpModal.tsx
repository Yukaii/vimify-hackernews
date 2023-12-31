import cx from "classnames"
import { Fragment, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { sitesNavigation } from "../utils/links"

const reactAppId = "hackernews-keybinding-help-modal"

function createOrAppendRootContainer() {
  const rootContainer = document.getElementById(reactAppId)
  if (rootContainer) {
    return rootContainer
  }
  const newRootContainer = document.createElement("div")
  newRootContainer.id = reactAppId
  newRootContainer.className = "tailwind"
  document.body.appendChild(newRootContainer)
  return newRootContainer
}

const container = createOrAppendRootContainer()

const postNavigationBindings = [
  { key: "<num>j", description: "Navigate Down" },
  { key: "<num>k", description: "Navigate Up" },
  { key: "gg", description: "Jump to first" },
  { key: "G", description: "Jump to last" },
  { key: "<num>G", description: "Jump to <num>th" },
  { key: "o", description: "Open Link" },
  { key: "O", description: "Open Link in New Tab" },
  { key: "v", description: "Upvote" },
  { key: "u", description: "Unvote" },
  { key: "d", description: "Open comments" },
  { key: "D", description: "Open comments in New Tab" },
  { key: "Escape", description: "Unfocus" },
  { key: "m", description: "Read More" },
  { key: "r", description: "Reload" },
  { key: "zz", description: "Scroll active item to center" },
  { key: "zt", description: "Scroll active item to top" },
  { key: "zb", description: "Scroll active item to bottom" },
  { key: "Ctrl+o", description: "Navigate back" },
  { key: "Ctrl+i", description: "Navigate forward" },
  { key: "Ctrl+d", description: "Scroll down half page" },
  { key: "Ctrl+u", description: "Scroll up half page" },
  { key: "Ctrl+f", description: "Scroll down full page" },
  { key: "Ctrl+b", description: "Scroll up full page" }
]

const siteNavigationBindings = Object.entries(sitesNavigation).map(
  ([key, value]) => ({
    key,
    description: `Go to ${new URL(value).pathname.split("/").pop()}`
  })
)

const Kbd = ({ children }: { children: string }) => (
  <kbd className="py-0.5 px-1 text-xs bg-gray-100 rounded border border-gray-300 border-solid">
    {children}
  </kbd>
)

export const HelpModal = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // use ? to toggle help modal
    // use esc to close help modal (and stop propagation)
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "?") {
        setShow(!show)
      }
      if (e.key === "Escape") {
        setShow(false)
        e.stopPropagation()
      }

      // prevent default behavior for all keys except for Escape
      if (e.key !== "Escape") {
        e.stopPropagation()
      }
    }

    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [show])

  return (
    <div
      className={cx(
        "modal p-4 bg-[#F6F6F0] border border-solid border-[#ff6600] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed overflow-auto max-h-[70%]",
        {
          hidden: !show
        }
      )}>
      <h2 className="my-0 text-sm font-bold">Keybindings Help</h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <h3 className="mb-3 text-sm text-center">Navigation</h3>
          {/* place shortcut and description in grid columns */}
          <div className="grid grid-cols-2 gap-2 items-center">
            {postNavigationBindings.map((binding) => (
              <Fragment key={binding.key}>
                <span className="text-right">
                  <Kbd>{binding.key}</Kbd>
                </span>
                <span>{binding.description}</span>
              </Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm text-center">Site Navigation</h3>
          <div className="grid grid-cols-2 gap-2 items-center">
            {siteNavigationBindings.map((binding) => (
              <Fragment key={binding.key}>
                <span className="text-right">
                  <Kbd>{binding.key}</Kbd>
                </span>
                <span>{binding.description}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function mountHelpModal() {
  const root = createRoot(container)
  root.render(<HelpModal />)
}
