<script>
    import { slide } from 'svelte/transition';
    import Node from './node.svelte';
    import { createEventDispatcher } from 'svelte';
    
    export let data = {
      "name": "Theoretical Computer Science",
      "subfields": []
    };
    
    // selected topics array passed from parent
    export let selectedTags = [];

    let expandedNodes = new Set();
    
    // initialize with the root node expanded
    expandedNodes.add(data.name);
    
    const dispatch = createEventDispatcher();
    
    function handleTopicOperation(event) {
      // forward event to parent component
      dispatch('topicOperation', event.detail);
    }
    
    function handleExpandUpdate(event) {
      expandedNodes = event.detail;
    }
  </script>
  
  <div class="tree">
    <Node
      node={data}
      level={0}
      {expandedNodes}
      {selectedTags}
      on:topicOperation={handleTopicOperation}
      on:expandUpdate={handleExpandUpdate}
    />
  </div>
  
  <style>
    .tree {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
        background-color: white;
        border-radius: 6px;
        padding: 15px;
        max-height: 450px;
        overflow-y: auto;
        border: 1px solid #e8e8e8;
        position: relative;
        overflow-x: auto;
    }
    
  </style>