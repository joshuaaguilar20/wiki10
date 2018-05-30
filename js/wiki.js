$("#button1").click(clicklink);

function clicklink(event) {
	event.preventDefault();
	// text = $("#input1").val();
	search();
}

$("#input1").keypress(function (event) {
	if (event.which === 13) {
		search();
	}
});


function search() {
	var text = $("#input1").val();
	var wiki = 'https://en.wikipedia.org/w/api.php?action=opensearch&parse&origin=*&search=' + text + '&format=json';
	$.get(wiki, function (data) {
		data: 'jsonp',
		d = data;
		$('#stuff').html('');
		for (var x = 0; x < data[1].length; x++) {
			$("#stuff").append('<a href=' + d[3][x] + '>' + d[1][x] + '</a>');
			// $("#stuff").append("<h3>",d[1][x],"</h3>"); //name
			$("#stuff").append("<div class='col-sm-offset-3 col-sm-6'>","<p>", d[2][x], "</p>","</div>") //summery
			//    $("#stuff").append('<a href="' +d[3][x] + '">Link for Above Article</a>'); //link
		}
	});
};


$("#input1").autocomplete({ //should help auto complete my search box 
	source: function (request, response) {
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php",
			dataType: "jsonp",
			data: {
				'action': "opensearch",
				'format': "json",
				'search': request.term
			},
			success: function (word) {
				response(word[1]);
			}
		});
	}
});


// //<inputbox> this creates an way for people to create there own wiki. 
// type=create
// width=100
// break=no
// buttonlabel=Create new article
// default=(Article title)
// </inputbox>



// 1) You need to capture the keypress event of the text box to trigger a search8
// 2)  You need to capture the click event of the button to trigger a search8
// In either case of 1 or 2, you need to read the .val() of the text box and feed that into the search.
// So you should only have a single search function which reads the content of the text box and triggers the query.
// Basically:  just call "search" when you're ready to search.
// Right now you're using globals to pass data, which is probably not a great plan.
// The HTML page/text box is the single source of truth, no need to pass data around at all.
// Just pluck it where you need it
// So:
// One function to handle the button click.  All it will do is preventDefault on he button and call the search function