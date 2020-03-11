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
    title: movie.title,
    director: movie.director,
    description: movie.description
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
        title: e.target.title.value,
        director: e.target.director.value,
        description: e.target.description.value,
        duration: e.target.duration.value
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

  let size = "7rem"; // default size of each form item
  const handleResize = event => {
    // set resize
    console.log(event.detail.maximized);
    if (event.detail.maximized) size = "7rem";
    else size = "100%";
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
    height: var(--size);
    transition: 0.2s ease-in-out;
  }
  .submit-btn {
    margin: 3rem auto;
    background: lightgreen;
    height: 3rem;
    color: white;
    font-weight: bold;
  }
  #title {
    font-size: 1.5rem;
  }
</style>

<Toolbox on:resize={handleResize} on:remove={handleDelete} />
<form
  style="--size:{size}"
  action="POST"
  on:submit|preventDefault={handleSubmit}>
  <label for="title">Titill:</label>
  <input id="title" bind:value={values.title} type="text" name="title" />

  <label for="director">Leikstjóri:</label>
  <input
    id="director"
    bind:value={values.director}
    type="text"
    name="director" />

  <label for="description">Texti:</label>
  <textarea
    id="description"
    bind:value={values.description}
    name="description"
    rows="10" />

  <label for="duration">Lengd:</label>
  <input type="number" name="duration" bind:value={movie.duration} />

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

  <input class="submit-btn" type="submit" value="Vista breytingar" />
</form>
