@extends('layouts.app')
@section('content')
    

<h1>Witaj w pokoju nr {{ $id }}</h1>


<input type="hidden" name="idRoom" value="{{$id}}">
<a href="{{ url("/generateWordsArray/{$id}")}}">Wygeneruj tablicę słów</a>

<button onclick="generateArray()">Generuj litery</button>

<div class="array">
</div>

<script>

    function generateArray(params) {
        
        $('.array').html('');
        const idRoom = $('input[name="idRoom"]').val(); 
        $.ajax({
            url: "/LaRakt/public/generateWordsArray/" + idRoom,
            type: 'get',
            dataType: 'json',
            success: function(res){
                $.each(res, function(k, v){
                    console.log(v);
                    var box = '<div class="word">' + v + '</div>';
                    $('.array').append(box);
                })
            }
        })
    }
</script>



@endsection