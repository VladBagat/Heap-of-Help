<script>
    import { slide } from 'svelte/transition';
    import Node from './Node.svelte';
    
    // You can either use the default data or pass your own as a prop
    export let data = {
      "name": "Theoretical Computer Science",
      "subfields": [
        {
          "name": "Algorithms",
          "subfields": [
            { "name": "Graph Algorithms", "subfields":[] },
            { "name": "Randomized Algorithms", "subfields":[] },
            { "name": "Approximation Algorithms", "subfields":[] },
            { "name": "Parallel Algorithms", "subfields":[] }
          ]
        },
        {
          "name": "Formal Languages",
          "subfields": [
            { "name": "Regular Languages and Finite Automata", "subfields":[] },
            { "name": "Context-Free Languages and Grammars", "subfields":[] },
            { "name": "Context-Sensitive Languages", "subfields":[] },
            { "name": "Parsing and Syntax Analysis", "subfields":[] }
          ]
        },
        {
            "name": "Cryptography (Theoretical)",
            "subfields": [
              { "name": "Public-Key Cryptography", "subfields":[] },
              { "name": "Zero-Knowledge Proofs", "subfields":[] },
              { "name": "Lattice-Based Cryptography", "subfields":[] },
              { "name": "Provable Security", "subfields":[] }
            ]
        },
        {
            "name": "Quantum Computing Theory",
            "subfields": [
              { "name": "Quantum Algorithms", "subfields":[] },
              { "name": "Quantum Complexity Theory", "subfields":[] },
              { "name": "Quantum Error Correction", "subfields":[] },
              { "name": "Quantum Information Theory", "subfields":[] }
            ]
        },
        {
            "name": "Automata Theory",
            "subfields": [
              { "name": "Finite Automata", "subfields":[] },
              { "name": "Pushdown Automata", "subfields":[] },
              { "name": "Turing Machines", "subfields":[] },
              { "name": "Cellular Automata", "subfields":[] }
            ]
        }
      ]
    };
    
    let selectedNode = null;
    let expandedNodes = new Set();
    
    // Initialize with the root node expanded
    expandedNodes.add(data.name);
    
    function handleSelect(event) {
      selectedNode = event.detail;
      console.log("Selected:", selectedNode.name);
    }
    
    function handleExpandUpdate(event) {
      expandedNodes = event.detail;
    }
  </script>
  
  <div class="tree-container">
    <h1>Computer Science Field Explorer</h1>
    
    <div class="tree">
      <Node 
        node={data} 
        selectedNode={selectedNode} 
        expandedNodes={expandedNodes}
        on:select={handleSelect}
        on:expandUpdate={handleExpandUpdate}
      />
    </div>
    
    {#if selectedNode}
      <div class="selected-info" transition:slide={{ duration: 200 }}>
        <h2>Selected: {selectedNode.name}</h2>
        <p>You can display additional information about the selected node here.</p>
      </div>
    {/if}
  </div>
  
  <style>
    .tree-container {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: #333;
    }
    
    .tree {
      background-color: white;
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    
    .selected-info {
      background-color: white;
      border-radius: 6px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border-left: 4px solid #1890ff;
    }
    
    h2 {
      margin-top: 0;
      color: #1890ff;
    }
  </style>
  