import cx from "classnames"
import { useEffect, useState } from "react"
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
  { key: "u", description: "Upvote" },
  { key: "U", description: "Unvote" },
  { key: "d", description: "Open comments" },
  { key: "D", description: "Open comments in New Tab" },
  { key: "Escape", description: "Unfocus" },
  { key: "m", description: "Read More" },
  { key: "r", description: "Reload" },
  { key: "zz", description: "Scroll active item to center" },
  { key: "zt", description: "Scroll active item to top" },
  { key: "zb", description: "Scroll active item to bottom" }
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
          <h3 className="mb-1 text-sm">Navigation:</h3>
          <ul className="pl-5 leading-6 list-disc">
            {postNavigationBindings.map((binding) => (
              <li key={binding.key}>
                <Kbd>{binding.key}</Kbd>: {binding.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-1 text-sm">Site Navigation:</h3>
          <ul className="pl-5 leading-6 list-disc">
            {siteNavigationBindings.map((binding) => (
              <li key={binding.key}>
                <Kbd>{binding.key}</Kbd>: {binding.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function mountHelpModal() {
  const root = createRoot(container)
  root.render(<HelpModal />)
}
