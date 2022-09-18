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


chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab) =>
{
  if (changedInfo.status === "complete" && tab.url && tab.url==="https://students.technion.ac.il/local/tcurricular/grades") {
  {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
      {
          if(tabs.length == 0)
          { 
              console.log("could not send mesage to current tab");
          }
          else
          {
              chrome.tabs.sendMessage(tabs[0].id, {cmd: "run"}, function(response)
              {
                console.log("hey there");
              });
          } 
      });
    }
  }
});