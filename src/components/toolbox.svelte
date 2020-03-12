<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function deleteMovie() {
    if (confirm("Ertu viss?")) dispatch("remove");
  }

  let maximized = false;
  function resizeMovie() {
    maximized = !maximized;
    dispatch("resize", {
      maximized: maximized
    });
  }
</script>

<style>
  div {
    padding-top: 2rem;
    max-width: 30rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .tool:hover {
    cursor: pointer;
  }
  .icon-wrap {
    height: 2rem;
    width: 2rem;
  }
  .icon-wrap:hover {
    cursor: pointer;
  }
</style>

<div>
  <div on:click={deleteMovie} class="icon-wrap">
    <i id="delete" class="gg-trash tool" />
  </div>
  {#if maximized}
    <div on:click={resizeMovie} class="icon-wrap">
      <i class="gg-math-minus tool" />
    </div>
  {:else}
    <div on:click={resizeMovie} class="icon-wrap">
      <i class="gg-math-plus tool" />
    </div>
  {/if}
</div>
<link href="https://css.gg/trash.css" rel="stylesheet" />
<link href="https://css.gg/math-minus.css" rel="stylesheet" />
<link href="https://css.gg/math-plus.css" rel="stylesheet" />
