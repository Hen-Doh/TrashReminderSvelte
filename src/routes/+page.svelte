<script lang="ts">
    let allOptions = ["Bio", "Plastik", "Rest", "Custom", "Grünschnitt"];
    let selected: string[] = ["Bio", "Plastik"];

    function toggleOption(option: string) {
        if (selected.includes(option)) {
            selected = selected.filter(o => o !== option);
        } else {
            selected = [...selected, option];
        }
    }

    function removeOption(option: string) {
        selected = selected.filter(o => o !== option);
    }
</script>

<div class="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
    <h2 class="text-lg font-semibold text-gray-800">Relevante Typen</h2>

    <!-- Ausgewählte Chips -->
    <div class="flex flex-wrap gap-2">
        {#each selected as option}
            <div class="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                <span>{option}</span>
                <button
                    class="ml-2 text-indigo-500 hover:text-indigo-700"
                    on:click={() => removeOption(option)}
                >
                    ✕
                </button>
            </div>
        {/each}
    </div>

    <!-- Auswahlmöglichkeiten -->
    <div class="flex flex-wrap gap-2">
        {#each allOptions as option}
            <button
                type="button"
                on:click={() => toggleOption(option)}
                class="px-3 py-1 rounded-full border text-sm 
                       transition 
                       {selected.includes(option) 
                         ? 'bg-indigo-600 text-white border-indigo-600' 
                         : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}"
            >
                {option}
            </button>
        {/each}
    </div>
</div>
