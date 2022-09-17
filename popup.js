import { getCurrentTab } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => 
{
    
    const activeTab = await getCurrentTab();
    if (activeTab.url == "https://students.technion.ac.il/local/tcurricular/grades")
    {
        const container = document.getElementsByClassName("container")[0];
        // const activateSwitch = document.createElement("input");
        // const activateLabel = document.createElement("label");
        // activateSwitch.type = "checkbox";
        // activateSwitch.id = "activate";
        // activateLabel.for = "activate";
        container.innerHTML =
        `<h1>Activate</h1>
        <input type="checkbox" id="activate" /><label for="activate"></label>
        <div class="msg">
            <!-- <p>msg would appear here</p> -->
        </div>
        <script src="popup.js"></script>`;
        var activateSwitch = document.querySelector("input[id=activate]");
        // container.appendChild(activateSwitch);
        // container.appendChild(activateLabel);
        chrome.runtime.sendMessage({ cmd: "getStatus"}, function(response){
                activateSwitch.checked = response.value;
                console.log(response.value);
        });

        activateSwitch.addEventListener('change', function()
        {
            if(this.checked) 
            {
                chrome.runtime.sendMessage({ cmd: "setStatus" , data: true}, function(response){
                    console.log("SENT MESSAGE");
                    console.log(response.res);
                });   
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
                {
                    if(tabs.length == 0)
                    { 
                        console.log("could not send mesage to current tab");
                    }
                    else
                    {
                    chrome.tabs.sendMessage(tabs[0].id, {command:"run"}, function()
                    {
                        console.log("Hello");
                    });
                    };  
                });
            }
            else
            {
                chrome.runtime.sendMessage({ cmd: "setStatus" , data: false}, function(response){
                    console.log(response.res);
                });   
            }
                
        });
    }
    else {
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<p>This Is not a grades page</p>';
        // container.innerHTML = '<h1>This is not a grades page</h1>';
    };
});