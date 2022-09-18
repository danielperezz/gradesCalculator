import { getCurrentTab } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => 
{
    const activeTab = await getCurrentTab();
    if (activeTab.url == "https://students.technion.ac.il/local/tcurricular/grades")
    {
        popUpUI(true);
        var activateSwitch = document.querySelector("input[id=activate]");
        chrome.runtime.sendMessage({cmd: "getActivityStatus"}, function(response)
        {
            activityStatusUI(response, activateSwitch);
        }); 

        activateSwitch.addEventListener('change', function()
        {
            if(this.checked) 
            {
                activityStatusUI(true, activateSwitch);
                chrome.runtime.sendMessage({cmd: "setActivityStatus", data: true}, function(response)
                {
                    console.log(response);
                }); 
                
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
                {
                    if(tabs.length == 0)
                    { 
                        console.log("could not send mesage to current tab");
                    }
                    else
                    {
                    chrome.tabs.sendMessage(tabs[0].id, {command:"enable"}, function()
                    {
                        console.log("Hello");
                    });
                    };  
                });
            }
            else
            {
                activityStatusUI(false, activateSwitch);
                chrome.runtime.sendMessage({cmd: "setActivityStatus", data: false});
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
                {
                    if(tabs.length == 0)
                    { 
                        console.log("could not send mesage to current tab");
                    }
                    else
                    {
                    chrome.tabs.sendMessage(tabs[0].id, {command:"disable"}, function()
                    {
                        console.log("Hello");
                    });
                    };  
                });
            }
                
        });
    }
    else {
        popUpUI(false);
    };
});

function popUpUI(isCorrectPage)
{
    var correctPageDiv = document.getElementById("correct-page");
    var randomPageDiv = document.getElementById("random-page");
    if(isCorrectPage)
    {
        correctPageDiv.style.display = 'block';
        randomPageDiv.style.display = 'none';
    }
    else
    {
        correctPageDiv.style.display = 'none';
        randomPageDiv.style.display = 'block';
        var gradesButton = document.getElementById("grades-link");
        gradesButton.addEventListener('click', function()
        {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var tab = tabs[0];
                window.close();
                chrome.tabs.update(tab.id, {url: 'https://students.technion.ac.il/local/tcurricular/grades'});
            });
        });

    }
}

function activityStatusUI(isActive, activateSwitch)
{
    var heading = document.getElementById('enable');
    console.log(heading);
    if (isActive)
    {
        activateSwitch.checked = isActive;
        heading.innerHTML = "Disable";
    }
    else{
        activateSwitch.checked = isActive;
        heading.innerHTML= "Enable";
    }
}