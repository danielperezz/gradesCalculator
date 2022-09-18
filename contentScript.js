function setInputBoxes(tables)
    {
        for (let i=2; i<tables.length; i++)
        {
            for(let row of tables[i].children)
            {
                const alternativeGradeInput = document.createElement('input');
                alternativeGradeInput.type = "number";
                row.appendChild(alternativeGradeInput);
            }
        }
    } 

    function setTableButtons(averages, tables, fictCoursesTable)
    {
        for (let i=1; i<averages.length; i++)
        {
            const semester_button = document.createElement('button');
            semester_button.innerHTML = "חשב ממוצע סמסטר";
            averages[i].childNodes[1].appendChild(semester_button);
            let averageUI = averages[i].childNodes[1].childNodes[7].childNodes[1];
            semester_button.addEventListener('click', function(){
                onPress(Array.from(tables).slice(i+1, i+2), averageUI, fictCoursesTable=fictCoursesTable); //the raltionship between the tbody and it's foot
            });
        }
    }

    function setTotalButton(tables, fictcoursesTable)
    {
        const firstTable = document.getElementsByClassName('table table-sm');
        const whole_button = document.createElement('button');
        whole_button.innerHTML = "חשב ממוצע כללי";
        whole_button.style.paddingBlock = "100xp";
        firstTable[0].appendChild(whole_button);
        const wholeAverageUI = document.querySelector("#region-main > div > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(2)");
        whole_button.addEventListener('click', function(){
            onPress(Array.from(tables).slice(2), wholeAverageUI, fictcoursesTable, true);
        });
    }

    function setNewCousesTable()
    {
        var mainBody = document.querySelector("#region-main")
        var coursesTable = document.createElement('tbody');
        var headingTable = document.createElement('tbody');
        var addNewCourseButton = document.createElement('button');
        var divider = document.createElement('hr');
        var buttonRow = document.createElement('tr');
        var heading = document.createElement('th');
        var buttonCell = document.createElement('th');
        var headersRow = document.createElement('tr');
        var gradeHeader = document.createElement('th');
        var creditHeader = document.createElement('th');

        addNewCourseButton.className = "add-new-course-button";
        divider.cleassName = "divider";
        coursesTable.className = "courses-table";
        gradeHeader.className= "courses-th";
        creditHeader.className= "courses-th";
        heading.className = "courses-heading";
        headingTable.className = "courses-table";

        addNewCourseButton.innerHTML = "הוסף קורס";
        creditHeader.innerHTML="נקודות";
        gradeHeader.innerHTML="ציון";
        heading.innerHTML="קורסים נוספים";
    
        heading.style.fontSize = "large";
        
        mainBody.appendChild(divider);
        mainBody.appendChild(headingTable);
        mainBody.appendChild(coursesTable);
        headingTable.appendChild(buttonRow);
        coursesTable.appendChild(headersRow);
        buttonRow.appendChild(heading);
        buttonRow.appendChild(buttonCell);
        buttonCell.appendChild(addNewCourseButton);
        headersRow.appendChild(creditHeader);
        headersRow.appendChild(gradeHeader);
        
        addNewCourseButton.addEventListener('click', function()
        {
            var courseRow = document.createElement('tr');
            var creditCell = document.createElement('td');
            var gradeCell = document.createElement('td');
            var newCourseCreditInput = document.createElement('input');
            var alternativeGradeInput = document.createElement('input');

            newCourseCreditInput.type = "number";
            alternativeGradeInput.type = "number";

            creditCell.className = "course-td";
            gradeCell.className = "course-td";

            coursesTable.appendChild(courseRow);  
            courseRow.appendChild(creditCell);
            courseRow.appendChild(gradeCell);
            creditCell.appendChild(newCourseCreditInput);
            gradeCell.appendChild(alternativeGradeInput);
        });   

        return coursesTable;
    } 

    function checkInput(input_box, real_grade)
    {
        const entered_value = input_box.value;
        const fict_grade = parseInt(entered_value);
        if (fict_grade<101 && fict_grade>0)
        {
            input_box.style.border = "2px solid green";
            return fict_grade;
        }
        else
        {
            input_box.style.border = "2px solid black";
            return real_grade;
        }  
    };

    function newCourseValidateInput(enterdGrade, enteredCredit)
    {
        const fictGrade = parseInt(enterdGrade);
        const fictCredit = parseFloat(enteredCredit);
        if (fictGrade<101 && fictGrade>0 && fictCredit%0.5==0 && fictCredit>=0 && fictCredit<=12 )
        {
            return true;
        }
    }


    function onPress(tbodies, averageUI, fictCoursesTable=null, isWholeAverage=false)
    {
        let sum =0;
        let creditSum=0;
        for (let tbody of tbodies)
        {
            for (let course of tbody.children)
            {
                const inputBox = course.children[4];
                const realGrade = course.children[3].innerText;
                const effectiveGrade = checkInput(inputBox, realGrade);
                const credit = course.children[2].innerText;
                sum += (parseFloat(credit))*effectiveGrade;
                creditSum += parseFloat(credit);
            }
        }
        if (isWholeAverage==true)
        {
            console.log(fictCoursesTable.children[0]);
            for (let i=1; i<fictCoursesTable.children.length; i++)
            {
                const curRow = fictCoursesTable.children[i];
                var creditInput = curRow.children[0].children[0];
                var gradeInput = curRow.children[1].children[0];
                console.log(curRow.children[0]);
                var enteredCredit = creditInput.value;
                var enterdGrade = gradeInput.value;
                if (newCourseValidateInput(enterdGrade, enteredCredit))
                {
                    gradeInput.style.border = "2px solid green";
                    creditInput.style.border = "2px solid green";
                    sum += (parseFloat(enteredCredit))*enterdGrade;
                    creditSum += parseFloat(enteredCredit);
                }
                else 
                {
                    gradeInput.style.border = "2px solid black";
                    creditInput.style.border = "2px solid black";
                }
            }
        }
        const newAverage = (sum/parseFloat(creditSum)).toFixed(1);
        averageUI.innerText = newAverage;
        averageUI.style.color = "blue";
    }

