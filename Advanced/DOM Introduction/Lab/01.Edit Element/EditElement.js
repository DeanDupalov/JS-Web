function editElement(element, match, replacer) {
    const text = element.textContent;
    element.textContent = text.split(match).join(replacer);
}