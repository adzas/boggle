@extends('layouts.agents')
@section('content')
    
<div class="head_bar">
    <a href="<?= url('/'); ?>" class="btn bt-default">Powrót</a>
</div>

<div class="agentWordBox">
<?php foreach ($agentsRoom as $room) : ?>

    <a 
        href="<?= url("/tajniacy/{$room->id}");; ?>"
        class="agentsWord">
        Pokój nr <?= $room->id; ?>
    </a>

<?php endforeach; ?>
</div>

@endsection