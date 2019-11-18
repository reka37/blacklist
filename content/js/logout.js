$(document).ready(function() {
  $('#logOut').on('click', function() { 
    logOut();
  });
});

 function logOut() {
    $.post(global_address + "api/ApiAuth.php?action=logout", {}).done(function(data) {
      if(data.result) { 
        let url = global_address + "auth.php";
        $(location).attr('href', url);
      } else {
        alert('error');
      }
    }).fail(function() {
      alert('error server');
    });
  }