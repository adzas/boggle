@extends('layouts.app')
@section('content')

<div class="contentRoom">

    <h1>Pokoju nr {{ $room->id }}</h1>

    <input type="hidden" name="idRoom" value="{{$room->id}}">
    <button onclick="generateArray()">Generuj nowe litery</button>

    <div class="array">
        @if (!empty($room->letters))
            wygenerowano: {{ $room->created }}
            @foreach ($room->getLetters() as $letter)
                <div class="word">{{ $letter }}</div>
            @endforeach
        @endif
    </div>

</div>

<script>

    function generateArray(params) {
        
        $('.array').html('');
        const idRoom = $('input[name="idRoom"]').val(); 
        $.ajax({
            url: "/LaRakt/public/generateLettersArray/" + idRoom,
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