const safeURL = [
    'https://www.youtube.com/', 
    'https://www.google.com/'
];


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && !safeURL.includes(tab.url)) {
      chrome.tabs.executeScript(tabId, {file: "index.js"});
    }
});
  