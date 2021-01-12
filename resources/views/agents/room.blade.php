@extends('layouts.agents')
@section('content')

<div class="head_bar">
    <a href="{{ url('tajniacy/') }}" class="btn btn-default f-left">Powrót</a>
    <a href="{{ url('tajniacy/1/boss') }}" class="btn btn-default f-left">Jestem szefem</a>
</div>

<input type="hidden" id="room_url" value="{{ url('tajniacy/'.$id) }}">

<div class="agentsWordBox">
<?php foreach ($agentsWords as $word) : ?>

    <div class="agentsWord cursor-pointer" id="word-{{ $word->getID() }}" onclick="checkWord({{ $word->getID() }})">
        {{ $word->getName() }}
    </div>

<?php endforeach; ?>
</div>

@endsection