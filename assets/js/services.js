// var slideIndex = 1;
// showDivs(slideIndex);

// function currentDiv(n) {
//   showDivs((slideIndex = n));
// }

function showDivs(evt, tabnum, tabSection) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    tablink[i].className = tablink[i].className.replace(" active", "");


  }
  document.getElementById(tabnum).style.display = "block";
  document.getElementById(tabSection).className += " active";
}
