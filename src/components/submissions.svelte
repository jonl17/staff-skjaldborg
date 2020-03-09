<script>
  import { db } from "../service/firebase";
  import { collectionData } from "rxfire/firestore";
  import { tap, startWith } from "rxjs/operators";

  import Movie from "./movie.svelte";
  import Wrap from "./wrap.svelte";

  // effects
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  const query = db.collection("movies").orderBy("createdAt");

  const movies = collectionData(query, "id").pipe(startWith([]));

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
</script>

<style>
  h2 {
    text-align: center;
  }
</style>

<h2>Fjöldi umsókna: {$movies ? $movies.length : 0}</h2>

{#if movies}
  <Wrap>
    {#each $movies.reverse() as movie (movie.id)}
      <div
        in:receive={{ key: movie.id }}
        out:send={{ key: movie.id }}
        animate:flip={{ duration: 400 }}>
        <Movie {movie} />
      </div>
    {/each}
  </Wrap>
{:else}
  <p>Hleður...</p>
{/if}
