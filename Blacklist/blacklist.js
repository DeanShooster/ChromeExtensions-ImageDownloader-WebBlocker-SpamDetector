const blacklistStorage = 'blacklist';

function blacklistWebsite(){
    const blacklist = localStorage.getItem(blacklistStorage);
    if(blacklist){
        const myBlacklistArr = JSON.parse(blacklist);
        if(myBlacklistArr.includes(window.location.hostname)) {
            myBlacklistArr.splice(myBlacklistArr.indexOf(window.location.hostname), 1);
            if(myBlacklistArr.length === 0 ) 
                localStorage.removeItem(blacklistStorage);
            else {
                const newBlacklist = JSON.stringify(myBlacklistArr);
                localStorage.setItem(blacklistStorage,newBlacklist);
            }
            return;
        }
        myBlacklistArr.push(window.location.hostname);
    } else {
        const blacklistArr = [window.location.hostname];
        const blacklist = JSON.stringify(blacklistArr);
        localStorage.setItem(blacklistStorage,blacklist);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'blacklist') blacklistWebsite();
    location.reload();
});
