<script>
  import logo from "./assets/logo.png";
  import "./index.css";
  import { onMount } from "svelte";
  let name = "Svelte App";

  onMount(() => {
    window.dispatchEvent(new CustomEvent("loaded", { detail: "svelteApp" }));
  });
</script>

<main>
  <div class="row">
    <img alt="logo" src={logo} class="logo" />
    <span class="framework-name">
      {name}
    </span>
  </div>
</main>
