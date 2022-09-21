import { getCurrentTab } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => 
{
    const activeTab = await getCurrentTab();
    if (activeTab.url == "https://students.technion.ac.il/local/tcurricular/grades")
    {
        popUpUI(true);
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