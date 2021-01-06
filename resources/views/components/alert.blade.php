
<div {{ $attributes->merge(['class' => 'bg-red-200'])  }}>
    tipo: {{ $type }} <br>
    {{ $message }} <br>

    perro: {{ $isSelected('perro') ? 'si' : 'no' }}

    <div class="border border-red-800 p-7 m-4">
        {{ $slot }}
    </div>


</option>
</div>