function disableExtension()
{
    const inputBoxes = document.getElementsByTagName("input");
    const buttons = document.getElementsByTagName("button");
    const dividers = document.getElementsByClassName("divider");
    const tables = document.getElementsByClassName("courses-table");
    const ths = document.getElementsByClassName("courses-table"); //tables -> th
    const headings = document.getElementsByClassName("courses-table"); // table -> heading
    var union = [...new Set([...inputBoxes, ...buttons, ...dividers, ...tables, ...ths, ...headings])];
    
    for (const element of union)
    {
        element.style.display = 'none';
    }
}

function enableExtension()
{
    const inputBoxes = document.getElementsByTagName("input");
    for (const inputBox of inputBoxes)
    {
        inputBox.style.display = 'inline-block';
    }
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons)
    {
        button.style.display = 'inline-block';
    }
    const dividers = document.getElementsByClassName("divider");
    for (const divider of dividers)
    {
        divider.style.display = 'block';
    }
    const tables = document.getElementsByClassName("courses-table");
    for (const table of tables)
    {
        table.style.display = 'table-row-group';
    }
    const ths = document.getElementsByClassName("courses-th");
    const headings = document.getElementsByClassName("courses-heading");
  
}

//run starts here
const tables = document.querySelectorAll('tbody');
const averages = document.querySelectorAll('tfoot');
setInputBoxes(tables);
const coursesTable = setNewCousesTable();
setTableButtons(averages, tables, coursesTable);
setTotalButton(tables, coursesTable);
chrome.runtime.sendMessage({cmd: "getActivityStatus"}, function(response)
{
    if(response)
    {
        enableExtension();
    }
    else
    {
        disableExtension();
    }
}); 


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => 
{  
    sendResponse({status: 'ok'});

    if(message.command === "enable")
    {
        enableExtension();
    };
    if (message.command === "disable")
    {
        disableExtension();
    }   
});

