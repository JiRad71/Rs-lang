const createElement = (parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') => {
  const el = document.createElement(tagName);
  el.className = className;
  el.innerHTML = content;
  if (parentNode) {
    parentNode.append(el);
  }
  return el;
}

export default createElement;
