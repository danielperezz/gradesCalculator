import { getCurrentTab } from "./utils.js";

chrome.runtime.onInstalled.addListener(async () => 
{
    for (const cs of chrome.runtime.getManifest().content_scripts) 
    {
      for (const tab of await chrome.tabs.query({url: cs.matches})) 
      {
        chrome.scripting.executeScript(
        {
          target: {tabId: tab.id},
          files: cs.js,
        });
      }
    }
});


chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) 
{
  var tab = await getCurrentTab();
  {
    if (tab.url == "https://students.technion.ac.il/local/tcurricular/grades")
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
          if(tabs.length == 0)
          { 
              console.log("could not send mesage to current tab");
          }
          else
          {
            sendMessageToContent();
          } 
      });
    }
  }
});

function sendMessageToContent()
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {cmd: "run"}, function(response) {
      if(chrome.runtime.lastError) {
        setTimeout(sendMessageToContent, 10000);
      }
      //console.log(response.status);
    });
  });
  
}
