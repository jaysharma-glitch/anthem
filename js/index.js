// Chatbox

$(".chat-input input").keyup(function (e) {
  if ($(this).val() == "") $(this).removeAttr("good");
  else $(this).attr("good", "");
});

$(document).ready(function () {
  // Add smooth scrolling to all links
  $(".nav-item a, .chat-input a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});



// for iinput 

$("#main-email").keyup(function(){
  update();
});

function update() {
$("#email").val($('#main-email').val());
}