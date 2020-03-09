<script>
  import Staff from "../views/staff.svelte";
  import Applicants from "../views/applicants.svelte";

  import { user } from "../store/index.js";
  import { auth } from "../service/firebase.js";
  import { onMount } from "svelte";

  let admin = false;

  onMount(() => {
    // check if user is master and/or minion
    // hardcoded for now...
    if ($user.uid === "OUWS9DhmdCOTsDhPv5ZLM8S4UoS2") {
      console.log("MASTER");
      admin = true;
    } else {
      console.log("puppet");
      admin = false;
    }
  });
</script>

{#if admin}
  <!-- staff -->
  <Staff />
{:else}
  <!-- applicants -->
  <Applicants />
{/if}
