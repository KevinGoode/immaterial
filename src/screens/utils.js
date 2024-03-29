

const DEFAULT_TITLE = 'Sample App';

export function pageLoaded(title) {
  if (document) {
    if (title && typeof title === 'string') {
      title = `${title} | ${DEFAULT_TITLE}`;
    } else {
      title = DEFAULT_TITLE;
    }
    console.log("Page loaded: " + title);
    document.title = title;
  }
}

export default { pageLoaded };
