<script>
  import { getDownloadURL, put } from "rxfire/storage";
  import { collectionData } from "rxfire/firestore";
  import { storage, db } from "../service/firebase";
  import { onMount } from "svelte";
  import Image from "./image.svelte";
  import Toolbox from "./toolbox.svelte";

  export let movie;

  let imageOneURL = "";
  let imageTwoURL = "";

  let imageOneRef = storage.ref(movie.imageOneLocation);
  let imageTwoRef = storage.ref(movie.imageTwoLocation);

  let id = movie.id;

  let values = {
    titill: movie.titill,
    leikstjori: movie.leikstjori,
    lysing: movie.lysing,
    athugasemd: movie.athugasemd
  };

  const handleImageOneChange = event => {
    put(imageOneRef, event.target.files[0]).subscribe(snap =>
      console.log(snap.bytesTransferred)
    );
    console.log(event.target.files[0].name);
  };
  const handleImageTwoChange = event => {
    put(imageTwoRef, event.target.files[0]).subscribe(snap =>
      console.log(snap.bytesTransferred)
    );
  };

  const handleSubmit = e => {
    db.collection("movies")
      .doc(id)
      .update({
        titill: e.target.titill.value,
        leikstjori: e.target.leikstjori.value,
        lysing: e.target.lysing.value,
        lengd: e.target.lengd.value,
        athugasemd: e.target.athugasemd.value
      })
      .then(() => {
        alert("Umsókn uppfærð!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    db.collection("movies")
      .doc(id)
      .delete();
  };

  let maximized = false;
  $: maximized; // initial size of each form item
  const handleResize = event => {
    // set resize
    maximized = event.detail.maximized;
  };
</script>

<style>
  form {
    box-sizing: border-box;
    padding: 2rem;
    margin: 0 auto;
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid;
    overflow: hidden;
    height: 100%;
    transition: 0.2s ease-in-out;
  }
  .submit-btn {
    margin: 3rem auto;
    background: lightgreen;
    height: 3rem;
    color: white;
    font-weight: bold;
  }
  #titill {
    font-size: 1.5rem;
  }
  .application-titill {
    text-align: center;
  }
</style>

<Toolbox on:resize={handleResize} on:remove={handleDelete} />

{#if maximized}
  <form action="POST" on:submit|preventDefault={handleSubmit}>

    <h2>Verk</h2>
    <label for="titill">Titill:</label>
    <input id="titill" bind:value={values.titill} type="text" name="titill" />

    <label for="leikstjori">Leikstjóri:</label>
    <input
      id="leikstjori"
      bind:value={values.leikstjori}
      type="text"
      name="leikstjori" />

    <label for="lysing">Texti:</label>
    <textarea id="lysing" bind:value={values.lysing} name="lysing" rows="10" />
    <label for="athugasemd">Athugasemd:</label>
    <textarea
      id="athugasemd"
      bind:value={values.athugasemd}
      name="athugasemd"
      rows="5" />

    <label for="lengd">Lengd:</label>
    <input type="number" name="lengd" bind:value={movie.lengd} />

    <h2>Hlekkir</h2>
    <label for="hlekkirVerk">Hlekkur verk:</label>
    <input type="text" name="hlekkirVerk" bind:value={movie.hlekkurVerk} />
    <label for="hlekkirVerk">Hlekkur stikla:</label>
    <input type="text" name="hlekkurStikla" bind:value={movie.hlekkurStikla} />

    <h2>Stillur</h2>
    <label for="image">Stilla #1:</label>
    <input
      id="imageOne"
      on:change={handleImageOneChange}
      type="file"
      name="imageOne"
      bind:value={imageOneURL} />
    <Image location={movie.imageOneLocation} />
    {#if movie.imageTwoLocation}
      <label for="image">Stilla #2:</label>
      <input
        id="imageTwo"
        on:change={handleImageTwoChange}
        type="file"
        name="imageTwo"
        bind:value={imageTwoURL} />
      <Image location={movie.imageTwoLocation} />
    {/if}

    <h2>Hlekkir</h2>

    <input class="submit-btn" type="submit" value="Vista breytingar" />
  </form>
{:else}
  <p class="application-titill">
    Umsókn: {movie.titill} | Umsækjandi: {movie.userId}
  </p>
{/if}
