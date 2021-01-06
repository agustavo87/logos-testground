@php
 $baseclass = "bg-blue-500 font-bold py-2 px-4 rounded-lg text-blue-100 focus:outline-none hover:bg-blue-400 active:bg-blue-600"
@endphp

<a {{ $attributes->merge(['class' => $baseclass]) }} >
{{$slot}}
</a>
