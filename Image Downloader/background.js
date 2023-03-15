chrome.contextMenus.create({
    title: 'Download All Images',
    onclick: () => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {command: "download_all_images"});
        });
    }
});
