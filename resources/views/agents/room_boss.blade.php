@extends('layouts.agents')
@section('content')

<div class="head_bar">
    <a href="<?= url('tajniacy/'); ?>" class="btn btn-default f-left">Powrót</a>
    <a href="<?= url('tajniacy/1'); ?>" class="btn btn-default f-left">Jestem agentem</a>
    <a href="<?= url('tajniacy/1/reset-words'); ?>" class="btn btn-default f-left">Resetuj słowa</a>
    <a href="<?= url('tajniacy/1/reset-settings'); ?>" class="btn btn-default f-left">Resetuj ustawienie</a>
</div>

<div class="agentsWordBox">
<?php foreach ($agentsWords as $word) : ?>

{{-- TODO dodać czy przycisk został kliknięty żeby po odświerzeniu u agenta zostało zaznaczone --}}
    <div class="agentsWord <?= $word->getBackground(); ?>">
        <?= $word->getName(); ?>
    </div>

<?php endforeach; ?>
</div>

@endsection