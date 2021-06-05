const TITLE = "Mon extension";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];


/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
Argument url must be a valid URL string.
*/
function protocolIsApplicable(url) {
  const protocol = (new URL(url)).protocol;
  return APPLICABLE_PROTOCOLS.includes(protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {


    //recuperer la liste des domaines compatibles.


    if (0 < 1) { //verifier si le domaine est dans la liste, si oui alors on sinon off
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE});
    browser.pageAction.show(tab.id);
  } else {
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE});
    browser.pageAction.show(tab.id);
  }
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});