<script>
    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    
    // Node props
    export let node;
    export let level = 0;
    export let selectedNode = null;
    export let expandedNodes = new Set();
    
    const dispatch = createEventDispatcher();
    
    function selectNode() {
      dispatch('select', node);
      
      // Toggle expansion when node is selected
      if (hasChildren(node)) {
        if (expandedNodes.has(node.name)) {
          expandedNodes.delete(node.name);
        } else {
          expandedNodes.add(node.name);
        }
        dispatch('expandUpdate', expandedNodes);
      }
    }
    
    function hasChildren(node) {
      return node.subfields && node.subfields.length > 0;
    }
    
    $: isSelected = selectedNode && selectedNode.name === node.name;
    $: isExpanded = expandedNodes.has(node.name);
  </script>
  
  <div class="node-wrapper" style="margin-left: {level * 20}px">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="node" 
         on:click={selectNode} 
         class:has-children={hasChildren(node)}
         class:selected={isSelected}>
      <span class="node-icon">
        {#if hasChildren(node)}
          {isExpanded ? '▼' : '►'}
        {:else}
          •
        {/if}
      </span>
      <span class="node-name">{node.name}</span>
    </div>
    
    {#if isExpanded && hasChildren(node)}
      <div class="children" transition:slide={{ duration: 200 }}>
        {#each node.subfields as childNode}
          <svelte:self 
            node={childNode} 
            level={level + 1} 
            selectedNode={selectedNode}
            expandedNodes={expandedNodes}
            on:select
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
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: all 0.2s;
    }
    
    .node:hover {
      background-color: #f0f0f0;
    }
    
    .node.selected {
      background-color: #e6f7ff;
      border-left: 3px solid #1890ff;
      padding-left: 2px;
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
    
    .children {
      margin-left: 10px;
      border-left: 1px solid #ddd;
      padding-left: 10px;
    }
  </style>