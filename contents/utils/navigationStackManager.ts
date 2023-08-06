type PostRowElement = Element

export class NavigationStackManager {
  private posts: NodeListOf<PostRowElement>
  private activeIndex: number = -1

  constructor() {
    this.posts = document.querySelectorAll("tr.athing")
  }

  setActive(index: number): void {
    // Clear the existing active post if any
    this.posts.forEach((post) => post.classList.remove("active"))

    // Set the new active post
    if (this.posts[index]) {
      this.posts[index].classList.add("active")
      this.activeIndex = index
    }
  }

  navigateUp(): void {
    this.initializeIndexIfNecessary()
    if (this.initializeIndexIfNecessary()) {
      return
    }

    if (this.activeIndex > 0) {
      this.setActive(this.activeIndex - 1)
    }

    this.scrollActiveIntoView()
  }

  jumpToTop(): void {
    this.setActive(0)
    this.scrollActiveIntoView()
  }

  jumpToBottom(): void {
    this.setActive(this.posts.length - 1)
    this.scrollActiveIntoView()
  }

  navigateDown(): void {
    if (this.initializeIndexIfNecessary()) {
      return
    }

    if (this.activeIndex < this.posts.length - 1) {
      this.setActive(this.activeIndex + 1)
    }

    this.scrollActiveIntoView()
  }

  openLink(): void {
    const activePost = this.getActivePost()

    if (activePost) {
      const link = activePost.querySelector(".titleline a") as HTMLAnchorElement

      if (link) {
        link.click()
      }
    }
  }

  openLinkInNewTab(): void {
    const activePost = this.getActivePost()

    if (activePost) {
      const link = activePost.querySelector(".titleline a") as HTMLAnchorElement

      if (link) {
        window.open(link.href, "_blank")
      }
    }
  }

  upvote(): void {
    const activePost = this.getActivePost()

    if (activePost) {
      const upvoteLink = activePost.querySelector(
        ".votelinks a"
      ) as HTMLAnchorElement

      if (upvoteLink) {
        upvoteLink.click()
      }
    }
  }

  unvote(): void {
    const actionRow = this.getActivePostActionRow()

    if (!actionRow) {
      return
    }

    // id starts with unv
    const unvoteLink = actionRow.querySelector(
      "span[id^='unv'] > a"
    ) as HTMLAnchorElement

    if (unvoteLink) {
      unvoteLink.click()
    }
  }

  unfocus(): void {
    this.posts.forEach((post) => post.classList.remove("active"))
    this.activeIndex = -1
  }

  getActivePost(): PostRowElement {
    return this.posts[this.activeIndex]
  }

  getActivePostActionRow(): Element {
    const activePost = this.getActivePost()

    if (activePost) {
      return activePost.nextElementSibling
    }
  }

  initializeIndexIfNecessary(): boolean {
    if (this.activeIndex === -1) {
      this.setActive(0)

      this.scrollActiveIntoView()

      return true
    }

    return false
  }

  scrollActiveIntoView(): void {
    const activePost = this.posts[this.activeIndex]

    if (activePost) {
      activePost.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      })
    }
  }

  goToMoreLink(): void {
    const moreLink = this.getMoreLink()

    if (moreLink) {
      moreLink.click()
    }
  }

  private getMoreLink(): HTMLAnchorElement {
    return document.querySelector("a.morelink")
  }
}
