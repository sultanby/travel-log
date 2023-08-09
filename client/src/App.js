import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import 'mapbox-gl/dist/mapbox-gl.css';
import LogEntryForm from './LogEntryForm';


const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState();
  const [viewport, setViewport] = useState({});

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = [event.lngLat.lng, event.lngLat.lat];
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };


  return (
    <Map
      initialViewState={{
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 10
      }}
      onViewportChange={setViewport}
      style={{ width: '100vw', height: '100vh' }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              longitude={entry.longitude}
              latitude={entry.latitude}
            >
              <div
                onClick={() => setShowPopup({
                  [entry._id]: true,
                })}>
                <svg
                  className="marker yellow"
                  style={{
                    height: `20px`,
                    width: `20px`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  longitude={entry.longitude}
                  latitude={entry.latitude}
                  anchor="top"
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    <p>{entry.comments}</p>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                    <h6>{entry.description}</h6>
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>

        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <svg
                className="red"
                style={{
                  height: `20px`,
                  width: `20px`,
                  transform: 'translate(-0%, -50%)',
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm 
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation} 
                />
              </div>
            </Popup>
          </>
        ) : null
      }
    </Map >
  );
}

export default App;
