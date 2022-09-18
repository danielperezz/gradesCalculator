import { getCurrentTab } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => 
{
    const activeTab = await getCurrentTab();
    if (activeTab.url == "https://students.technion.ac.il/local/tcurricular/grades")
    {
        popUpUI(true);
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        // {
        //     if(tabs.length == 0)
        //     { 
        //         console.log("could not send mesage to current tab");
        //     }
        //     else
        //     {
        //     chrome.tabs.sendMessage(tabs[0].id, {command:"run"}, function()
        //     {
        //         console.log("Hello");
        //     });
        //     };  
        // });
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