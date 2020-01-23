// the function takes two parameters. First: the DOM path of the desired element in the targeted website. Second: The selctor for the place where the data will be placed. Third: The targeted website's URL.
function getInfo(searchElement,placeElement,url)
{
    var content; // this variable will store all of the targeted website's html code
    var cross = "http://www.whateverorigin.org/get?url="; // This variable stores the URL of the proxy server, used to bypass the CORS policy
    $.getJSON(cross + encodeURIComponent(url) + '&callback=?', function(data)// this is getJSON request. We search for the targeted website's adress trough the proxy server
    {
        content=data.contents;// Fill the content variable with all of the targeted website's html code
        var parsedHtml = $.parseHTML(content); // Parse all of the targeted website's code in a variable called parsedHtml
        var dvPopulation = $(parsedHtml).find(searchElement).text();// Give the dvPopulation variable the value of the desired element.
        $(placeElement).html(dvPopulation);// Replace the element known as placeElement's html with the value of dvPopulation

        // This snippet of code makes sure to get the desired (live) data over a 3 second period of time
        setTimeout(function(){
            getInfo(searchElement,placeElement,url);
        }, 3000);
    });
}

// Takes 3 arguments. Width: how many triangles will be generated along the X axis. Height: how many triangles alod the Y axis. placeelement: where to place the generated backgroud
function Initialise(width,height,placeElement) 
{
    var codeString='<div class="container" style="width:100%; height:100%;"><svg id="triangle" viewBox="0 0 3700 3700">'; // this string stores all of the code for the bakground
    for(var y=0;y<height;y++) // Iterate trough every
    {
        for(var x=0;x<width;x++)
        {
            codeString+="<polygon id='x"+x+"y"+y+"' points='"+(x*100+50)+" "+y*100+", "+(x*100+100)+" "+((y*100)+(100))+", "+(x*100)+" "+((y*100)+(100))+"' />";
            codeString+="<polygon id='x!"+x+"y!"+y+"' points='"+(x*100+100)+" "+((y*100)+(100))+", "+((x*100)+150)+" "+(y*100)+", "+(x*100+50)+" "+y*100+"'/>"
        }
    }
    codeString+="</svg></div>";
    console.log(codeString);
    document.getElementById(placeElement).innerHTML=codeString;
}