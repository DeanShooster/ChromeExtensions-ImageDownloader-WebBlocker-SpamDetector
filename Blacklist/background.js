chrome.contextMenus.create({
    title: 'Blacklist',
    onclick: () => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {command: "blacklist"});
        });
    }
});