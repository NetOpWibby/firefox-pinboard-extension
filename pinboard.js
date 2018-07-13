/* eslint-env browser, es6 *//* global browser */ "use strict";



const baseUrl = "https://pinboard.in";

function saveToPinboard (options = { description: "", readLater: false, title: "", url: "" }) {
  let { description, readLater, title, url } = options;

  const pinboardUrl = `${baseUrl}/add?`;
  const next = encodeURIComponent("/close");
  let fullUrl;

  if (readLater) {
    fullUrl = `${pinboardUrl}later=yes&noui=yes&next=${next}&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  }

  fullUrl = `${pinboardUrl}next=${next}&url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}&title=${ encodeURIComponent(title)}`;

  browser.windows.create({
    width: 660,
    height: 400,
    type: "popup",
    url: fullUrl
  });
}



function openAllBookmarks() { // eslint-disable-line
  browser.tabs.create({ url: baseUrl });
}

function openUnreadBookmarks() { // eslint-disable-line
  browser.tabs.create({ url: `${baseUrl}/toread/` });
}

function saveToReadLater(options) { // eslint-disable-line
  saveToPinboard({ ...options, readLater: true });
}
