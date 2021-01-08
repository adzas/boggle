@extends('layouts.agents')
@section('content')
    
<div class="agentsWordBox">
<?php foreach ($agentsWords as $word) : ?>

    <div class="agentsWord <?= $word->getBackground(); ?>">
        <?= $word->getName(); ?>
    </div>

<?php endforeach; ?>
</div>

@endsection