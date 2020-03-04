<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function deleteMovie() {
    dispatch("remove");
  }
</script>

<style>
  div {
    padding-top: 2rem;
    max-width: 30rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  #delete:hover {
    cursor: pointer;
  }
</style>

<div>
  <i on:click={deleteMovie} id="delete" class="gg-trash" />
</div>
<link href="https://css.gg/trash.css" rel="stylesheet" />
