import React from 'react';
import './AustraliaMap.css';

const AustraliaMap = () => {
  // State data from your requirements
  const stateData = [
    { id: 'VIC', name: 'Victoria', value: 0 },
    { id: 'NSW', name: 'New South Wales', value: 3 },
    { id: 'NT', name: 'Northern Territory', value: 0 },
    { id: 'WA', name: 'Western Australia', value: 0 },
    { id: 'SA', name: 'South Australia', value: 0 },
    { id: 'QLD', name: 'Queensland', value: 0 },
    { id: 'TAS', name: 'Tasmania', value: 0 }
  ];

  // Color coding function
  const getColor = (value: number) => {
    return value > 40 ? '#FF0000' :
           value > 20 ? '#FF8000' :
           value > 10 ? '#FFDD00' :
           value > 0 ? '#FFFF00' :
                       '#EFEFFF';
  };

  // Position of state labels on the map image
  const labelPositions = {
    VIC: { top: '65%', left: '30%' },
    NSW: { top: '55%', left: '40%' },
    NT: { top: '30%', left: '45%' },
    WA: { top: '40%', left: '15%' },
    SA: { top: '55%', left: '25%' },
    QLD: { top: '40%', left: '50%' },
    TAS: { top: '80%', left: '40%' }
  };

  return (
    <div className="map-container">
      <h2 className="map-title">Current Regular Clean Sites by State</h2>
      
      <div className="map-wrapper">
        <img 
          src="https://www.freeworldmaps.net/australia/australia-map-editable.jpg" 
          alt="Australia Map" 
          className="map-image"
        />
        
        {/* State value indicators */}
        {stateData.map(state => (
          <div 
            key={state.id}
            className="state-value"
            style={{
              top: labelPositions[state.id as keyof typeof labelPositions].top,
              left: labelPositions[state.id as keyof typeof labelPositions].left,
              backgroundColor: getColor(state.value)
            }}
          >
            {state.value}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default AustraliaMap;