function reveseip(argument) {
	// body...
}
function loadtargetr() {
    // body...
    var select = document.getElementById("targetlistr");

    var input = document.getElementById("loadtargetr");
    input.click();

    input.addEventListener("change", function() {

    	var file = input.files[0];


    	var reader = new FileReader();


    	reader.readAsText(file);


    	reader.onload = function() {

    		var text = reader.result;

    		const lines = text.split('\n');
    		console.log(lines)
    		select.innerHTML = "";
    		for (var i = 0; i < lines.length; i++) {
        // Create a new option element
        var option = document.createElement("option");

        // Set the value and text of the option
        option.value = lines[i];
        option.text = lines[i];

        // Add the option to the select element
        select.appendChild(option);
    }

};
});
}

function adddomainr() {
	var x = document.getElementById("targetlistr");
	var option = document.createElement("option");


	let text;
	let domain = prompt("Input domain:", "example.com");

	option.text = domain;
	x.add(option);
}


function reverseiplookup(domain) {

	var resultr = document.getElementById("resultr");
	fetch('https://api.hackertarget.com/reverseiplookup/?q='+domain)
	.then(response => response.text())
	.then(text => {
		const lines = text.split('\n');
		for (const line of lines) {
			
			resultr.value += line+"\n";
		}
		
	});

}

function reverse() {

	var select = document.getElementById("targetlistr");

	var kosong = document.getElementById("kosong");
	var berhasil = document.getElementById("berhasil");
	var result = document.getElementById("resultr");
	var length = select.options.length;

	result.value = ""

	if (length < 1) {
		kosong.style.display = "grid";
		beep(250);
	}else{
		for (var i = length-1; i >= 0; i--) {
			var option = select.options[i];
			reverseiplookup(option.value)
			console.log(option.value);
			select.remove(i);
		}

		berhasil.style.display = "grid";
		beep(800);
	}

}