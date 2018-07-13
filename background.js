/* eslint-env browser, es6 *//* global browser, openAllBookmarks, openUnreadBookmarks, saveToPinboard, saveToReadLater */ "use strict";



browser.runtime.onMessage.addListener((message, sender) => {
  switch(message) {
    case "save-to-pinboard" || "save-to-read-later":
      getTabInfo().then(options => saveBookmark(message, options));
      break;

    case "open-unread-bookmarks":
      openUnreadBookmarks();
      break;

    case "open-all-bookmarks":
      openAllBookmarks();
      break;

    case "close-this":
      browser.tabs.remove(sender.tab.id);
      break;

    default:
      break;
  }
});

browser.commands.onCommand.addListener(command => {
  if (command === "save-to-pinboard" || command === "save-to-read-later") {
    getTabInfo().then(options => saveBookmark(command, options));
  }
});



//  H E L P E R S

function getDescription() {
  function getSelectionOrDescription() {
    const meta = window.document.querySelector("meta[name=description]");
    let description = "";
    let selection = "";

    if (window.getSelection) selection = window.getSelection().toString();
    if (meta) description = meta.getAttribute("content") || "";

    return selection || description;
  }

  return browser.tabs.executeScript({
    allFrames: false,
    code: `(${getSelectionOrDescription})()`
  });
}

function getTabInfo() {
  return browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    const tab = tabs[0];

    const tabInfo = {
      description: "",
      title: tab.title,
      url: tab.url
    };

    return getDescription().then(results => {
      return {
        ...tabInfo,
        description: results[0]
      };
    }, () => tabInfo);
  });
}

function saveBookmark (command, options) {
  if (command === "save-to-pinboard") saveToPinboard(options);
  else if (command === "save-to-read-later") saveToReadLater(options);
}
