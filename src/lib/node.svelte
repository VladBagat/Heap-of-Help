<script>
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let node;
  export let level = 0;
  export let expandedNodes = new Set();
  export let selectedTags = [];
  
  const dispatch = createEventDispatcher();
  
  function toggleExpand() {
    if (hasChildren(node)) {
      if (expandedNodes.has(node.name)) {
        expandedNodes.delete(node.name);
      } else {
        expandedNodes.add(node.name);
      }
      dispatch('expandUpdate', expandedNodes);
    }
  }
  
  function addTopic() {
    // create a shallow copy of the node to avoid reference issues
    const topicToAdd = {
      name: node.name,
      subfields: node.subfields || []
    };
    dispatch('topicOperation', { topic: topicToAdd, operation: 'add' });
  }
  
  function removeTopic() {
    dispatch('topicOperation', { topic: node, operation: 'remove' });
  }
  
  function hasChildren(node) {
    return node.subfields && node.subfields.length > 0;
  }
  
  $: isSelected = selectedTags.some(topic => topic.name === node.name);
  $: isExpanded = expandedNodes.has(node.name);
</script>

<div class="node-wrapper" style="margin-left: {level * 20}px">
  <div class="node" class:has-children={hasChildren(node)} class:selected={isSelected}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="node-label" on:click={toggleExpand}>
      <span class="node-icon">
        {#if hasChildren(node)}
          {isExpanded ? '▼' : '►'}
        {:else}
          •
        {/if}
      </span>
      <span class="node-name">{node.name}</span>
    </div>
    
    <div class="node-actions">
      {#if isSelected}
        <button type="button" class="action-btn remove-btn" on:click={removeTopic} title="Remove this topic">
          −
        </button>
      {:else}
        <button type="button" class="action-btn add-btn" on:click={addTopic} title="Add this topic">
          +
        </button>
      {/if}
    </div>
  </div>
  
  {#if isExpanded && hasChildren(node)}
    <div class="children" transition:slide={{ duration: 200 }}>
      {#each node.subfields as childNode}
        <svelte:self
          node={childNode}
          level={level + 1}
          {expandedNodes}
          {selectedTags}
          on:topicOperation
          on:expandUpdate
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .node-wrapper {
    width: 100%;
  }
  
  .node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  
  .node:hover {
    background-color: #f0f0f0;
    border: 1px solid #e0e0e0;
  }
  
  .node.selected {
    background-color: #e6f7ff;
    border: 1px solid #91caff;
  }
  
  .node-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 1;
    color: black;
  }
  
  .has-children {
    font-weight: 500;
  }
  
  .node-icon {
    width: 20px;
    color: #555;
  }
  
  .node-name {
    margin-left: 5px;
  }
  
  .node-actions {
    display: flex;
    gap: 5px;
  }
  
  .action-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transition: all 0.2s;
    border: 1px solid;
  }
  
  .add-btn {
    background-color: #f0f7ff;
    color: #1890ff;
    border-color: #91caff;
  }
  
  .add-btn:hover {
    background-color: #1890ff;
    color: white;
  }
  
  .remove-btn {
    background-color: #fff1f0;
    color: #ff4d4f;
    border-color: #ffccc7;
  }
  
  .remove-btn:hover {
    background-color: #ff4d4f;
    color: white;
  }
  
  .children {
    margin-left: 10px;
    border-left: 1px solid #ddd;
    padding-left: 10px;
  }
</style>