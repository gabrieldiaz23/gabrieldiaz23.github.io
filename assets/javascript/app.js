function getGifs()
{
   var spongeGif = $("#gifInput").val();
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + spongeGif + "&api_key=NOxqwg0bbHaAoAFeN5YRzwZfRD6NEgrS&limit=10";    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        
        var result = response.data;

        for (i=0; i < result.length; i++)
        {            
            var newDiv = $("<div>");
            newDiv.attr("id", "gifId");
            
            var p = $("<p>").text("Rating: " + result[i].rating);
            var gifElem = $("<img>");
            gifElem.attr("src", result[i].images.fixed_height.url);
            
            newDiv.append(p);
            newDiv.append(gifElem);

            $("#gifArea").prepend(newDiv);
        }        
    });
}
var searchArray = [];

function addButtons()
{
    var newBtn = $("<button>");
    newBtn.attr("type", "button");
    newBtn.attr("id", "nButton");
    newBtn.addClass("btn btn-info");
    newBtn.text($("#gifInput").val());

    $("#buttonArea").append(newBtn);
    
}

$("#gifSearch").on("click", function() {

   getGifs();
   addButtons();   
   $("#gifInput").val("");
    
});



$("#nButton").on("click", function() {

    getGifs();   

});
