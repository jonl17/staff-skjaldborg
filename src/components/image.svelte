<script>
  import { getDownloadURL, put } from "rxfire/storage";
  import { storage } from "../service/firebase";

  let imageURL;
  export let location;

  let imageRef = storage.ref(location);

  getDownloadURL(imageRef).subscribe(url => (imageURL = url));
</script>

<style>
  img {
    max-height: 20rem;
    object-fit: contain;
  }
</style>

<img src={imageURL} alt="stilla" />
