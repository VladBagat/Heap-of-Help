<script>
 		let data = $props();
    $inspect(data);
</script>

<div class="news-container">
  {#each data as article}
    <div class="article">
      article
    </div>
  {/each}
</div>

