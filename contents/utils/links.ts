const threadsAnchors = document.querySelectorAll(
  ".pagetop a"
)

const threadsAnchor = Array.from(threadsAnchors).find(
  (anchor: HTMLAnchorElement) => anchor.innerText === "threads"
)

const threads = threadsAnchor ? threadsAnchor.href : ""

export const sitesNavigation = {
  gh: "https://news.ycombinator.com/news",
  gs: "https://news.ycombinator.com/show",
  gt: threads,
  ga: "https://news.ycombinator.com/ask",
  gj: "https://news.ycombinator.com/jobs",
  gn: "https://news.ycombinator.com/submit",
  gc: "https://news.ycombinator.com/newcomments"
}
