
function checkWord(id) {
    const url = $('#room_url').val();
    $.ajax({
        url: url+'/check-word/'+id,
        success: function(res) {
            $('#word-'+id).addClass(res);
        }
    })
}