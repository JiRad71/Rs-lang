class Component<T extends HTMLElement = HTMLElement> {
  public node: T;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as T;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default Component;
