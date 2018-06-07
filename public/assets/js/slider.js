function clear() {

  ;
}

function showSlides() {
  var i, slideContent;
  slideContent = document.getElementsByClassName("slideDesc");
  for (i = 0; i < slideContent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    tablink[i].className = tablink[i].className.replace(" active", "");


  }
  document.getElementById(tabnum).style.display = "block";
  document.getElementById(tabSection).className += " active";
}
