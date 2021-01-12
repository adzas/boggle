"use strict";

function checkWord(id) {
  var url = $('#room_url').val();
  $.ajax({
    url: url + '/check-word/' + id,
    success: function success(res) {
      $('#word-' + id).addClass(res);
    }
  });
}