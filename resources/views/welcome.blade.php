<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Boggle</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link rel="stylesheet" href="css/style.css">
        
    </head>
    <body>
        <div class="content">

            <div class="app">

                <a href="{{url('reactHome')}}">React</a>
                <h1>Boggle Online</h1>

                <h2>Rooms:</h2>

                @foreach ($rooms as $room)
                <div class="float-left">
                    <a href={{ url('room/'.$room->id) }} class="room rectangle-100" >{{ $room->id }}</a>
                </div>
                @endforeach
                <div class="clear-both"></div>

            </div>

        </div>
    </body>
    {{-- <script type="text/javascript" src="js/app.js"></script> --}}
</html>
