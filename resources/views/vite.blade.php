@php
    $devServer = 'http://localhost:5173';
    $isDev = @fsockopen('localhost', 5173) !== false;
@endphp

@if ($isDev)
    {{-- Dev --}}
    <script type="module" src="{{ $devServer }}/@vite/client"></script>
    <script type="module" src="{{ $devServer }}/resources/js/app.jsx"></script>
@else
    {{-- Build --}}
    @php
        $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
    @endphp

    <script type="module" src="/build/{{ $manifest['resources/js/app.jsx']['file'] }}"></script>

    @foreach ($manifest['resources/js/app.jsx']['css'] ?? [] as $css)
        <link rel="stylesheet" href="/build/{{ $css }}">
    @endforeach
@endif