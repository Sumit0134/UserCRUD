document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      let flashMessage = document.getElementById("flash-message");
      if (flashMessage) {
        flashMessage.style.transition = "opacity 0.5s ease";
        flashMessage.style.opacity = "0";
        setTimeout(() => flashMessage.remove(), 500); 
      }
    }, 3000); 
  });
  