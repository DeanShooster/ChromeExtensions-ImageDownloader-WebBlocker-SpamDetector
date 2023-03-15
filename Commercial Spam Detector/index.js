// The given spam websites are just dummies.
const adsData = `
iframe[src*="doubleclick.net"], iframe[src*="googlesyndication.com"], 
div[id*="google_ads"], div[id*="adcontainer"], div[class*="ad"], 
div[class*="popup"], div[class*="modal"], 
a[href*="adclick"], a[href*="doubleclick.net"], a[href*="googlesyndication.com"]`;

const popupsData = `
div[id*="modal"], div[id*="popup"], div[class*="modal"], div[class*="popup"], div[class*="overlay"], 
div[class*="adblock"], div[class*="adoverlay"], div[class*="adsense"], div[class*="adunit"], 
div[class*="adbanner"], div[class*="adbox"], div[class*="adcontainer"], div[class*="adframe"], 
div[class*="adheader"], div[class*="aditem"], div[class*="adlayer"], div[class*="adline"], 
div[class*="adpanel"], div[class*="adplaceholder"], div[class*="ads"], div[class*="adsbox"], 
div[class*="adserver"], div[class*="advertising"], div[class*="advert"], div[class*="banner"], 
div[class*="floatads"], div[class*="floatbanner"], div[class*="floatbox"], div[class*="floatlayer"], 
div[class*="floatpanel"], div[class*="floatwrapper"], div[class*="layerads"], div[class*="overlayads"], 
div[class*="popupad"], div[class*="popupwrapper"], div[class*="promobox"], div[class*="sponsor"], 
div[class*="stickyads"], div[class*="sponsored"], div[class*="taboola"], div[class*="yads"], 
a[href*="doubleclick.net"], a[href*="googlesyndication.com"], a[href*="popads.net"], 
a[href*="popcash.net"], a[href*="propellerads.com"]`;

const spamValues = [ // Spam website dummy DB.
    "doubleclick.net", "googlesyndication.com", "popads.net", "popcash.net", 
    "propellerads.com",
];

const spamClasses = [
    'adclick', 'adoverlay', 'adsense' , 'adunit' , 'adbanner' , 'adbox', 'adcontainer',
    'adframe', 'adheader', 'aditem' , 'adlayer' , 'adline' , 'adpanel' ,'adplaceholder',
    'ads', 'adsbox', 'adserver', 'advertising', 'floatads' , 'sponsored'
];

const countAds = () => { return (document.querySelectorAll(adsData)).length; }
const countPopups = () => { return (document.querySelectorAll(popupsData)).length; }

// Heavy commercial Spam Detector.
function commercialSpamDetector(){
    const limit = 7;
    if(countAds() > limit || countPopups() > limit - 3) return true;
    return false;
}

// Spam Detector Algorithm or some sort of API tester like Google Safe Browsing API.
function removeCommercialSpam(){
    const elements = document.getElementsByTagName("*");
    const spamAttributes = ["src", "href", "data-src", "data-href"];
    for(let i = 0; i < elements.length; i++){
        if(spamClasses.includes(elements[i].className) )
            elements[i].className = 'remove-commercial-spam';
        for (let k = 0; k < spamAttributes.length; k++){
            const value = elements[i].getAttribute(spamAttributes[k]);
            if(value){
                for (let j = 0; j < spamValues.length; j++) {
                    if(value.indexOf(spamValues[j]) !== -1) 
                        elements[i].className = 'remove-commercial-spam';
                }
            }
        }
    }
}

if(commercialSpamDetector()){
    const commercialSpamAlert = document.createElement("div");
    commercialSpamAlert.className = 'commercial-spam-bubble';
    commercialSpamAlert.innerHTML = 'Spam Detected!';
    document.children[0].appendChild(commercialSpamAlert);
    setTimeout(() => {
        document.children[0].removeChild(commercialSpamAlert);
    }, 5000);
}
removeCommercialSpam();