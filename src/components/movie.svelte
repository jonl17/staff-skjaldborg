<script>
  import { getDownloadURL, put } from "rxfire/storage";
  import { collectionData } from "rxfire/firestore";
  import { storage, db } from "../service/firebase";
  import { onMount } from "svelte";
  import Image from "./image.svelte";
  import Toolbox from "./toolbox.svelte";

  export let movie;

  let imageURL;

  let imageRef = storage.ref(movie.imageLocation);

  let id = movie.id;

  let values = {
    title: movie.title,
    director: movie.director,
    description: movie.description
  };

  const handleImageChange = event => {
    put(imageRef, event.target.files[0]).subscribe(snap =>
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

<Toolbox on:remove={handleDelete} />
<form action="POST" on:submit|preventDefault={handleSubmit}>
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

  <label for="image">Stilla:</label>
  <input
    id="image"
    on:change={handleImageChange}
    type="file"
    name="image"
    bind:value={imageURL} />
  <Image location={movie.imageLocation} />

  <input class="submit-btn" type="submit" value="Vista breytingar" />
</form>
