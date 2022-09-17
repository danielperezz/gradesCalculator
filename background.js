let activityStatus = false;

chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
      for (const tab of await chrome.tabs.query({url: cs.matches})) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: cs.js,
        });
      }
    }
  });

  chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse){
      if (msg.cmd = "getStatus")
      {
        sendResponse({value: activityStatus});
      }
      if (msg.cmd == "setStatus")
      {
        activityStatus = msg.data;
        console.log(msg.data);
        sendResponse({res: "set"});
      }

    });