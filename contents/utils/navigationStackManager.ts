type PostRowElement = Element

export class NavigationStackManager {
  private posts: Array<PostRowElement>
  private activeIndex: number = -1

  constructor() {
    this.posts = Array.from(document.querySelectorAll("tr.athing"))
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

  navigateUp(count?: number): void {
    this.initializeIndexIfNecessary()
    if (this.initializeIndexIfNecessary()) {
      return
    }

    if (count) {
      const targetIndex = this.activeIndex - count

      if (targetIndex >= 0) {
        this.setActive(targetIndex)
      } else {
        this.setActive(0)
      }
    } else {
      if (this.activeIndex > 0) {
        this.setActive(this.activeIndex - 1)
      }
    }

    this.scrollActiveIntoView()
  }

  jumpToTop(): void {
    this.setActive(0)
    this.scrollActiveIntoView()
  }

  jumpToBottom(count?: number): void {
    if (count) {
      // find target post
      const targetPostIndex = this.posts.findIndex((post) => {
        return post.querySelector(".rank")?.textContent?.trim()?.match(count.toString())
      })

      if (targetPostIndex !== -1) {
        this.setActive(targetPostIndex)
      }

    } else {
      this.setActive(this.posts.length - 1)
    }

    this.scrollActiveIntoView()
  }

  navigateDown(count?: number): void {
    if (this.initializeIndexIfNecessary()) {
      return
    }

    if (count) {
      const targetIndex = this.activeIndex + count

      if (targetIndex < this.posts.length) {
        this.setActive(targetIndex)
      } else {
        this.setActive(this.posts.length - 1)
      }
    } else {
      if (this.activeIndex < this.posts.length - 1) {
        this.setActive(this.activeIndex + 1)
      }
    }

    this.scrollActiveIntoView()
  }

  centerScroll(): void {
    const activePost = this.getActivePost()

    if (activePost) {
      activePost.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }
  }

  alignTopScroll(): void {
    const activePost = this.getActivePost()

    if (activePost) {
      activePost.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  alignBottomScroll(): void {
    const activePost = this.getActivePost()

    if (activePost) {
      activePost.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }
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

  openDiscussion(): void {
    const actionRow = this.getActivePostActionRow()

    if (!actionRow) {
      return
    }

    // span.age > a
    const discussionLink = actionRow.querySelector(
      "span.age > a"
    ) as HTMLAnchorElement

    if (discussionLink) {
      discussionLink.click()
    }
  }

  openDiscussionInNewTab(): void {
    const actionRow = this.getActivePostActionRow()

    if (!actionRow) {
      return
    }

    // span.age > a
    const discussionLink = actionRow.querySelector(
      "span.age > a"
    ) as HTMLAnchorElement

    if (discussionLink) {
      window.open(discussionLink.href, "_blank")
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

    const isInViewport = (elem: Element) => {
      const bounding = elem.getBoundingClientRect()
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    if (activePost && !isInViewport(activePost)) {
      activePost.scrollIntoView({
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
