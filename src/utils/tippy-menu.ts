interface TippyMenu {
  title: string
  handle: (e: Event) => void
}

const tippyMenu = (links: TippyMenu[]): HTMLElement => {
  const ul = document.createElement("ul");
  ul.classList.add('tippy-menu-list')
  links.forEach(({ title, handle }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.innerHTML = title
    a.onclick = handle
    li.appendChild(a)
    ul.appendChild(li)
  })
  return ul
}

export default tippyMenu