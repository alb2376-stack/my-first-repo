// graph-from-csv.js - CSV-Based Network Graph with D3.js
// This script demonstrates how to load network data from CSV files.
// The node list is not stored anywhere - it's derived entirely from edges.csv.

var graphSketch3 = function() {  // Define the main function that contains all graph logic
  // ============================================================================
  // CANVAS DIMENSIONS
  // ============================================================================

  // Canvas dimensions - set the size of our visualization area
  const width = 820;  // Width of the SVG canvas in pixels
  const height = 460;  // Height of the SVG canvas in pixels

  // ============================================================================
  // CSV DATA LOADING
  // ============================================================================

  // Load the edges data - nodes are derived from it below, there is no separate nodes file
  d3.csv('edges.csv').then(function(edgesData) {
    console.log('Loaded edges:', edgesData);  // Log the loaded edges data

    // Process the edges data - convert string values to appropriate types
    const links = edgesData.map(d => ({
      source: d.source,
      target: d.target,
      type: d.type || ''  // Handle empty values
    }));

    // ============================================================================
    // DERIVE NODES FROM THE EDGE LIST
    // ============================================================================

    // Every id that appears as a source or target is a node
    const nodeIds = Array.from(new Set(edgesData.flatMap(d => [d.source, d.target])));

    // Count in/out edges and track each node's direct predecessors
    const inDegree = new Map(nodeIds.map(id => [id, 0]));
    const outDegree = new Map(nodeIds.map(id => [id, 0]));
    const predecessors = new Map(nodeIds.map(id => [id, []]));

    edgesData.forEach(d => {
      outDegree.set(d.source, (outDegree.get(d.source) || 0) + 1);
      inDegree.set(d.target, (inDegree.get(d.target) || 0) + 1);
      predecessors.get(d.target).push(d.source);
    });

    // A node's role comes from its position in the flow: no incoming edges means
    // it's a starting point, no outgoing edges means it's an end point.
    function roleOf(id) {
      if (inDegree.get(id) === 0) return 'source';
      if (outDegree.get(id) === 0) return 'sink';
      return 'intermediate';
    }

    // A node's tier (its column in the flow) is the length of the longest path
    // leading to it - this lays the graph out left to right automatically.
    const tierCache = new Map();
    function tierOf(id, visiting = new Set()) {
      if (tierCache.has(id)) return tierCache.get(id);
      const sources = predecessors.get(id);
      if (sources.length === 0) {
        tierCache.set(id, 0);
        return 0;
      }
      visiting.add(id);
      const upstreamTiers = sources.map(s => visiting.has(s) ? 0 : tierOf(s, visiting));
      visiting.delete(id);
      const tier = 1 + Math.max(...upstreamTiers);
      tierCache.set(id, tier);
      return tier;
    }

    // Give each node a color along a warm gradient that matches the site's own
    // orange-to-pink accent colors (see the tab circles and headings in style.css).
    // Nodes are ordered by tier first, so the gradient moves from orange at the
    // source to pink at the final sink, tracing the flow left to right.
    const orderedByTier = [...nodeIds].sort((a, b) => tierOf(a) - tierOf(b));
    const colorScale = d3.scaleSequential()
      .domain([0, orderedByTier.length - 1])
      .interpolator(d3.interpolateRgb('#fe9f5d', '#db2265'));  // --orange -> --pink
    const colorById = new Map(orderedByTier.map((id, i) => [id, colorScale(i)]));
    const color = id => colorById.get(id);

    function radiusOf(role) {
      if (role === 'source') return 28;
      if (role === 'sink') return 18;
      return 22;
    }

    // ----------------------------------------------------------------------------
    // CAPITALIZE THE ID FOR DISPLAY
    // ----------------------------------------------------------------------------
    // edges.csv only gives us lowercase ids like "ewaste" or "landfill" - there is
    // no separate "display name" column anywhere. This turns "ewaste" into "Ewaste"
    // so the label under each circle reads like a normal title instead of raw data.
    function capitalize(id) {
      const firstLetter = id.charAt(0).toUpperCase();  // "e" -> "E"
      const restOfWord = id.slice(1);                  // "waste" (everything after the first letter)
      return firstLetter + restOfWord;                 // "E" + "waste" -> "Ewaste"
    }

    const nodes = nodeIds.map(id => {
      const role = roleOf(id);
      return {
        id,
        name: capitalize(id),  // Display label, e.g. "ewaste" -> "Ewaste"
        role,
        tier: tierOf(id),
        radius: radiusOf(role),
        color: color(id)
      };
    });

    createGraph(nodes, links);  // Create the graph with the derived nodes and processed links
  }).catch(function(error) {
    console.error('Error loading edges.csv:', error);  // Log any errors
    // Create a fallback graph with sample data if CSV loading fails
    const fallbackNodes = [
      { id: 'Error', name: 'CSV Load Error', role: 'error', tier: 0, radius: 24, color: '#ff0000' }
    ];
    const fallbackLinks = [];
    createGraph(fallbackNodes, fallbackLinks);
  });

  // ============================================================================
  // GRAPH CREATION FUNCTION
  // ============================================================================

  function createGraph(nodes, links) {
    // ============================================================================
    // SVG SETUP WITH ZOOM BEHAVIOR
    // ============================================================================

    // Create the main SVG container for our graph
    const svg = d3.select('#d3-container-1')  // Select the HTML element with id 'd3-container-1'
      .append('svg')  // Create a new SVG element inside that container
      .attr('width', width)  // Set the width of the SVG to our defined width
      .attr('height', height)  // Set the height of the SVG to our defined height
      .style('background', '#f0f0f0');  // Set a light gray background color

    // Create a group that will contain all graph elements and can be transformed
    const g = svg.append('g');

    // Add arrow marker for directed edges - this creates the arrow shape that will appear at the end of directed links
    g.append('defs').append('marker')  // Create a marker definition in the SVG defs section
      .attr('id', 'arrowhead-3')  // Give the marker a unique ID so we can reference it later
      .attr('viewBox', '-0 -5 10 10')  // Define the coordinate system for the marker (x, y, width, height)
      .attr('refX', 8)  // X position where the arrow should be placed relative to the end of the line
      .attr('refY', 0)  // Y position where the arrow should be placed (centered)
      .attr('orient', 'auto')  // Automatically orient the arrow to follow the line direction
      .attr('markerWidth', 5)  // Width of the arrow marker
      .attr('markerHeight', 5)  // Height of the arrow marker
      .append('path')  // Create the actual arrow shape using a path element
      .attr('d', 'M 0,-4 L 8,0 L 0,4')  // Path data: move to (0,-4), line to (8,0), line to (0,4) - creates a triangle
      .attr('fill', '#5b7ba8');  // Fill color of the arrow (blue-gray, matches the flow lines)

    // ============================================================================
    // ZOOM BEHAVIOR SETUP
    // ============================================================================

    // Create zoom behavior with constraints
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])  // Limit zoom scale between 0.1x and 4x
      .on('zoom', (event) => {
        // Apply the zoom transformation to the main group
        g.attr('transform', event.transform);
      });

    // Apply zoom behavior to the SVG
    svg.call(zoom);

    // Add zoom controls info
    svg.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('font-size', '12px')
      .attr('fill', '#666')
      .text('Use mouse wheel to zoom, drag to pan');

    // ============================================================================
    // TIERED COLUMN LAYOUT
    // ============================================================================

    // Map each node's tier (flow stage) to an x position, left to right
    const maxTier = d3.max(nodes, d => d.tier) || 1;
    const xScale = d3.scaleLinear()
      .domain([0, maxTier])
      .range([90, width - 90]);

    // Seed starting positions so nodes begin in their correct column
    nodes.forEach(d => {
      d.x = xScale(d.tier);
      d.y = height / 2 + (Math.random() - 0.5) * 220;
    });

    // ============================================================================
    // ENHANCED FORCE SIMULATION
    // ============================================================================

    // Create the force simulation that will position the nodes automatically
    const simulation = d3.forceSimulation(nodes)  // Create a new force simulation with our nodes
      .force('link', d3.forceLink(links)  // Add a force that pulls connected nodes together
        .id(d => d.id)  // Tell D3 how to identify each node (using the id property)
        .distance(120)  // Preferred distance between connected nodes
        .strength(0.15))  // Kept weak so it doesn't fight the column layout below
      .force('charge', d3.forceManyBody()  // Add a force that makes nodes repel each other
        .strength(d => {  // Set the strength of the repulsion
          // The source node and intermediate nodes get more breathing room than sink nodes
          if (d.role === 'source') return -300;
          if (d.role === 'intermediate') return -220;
          return -160;
        }))
      .force('x', d3.forceX(d => xScale(d.tier)).strength(1))  // Pin each node to its flow-stage column
      .force('y', d3.forceY(height / 2).strength(0.06))  // Gently keep nodes vertically centered
      .force('collision', d3.forceCollide().radius(d => d.radius + 12));  // Prevent circles from overlapping

    // ============================================================================
    // ENHANCED LINK VISUALIZATION
    // ============================================================================

    // Create the visual links (lines) between nodes
    const link = g.append('g')  // Create a group to hold all the link elements
      .attr('stroke', '#5b7ba8')  // Set default stroke color for links
      .attr('stroke-width', 1.5)  // Set uniform stroke width
      .selectAll('line')  // Select all line elements (none exist yet)
      .data(links)  // Bind our links data to the selection
      .enter().append('line')  // Create a new line element for each link
      .attr('marker-end', d => d.type === 'directional' ? 'url(#arrowhead-3)' : null);  // Add arrow only to directional relationships

    // ============================================================================
    // ENHANCED NODE VISUALIZATION
    // ============================================================================

    // Create the visual nodes (circles) representing each flow stage
    const node = g.append('g')  // Create a group to hold all the node elements
      .attr('stroke', '#fff')  // Set the border color of nodes to white
      .attr('stroke-width', 2)  // Set the border thickness of nodes
      .selectAll('circle')  // Select all circle elements (none exist yet)
      .data(nodes)  // Bind our nodes data to the selection
      .enter().append('circle')  // Create a new circle element for each node
      .attr('r', d => d.radius)  // Radius sized by role (source/intermediate/sink)
      .attr('fill', d => d.color || '#3264a8')  // Use the derived color or default to blue
      .call(drag(simulation));  // Add drag behavior to the nodes so users can move them around

    // Add hover effects to make the graph interactive
    node.on('mouseover', function(event, d) {  // When mouse hovers over a node
      // Highlight connected links by making them more opaque
      link.style('stroke-opacity', l =>
        l.source.id === d.id || l.target.id === d.id ? 1 : 0.1  // Full opacity for connected links, low opacity for others
      );

      // Show tooltip with node information
      showTooltip(event, d);
    })
    .on('mouseout', function(event, d) {  // When mouse leaves a node
      // Reset link opacity back to normal
      link.style('stroke-opacity', 0.6);

      // Hide tooltip
      hideTooltip();
    })
    .on('click', function(event, d) {  // When node is clicked
      console.log('Clicked on:', d.name, 'Role:', d.role);  // Log node info to console
    });

    // ============================================================================
    // ENHANCED LABELS
    // ============================================================================

    // Create text labels below each node showing its name
    const label = g.append('g')  // Create a group to hold all the label elements
      .selectAll('text')  // Select all text elements (none exist yet)
      .data(nodes)  // Bind our nodes data to the selection
      .enter().append('text')  // Create a new text element for each node
      .attr('text-anchor', 'middle')  // Center the text horizontally on the node
      .attr('dy', d => d.radius + 14)  // Place the label below the circle instead of on top of it
      .attr('font-size', 12)  // Set the font size of the labels
      .attr('fill', '#333')  // Set the text color to dark gray so it reads on the light background
      .style('pointer-events', 'none')  // Let mouse events pass through to the circle underneath
      .text(d => d.name);  // Set the text content to the node's name

    // ============================================================================
    // TOOLTIP FUNCTIONALITY
    // ============================================================================

    // Create tooltip div that will show detailed information when hovering over nodes
    const tooltip = d3.select('body').append('div')  // Create a new div element in the body
      .attr('class', 'tooltip')  // Give it a CSS class for styling
      .style('position', 'absolute')  // Position it absolutely so we can place it anywhere
      .style('background', 'rgba(0, 0, 0, 0.8)')  // Semi-transparent black background
      .style('color', 'white')  // White text color
      .style('padding', '8px')  // Add some padding inside the tooltip
      .style('border-radius', '4px')  // Rounded corners
      .style('font-size', '12px')  // Small font size
      .style('pointer-events', 'none')  // Don't let the tooltip interfere with mouse events
      .style('opacity', 0);  // Start invisible

    function showTooltip(event, d) {  // Function to display the tooltip when hovering over a node
      tooltip.transition()  // Start a smooth transition animation
        .duration(200)  // Animation takes 200 milliseconds
        .style('opacity', 1);  // Make the tooltip fully visible

      tooltip.html(`
        <strong>${d.name}</strong><br/>
        Role: ${d.role}
      `)
        .style('left', (event.pageX + 10) + 'px')  // Position tooltip 10px to the right of mouse
        .style('top', (event.pageY - 10) + 'px');  // Position tooltip 10px above mouse
    }

    function hideTooltip() {  // Function to hide the tooltip when mouse leaves a node
      tooltip.transition()  // Start a smooth transition animation
        .duration(500)  // Animation takes 500 milliseconds (slower than show)
        .style('opacity', 0);  // Make the tooltip invisible
    }

    // ============================================================================
    // ANIMATION LOOP
    // ============================================================================

    // Shorten a link so it stops at the edge of the target circle instead of its center,
    // which keeps the arrowhead visible instead of hidden underneath the node.
    function edgePoint(d) {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const pad = d.target.radius + 4;
      return {
        x: d.target.x - (dx / len) * pad,
        y: d.target.y - (dy / len) * pad
      };
    }

    // This function runs every frame during the force simulation to update visual positions
    simulation.on('tick', () => {  // 'tick' event fires every frame of the animation
      link  // Update the position of all links (lines)
        .attr('x1', d => d.source.x)  // Set the starting X coordinate of each line to the source node's X position
        .attr('y1', d => d.source.y)  // Set the starting Y coordinate of each line to the source node's Y position
        .attr('x2', d => edgePoint(d).x)  // Stop the line at the edge of the target circle
        .attr('y2', d => edgePoint(d).y);

      node  // Update the position of all nodes (circles)
        .attr('cx', d => d.x)  // Set the center X coordinate of each circle to the node's X position
        .attr('cy', d => d.y);  // Set the center Y coordinate of each circle to the node's Y position

      label  // Update the position of all labels (text)
        .attr('x', d => d.x)  // Set the X coordinate of each text label to the node's X position
        .attr('y', d => d.y);  // Set the Y coordinate of each text label to the node's Y position
    });

    // ============================================================================
    // DRAG BEHAVIOR
    // ============================================================================

    // Function that creates drag behavior for the nodes
    function drag(simulation) {  // Takes the force simulation as a parameter
      function dragstarted(event, d) {  // Called when user starts dragging a node
        if (!event.active) simulation.alphaTarget(0.3).restart();  // Restart simulation with higher energy if it was cooling down
        d.fx = d.x;  // Fix the node's X position to where it currently is
        d.fy = d.y;  // Fix the node's Y position to where it currently is
      }

      function dragged(event, d) {  // Called while user is dragging a node
        d.fx = event.x;  // Update the fixed X position to follow the mouse
        d.fy = event.y;  // Update the fixed Y position to follow the mouse
      }

      function dragended(event, d) {  // Called when user stops dragging a node
        if (!event.active) simulation.alphaTarget(0);  // Let the simulation cool down naturally
        d.fx = null;  // Remove the fixed X position so the node can move freely again
        d.fy = null;  // Remove the fixed Y position so the node can move freely again
      }

      return d3.drag()  // Create a new drag behavior
        .on('start', dragstarted)  // Attach the dragstarted function to the 'start' event
        .on('drag', dragged)  // Attach the dragged function to the 'drag' event
        .on('end', dragended);  // Attach the dragended function to the 'end' event
    }
  }
};

// Execute the sketch - this runs the entire graph visualization
graphSketch3();  // Call the main function to create and display the network graph
