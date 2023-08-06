import cx from "classnames"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import { sitesNavigation } from "./links"

const reactAppId = "hackernews-keybinding-help-modal"

function createOrAppendRootContainer() {
  const rootContainer = document.getElementById(reactAppId)
  if (rootContainer) {
    return rootContainer
  }
  const newRootContainer = document.createElement("div")
  newRootContainer.id = reactAppId
  document.body.appendChild(newRootContainer)
  return newRootContainer
}

const container = createOrAppendRootContainer()

const postNavigationBindings = [
  { key: "j", description: "Navigate Down" },
  { key: "k", description: "Navigate Up" },
  { key: "gg", description: "Jump to first" },
  { key: "G", description: "Jump to last" },
  { key: "o", description: "Open Link" },
  { key: "O", description: "Open Link in New Tab" },
  { key: "u", description: "Upvote" },
  { key: "U", description: "Unvote" },
  { key: "d", description: "Open comments" },
  { key: "D", description: "Open comments in New Tab" },
  { key: "Escape", description: "Unfocus" },
  { key: "m", description: "Read More" },
  { key: "r", description: "Reload" },
]

const siteNavigationBindings = Object.entries(sitesNavigation).map(
  ([key, value]) => ({
    key,
    description: `Go to ${new URL(value).pathname.split("/").pop()}`
  })
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
        "modal p-4 bg-[#F6F6F0] border border-[#ff6600] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        {
          hidden: !show
        }
      )}
      style={{
        position: "fixed"
      }}>
      <h2 className="mb-4 font-bold">Keybindings Help</h2>

      <div className="flex flex-col md:flex-row">
        <div>
          <h3 className="mb-2">Post Navigation:</h3>
          <ul className="pl-5 mb-4 list-disc">
            {postNavigationBindings.map((binding) => (
              <li key={binding.key}>
                <kbd className="p-1 bg-gray-100 rounded border">
                  {binding.key}
                </kbd>
                : {binding.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2">Site Navigation:</h3>
          <ul className="pl-5 list-disc">
            {siteNavigationBindings.map((binding) => (
              <li key={binding.key}>
                <kbd className="p-1 bg-gray-100 rounded border">
                  {binding.key}
                </kbd>
                : {binding.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function mountHelpModal() {
  ReactDOM.render(<HelpModal />, container)
}
