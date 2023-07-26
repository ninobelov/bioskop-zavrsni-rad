// 'use strict'
// function loadOpis(filename, displayName) {
//     let currentMovie = "";
//     let url = "opisi/" + filename;

//     document.getElementById("fileName").innerHTML = displayName;
//     document.getElementById("searchstat").innerHTML="";
//     document.getElementById("keyword").value = "";

//     //server request to download movie

//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.send();

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             currentMovie = xhr.responseText;

//             //break
//             currentMovie = currentMovie.replace(/(?:\r\n|\r|\n)/g, '<br>');

//             document.getElementById("fileContent").innerHTML = currentMovie;

//             var elmnt = document.getElementById("fileContent");
//             elmnt.scrollTop = 0;
//         }
//     }
// }

// function performMark() {

//     //read the keyword
//     var keyword = document.getElementById("keyword").value;
//     var display = document.getElementById("fileContent");

//     var newContent = "";

//     //find all the currently marked items
//     let spans = document.querySelectorAll('mark');

//     //<mark>Harry</mark>
//     //Harry

//     for (var i = 0; i < spans.length; i++) {
//         spans[i].outerHTML = spans[i].innerHTML;
//     }

//     var re = new RegExp(keyword, "gi");
//     var replaceText = "<mark id='markme'>$&</mark>";
//     var bookContent = display.innerHTML;

//     //add the mark to the book content
//     newContent = bookContent.replace(re, replaceText);

//     display.innerHTML = newContent;
//     var count = document.querySelectorAll('mark').length;
//     document.getElementById("searchstat").innerHTML = "found " + count + " matches";

//     if (count > 0) {
//         var element = document.getElementById("markme");
//         element.scrollIntoView();
//     };

// }
"use strict";

// Movie module
const Movie = (() => {
  const loadOpis = async (filename, displayName) => {
    const url = "opisi/" + filename;

    document.getElementById("fileName").innerHTML = displayName;
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keyword").value = "";

    try {
      const response = await fetch(url);
      if (response.ok) {
        let currentMovie = await response.text();
        currentMovie = currentMovie.replace(/(?:\r\n|\r|\n)/g, "<br>");
        document.getElementById("fileContent").innerHTML = currentMovie;
        document.getElementById("fileContent").scrollTop = 0;
      } else {
        console.error("Failed to fetch the movie description");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the movie description:",
        error
      );
    }
  };

  return {
    loadOpis,
  };
})();

// Search module
const Search = (() => {
  const performMark = () => {
    const keyword = document.getElementById("keyword").value;
    const display = document.getElementById("fileContent");
    const re = new RegExp(keyword, "gi");
    const replaceText = "<mark id='markme'>$&</mark>";
    const bookContent = display.innerHTML;

    let newContent = bookContent.replace(re, replaceText);

    const spans = document.querySelectorAll("mark");
    for (const span of spans) {
      span.outerHTML = span.innerHTML;
    }

    display.innerHTML = newContent;

    const count = document.querySelectorAll("mark").length;
    document.getElementById("searchstat").innerHTML =
      "found " + count + " matches";

    if (count > 0) {
      const element = document.getElementById("markme");
      element.scrollIntoView();
    }
  };

  return {
    performMark,
  };
})();

// Example usage
Movie.loadOpis("movie_description.txt", "Movie Title");
