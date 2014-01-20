var total_images = 3

var current_image = 0;

function change_image(id, src)
{
	document.getElementById(id).src = src;

}

function rotate_image()
{
	var results = "";
	for (var current_image = 0; current_image <= total_images; current_image++)
	{
		results += "<img src=\""+current_image+".jpg\" />";
	}
	document.getElementById("rotating_images").innerHTML = results;
}
