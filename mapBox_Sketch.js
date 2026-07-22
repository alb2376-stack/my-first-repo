/*
 * MAPBOX TUTORIAL: Loading External GeoJSON Data - NYC Sidewalk Sheds
 * =====================================================================
 * 
 * This script demonstrates how to load and visualize data from external GeoJSON files
 * using Mapbox GL JS. It shows how to:
 * - Load data from external files
 * - Automatically frame the map to fit the data
 * - Apply data-driven styling based on properties
 * - Handle point geometry (sidewalk shed permit locations)
 * - Create interactive features with external data
 * 
 * WHAT IS EXTERNAL DATA LOADING?
 * - Loading GeoJSON files from URLs or local files
 * - Separating data from visualization logic
 * - Enabling dynamic data updates without code changes
 * - Supporting larger datasets and real-world applications
 * 
 * PREREQUISITES:
 * - Basic understanding of HTML, CSS, and JavaScript
 * - A Mapbox access token (free at https://account.mapbox.com/access-tokens/)
 * - Mapbox GL JS library loaded in your HTML
 * - Understanding of GeoJSON format
 * - Local server setup (required for loading external files)
 */

// Wrap everything in a function to maintain independence from other scripts
var mapboxSketch03 = function() {
  // ============================================================================
  // STEP 1: SET UP YOUR MAPBOX ACCESS TOKEN
  // ============================================================================
  // Using the same token as the previous examples for consistency
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpbGFiYWtyaSIsImEiOiJjbXJsNWYxNW8xdW1lMnpxMXp5bDdzeDZnIn0.1W8mrhaDlBf3gjTsuFhqzQ';// Replace with your own token <---------------------------------------------------------------------------------------------

  // ============================================================================
  // STEP 2: CREATE THE MAP OBJECT
  // ============================================================================
  // Using the same map configuration as the previous examples for consistency
  const map4 = new mapboxgl.Map({
      container: 'mapbox-container-3',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.98, 40.73], // Default center (will be updated when data loads)
      zoom: 10, // Default zoom (will be updated when data loads)
      pitch: 0,
      bearing: 0
  });

  // ============================================================================
  // STEP 3: ADD MAP CONTROLS
  // ============================================================================
  map4.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map4.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  map4.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
  }), 'bottom-left');

  // ============================================================================
  // STEP 4: WAIT FOR THE MAP TO LOAD
  // ============================================================================
  map4.on('load', () => {
      console.log('Map 4 loaded successfully!');
      
      // ========================================================================
      // STEP 5: LOAD EXTERNAL GEOJSON DATA
      // ========================================================================
      
      // Load the GeoJSON file using fetch API
      fetch('sheds.geojson')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              console.log('GeoJSON data loaded successfully:', data);
              console.log('Number of features:', data.features.length);
              console.log('First feature:', data.features[0]);
              console.log('Geometry type of first feature:', data.features[0].geometry.type);

              // Normalize borough names so filtering/coloring is consistent
              // (source data mixes cases, e.g. "Brooklyn" vs "BROOKLYN")
              data.features.forEach(feature => {
                  const borough = feature.properties['Borough Name'];
                  if (borough) {
                      feature.properties['Borough Name'] = borough
                          .toLowerCase()
                          .replace(/\b\w/g, c => c.toUpperCase());
                  }
              });
              
              // Add the data as a source to the map
              map4.addSource('shed-data', {
                  'type': 'geojson',
                  'data': data,
                  'cluster': true,
                  'clusterMaxZoom': 15,
                  'clusterRadius': 40
              });
              
              console.log('Source added successfully');
              
              // ====================================================================
              // STEP 6: ADD LAYERS FOR THE POINT DATA
              // ====================================================================

              // Clustered circles - size/color scale with how many sheds are grouped
              map4.addLayer({
                  'id': 'sheds-clusters',
                  'type': 'circle',
                  'source': 'shed-data',
                  'filter': ['has', 'point_count'],
                  'paint': {
                      'circle-color': [
                          'step',
                          ['get', 'point_count'],
                          '#8B5CF6', 25,   // purple for small clusters
                          '#F59E0B', 100,  // amber for medium clusters
                          '#EF4444'        // red for large clusters
                      ],
                      'circle-radius': [
                          'step',
                          ['get', 'point_count'],
                          16, 25,
                          22, 100,
                          28
                      ],
                      'circle-opacity': 0.8,
                      'circle-stroke-width': 2,
                      'circle-stroke-color': '#ffffff'
                  }
              });

              // Cluster count labels
              map4.addLayer({
                  'id': 'sheds-cluster-count',
                  'type': 'symbol',
                  'source': 'shed-data',
                  'filter': ['has', 'point_count'],
                  'layout': {
                      'text-field': ['get', 'point_count_abbreviated'],
                      'text-font': ['Open Sans Bold'],
                      'text-size': 12
                  },
                  'paint': {
                      'text-color': '#ffffff'
                  }
              });

              // Individual shed points - colored by borough
              map4.addLayer({
                  'id': 'sheds-unclustered',
                  'type': 'circle',
                  'source': 'shed-data',
                  'filter': ['!', ['has', 'point_count']],
                  'paint': {
                      'circle-color': [
                          'match',
                          ['get', 'Borough Name'],
                          'Manhattan', '#8B5CF6',
                          'Brooklyn', '#EF4444',
                          'Queens', '#10B981',
                          'Bronx', '#F59E0B',
                          'Staten Island', '#3B82F6',
                          '#6B7280' // default/fallback color
                      ],
                      'circle-radius': 6,
                      'circle-opacity': 0.85,
                      'circle-stroke-width': 1,
                      'circle-stroke-color': '#ffffff'
                  }
              });
              
              console.log('All layers added successfully');

              // ====================================================================
              // STEP 7: AUTOMATICALLY FRAME THE MAP TO FIT THE DATA
              // ====================================================================
              
              // Calculate the bounding box of all features
              const bounds = new mapboxgl.LngLatBounds();
              
              data.features.forEach(feature => {
                  if (feature.geometry.type === 'Point') {
                      bounds.extend(feature.geometry.coordinates);
                  } else if (feature.geometry.type === 'LineString') {
                      feature.geometry.coordinates.forEach(coord => {
                          bounds.extend(coord);
                      });
                  } else if (feature.geometry.type === 'Polygon') {
                      feature.geometry.coordinates[0].forEach(coord => {
                          bounds.extend(coord);
                      });
                  } else if (feature.geometry.type === 'MultiPolygon') {
                      feature.geometry.coordinates.forEach(polygon => {
                          polygon[0].forEach(coord => {
                              bounds.extend(coord);
                          });
                      });
                  }
              });
              
              // Fit the map to the data with some padding
              map4.fitBounds(bounds, {
                  padding: 50, // Add 50px padding around the data
                  duration: 2000, // Animate the transition over 2 seconds
                  maxZoom: 15 // Don't zoom in too far
              });
              
              console.log('Map automatically framed to fit data');

              // ====================================================================
              // STEP 8: ADD INTERACTIVE FEATURES
              // ====================================================================
              
              // Popup used for hover - created once and reused
              const hoverPopup = new mapboxgl.Popup({
                  closeButton: false,
                  closeOnClick: false
              });

              // Add hover effects for individual shed points
              map4.on('mouseenter', 'sheds-unclustered', () => {
                  map4.getCanvas().style.cursor = 'pointer';
                  map4.setPaintProperty('sheds-unclustered', 'circle-opacity', 1);
              });

              // HOVER: show the number of days the shed has been up as the mouse moves over a point
              map4.on('mousemove', 'sheds-unclustered', (e) => {
                  const coordinates = e.features[0].geometry.coordinates.slice();
                  const age = e.features[0].properties.Age;

                  hoverPopup
                      .setLngLat(coordinates)
                      .setHTML(`${age} day${age === 1 ? '' : 's'}`)
                      .addTo(map4);
              });

              map4.on('mouseleave', 'sheds-unclustered', () => {
                  map4.getCanvas().style.cursor = '';
                  map4.setPaintProperty('sheds-unclustered', 'circle-opacity', 0.85);
                  hoverPopup.remove();
              });

              // Clicking a cluster zooms in to expand it
              map4.on('click', 'sheds-clusters', (e) => {
                  const features = map4.queryRenderedFeatures(e.point, { layers: ['sheds-clusters'] });
                  const clusterId = features[0].properties.cluster_id;
                  map4.getSource('shed-data').getClusterExpansionZoom(clusterId, (err, zoom) => {
                      if (err) return;
                      map4.easeTo({
                          center: features[0].geometry.coordinates,
                          zoom: zoom,
                          duration: 800
                      });
                  });
              });

              map4.on('mouseenter', 'sheds-clusters', () => {
                  map4.getCanvas().style.cursor = 'pointer';
              });

              map4.on('mouseleave', 'sheds-clusters', () => {
                  map4.getCanvas().style.cursor = '';
              });

              // Add click events to show detailed information for a single shed
              map4.on('click', 'sheds-unclustered', (e) => {
                  const coordinates = e.lngLat;
                  const properties = e.features[0].properties;

               
                  
                  new mapboxgl.Popup()
                      .setLngLat(coordinates)
                      .setHTML(`
                          <div style="text-align: left;">
                              <h4>${properties['House Number']} ${properties['Street Name']}</h4>
                              <p><strong>Borough:</strong> ${properties['Borough Name']}</p>
                              <p><strong>Job Number:</strong> ${properties['Job Number']}</p>
                              <p><strong>Job Status:</strong> ${properties['Current Job Status']}</p>
                              <p><strong>Linear Feet of Shed:</strong> ${properties['Sidewalk Shed/Linear Feet']}</p>
                              <p><strong>First Permit Date:</strong> ${properties['First Permit Date']}</p>
                              <p><strong>Permit Expiration:</strong> ${properties['Permit Expiration Date']}</p>
                              <p><strong>Applicant:</strong> ${properties['Applicant Business Name']}</p>
                              <p><em>Click and drag to explore other sheds</em></p>
                          </div>
                      `)
                      .addTo(map4);
              });



              // ====================================================================
              // STEP 9: ADD SEARCH FUNCTIONALITY
              // ====================================================================
              
              // Search functionality for street names
              document.getElementById('searchFeature').addEventListener('input', (e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  
                  if (searchTerm === '') {
                      // Show all features
                      map4.setFilter('sheds-unclustered', ['!', ['has', 'point_count']]);
                  } else {
                      // Filter by street name containing search term
                      const nameFilter = [
                          'all',
                          ['!', ['has', 'point_count']],
                          ['in', searchTerm, ['downcase', ['get', 'Street Name']]]
                      ];
                      map4.setFilter('sheds-unclustered', nameFilter);
                  }
              });

              // ====================================================================
              // STEP 10: ADD CUSTOM BUTTON FUNCTIONALITY
              // ====================================================================
              
              // Reset filters button
              document.getElementById('resetFilters').addEventListener('click', () => {
                  document.getElementById('searchFeature').value = '';
                  
                  map4.setFilter('sheds-unclustered', ['!', ['has', 'point_count']]);
              });

              // Fit to data button
              document.getElementById('fitToData').addEventListener('click', () => {
                  map4.fitBounds(bounds, {
                      padding: 50,
                      duration: 2000,
                      maxZoom: 15
                  });
              });

              // ====================================================================
              // STEP 11: ADD KEYBOARD SHORTCUTS
              // ====================================================================
              
              document.addEventListener('keydown', (e) => {
                  switch(e.key) {
                      case 'f':
                      case 'F':
                          e.preventDefault();
                          document.getElementById('fitToData').click();
                          break;
                      case 'r':
                      case 'R':
                          e.preventDefault();
                          document.getElementById('resetFilters').click();
                          break;
                      case 'Escape':
                          e.preventDefault();
                          document.getElementById('searchFeature').value = '';
                          document.getElementById('searchFeature').dispatchEvent(new Event('input'));
                          break;
                  }
              });

              // ====================================================================
              // STEP 12: DEBUGGING AND CONSOLE OUTPUT
              // ====================================================================
              
              console.log('Mapbox External Data Map initialized');
              console.log('Data loaded from: sheds.geojson');
              console.log('Features loaded:');
              console.log(`- ${data.features.filter(f => f.geometry.type === 'Point').length} sidewalk shed permits`);
              console.log(`- Total features: ${data.features.length}`);
              console.log('Interactive features:');
              console.log('- Clustering with click-to-zoom expansion');
              console.log('- Hover effects on individual shed points');
              console.log('- Click popups with shed permit information');
              console.log('- Search functionality for street names');
              console.log('Keyboard shortcuts:');
              console.log('- F: Fit map to data');
              console.log('- R: Reset search');
              console.log('- Escape: Clear search');

          })
          .catch(error => {
              console.error('Error loading GeoJSON data:', error);
              
              // Show error message to user
              const errorDiv = document.createElement('div');
              errorDiv.style.cssText = `
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  background: #ff4444;
                  color: white;
                  padding: 20px;
                  border-radius: 8px;
                  text-align: center;
                  z-index: 1000;
              `;
              errorDiv.innerHTML = `
                  <h3>Error Loading Data</h3>
                  <p>Could not load the GeoJSON file. Make sure you're running this on a local server.</p>
                  <p>Error: ${error.message}</p>
              `;
              document.getElementById('map4').appendChild(errorDiv);
          });
  });
};

// Execute the sketch
mapboxSketch03();