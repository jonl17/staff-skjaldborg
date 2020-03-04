<script>
  import { db } from "../service/firebase";
  import { collectionData } from "rxfire/firestore";
  import { tap } from "rxjs/operators";

  import Movie from "./movie.svelte";

  const query = db.collection("movies");

  let movies;

  const unsubsribe = collectionData(query, "id")
    .pipe(tap())
    .subscribe(movs => {
      movies = movs;
      console.log(movies);
    });
</script>

<style>
  h2 {
    text-align: center;
  }
</style>

<h2>Fjöldi umsókna: {movies ? movies.length : 0}</h2>

{#if movies}
  {#each movies as movie}
    <Movie {movie} />
  {/each}
{:else}
  <p>Hleður...</p>
{/if}
