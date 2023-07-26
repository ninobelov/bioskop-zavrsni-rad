"use strict";
function loadOpis(filename, displayName) {
  let currentMovie = "";
  let url = "opisi/" + filename;

  document.getElementById("fileName").innerHTML = displayName;
  document.getElementById("searchstat").innerHTML = "";
  document.getElementById("keyword").value = "";

  //server request to download movie

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      currentMovie = xhr.responseText;

      //break
      currentMovie = currentMovie.replace(/(?:\r\n|\r|\n)/g, "<br>");

      document.getElementById("fileContent").innerHTML = currentMovie;

      var elmnt = document.getElementById("fileContent");
      elmnt.scrollTop = 0;
    }
  };
}

function performMark() {
  //read the keyword
  var keyword = document.getElementById("keyword").value;
  var display = document.getElementById("fileContent");

  var newContent = "";

  //find all the currently marked items
  let spans = document.querySelectorAll("mark");

  //<mark>Harry</mark>
  //Harry

  for (var i = 0; i < spans.length; i++) {
    spans[i].outerHTML = spans[i].innerHTML;
  }

  var re = new RegExp(keyword, "gi");
  var replaceText = "<mark id='markme'>$&</mark>";
  var bookContent = display.innerHTML;

  //add the mark to the book content
  newContent = bookContent.replace(re, replaceText);

  display.innerHTML = newContent;
  var count = document.querySelectorAll("mark").length;
  document.getElementById("searchstat").innerHTML =
    "found " + count + " matches";

  if (count > 0) {
    var element = document.getElementById("markme");
    element.scrollIntoView();
  }
}
