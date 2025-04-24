import { useState, useEffect, useRef } from 'react'; // Added useState import
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import './NightSky.css';

const StarField = ({ latitude, longitude }) => {
  const starsRef = useRef();
  const [constellations, setConstellations] = useState([]);
  
  useEffect(() => {
    const mockConstellations = [
      {
        name: 'Ursa Major',
        stars: [[0, 5, -10], [2, 6, -12], [4, 5, -11], [5, 3, -9]]
      },
      {
        name: 'Orion',
        stars: [[10, 0, -15], [12, 2, -16], [14, 0, -15], [12, -2, -14]]
      },
      {
        name: 'Cassiopeia',
        stars: [[-5, 2, -10], [-4, 3, -10], [-3, 2, -10], [-2, 3, -10], [-1, 2, -10]]
      },
      {
        name: 'Leo',
        stars: [[6, -2, -12], [7, -3, -13], [8, -2, -14], [9, -1, -13], [10, -2, -12]]
      },
      {
        name: 'Scorpius',
        stars: [[-10, -3, -12], [-9, -2, -12], [-8, -3, -12], [-7, -4, -13]]
      },
      {
        name: 'Draco',
        stars: [[-4, 5, -10], [-3, 6, -11], [-2, 7, -12], [-1, 8, -13], [0, 9, -14]]
      }
    ];
    setConstellations(mockConstellations);
  }, [latitude, longitude]);

  useFrame(({ clock }) => {
    starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <>
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {constellations.map((constellation, idx) => (
        <group key={idx}>
          {constellation.stars.map((star, starIdx) => (
            <mesh position={new THREE.Vector3(...star)} key={starIdx}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="white" />
            </mesh>
          ))}
          
          {constellation.stars.length > 1 && (
            <line>
              <bufferGeometry
                attach="geometry"
                attributes={{
                  position: new THREE.BufferAttribute(
                    new Float32Array(constellation.stars.flat()), 
                    3
                  )
                }}
              />
              <lineBasicMaterial attach="material" color="cyan" linewidth={1} />
            </line>
          )}
          
          {constellation.stars[0] && (
            <Text
              position={new THREE.Vector3(...constellation.stars[0]).add(
                new THREE.Vector3(1, 1, 0)
              )}
              color="cyan"
              fontSize={1}
              anchorX="center"
              anchorY="middle"
            >
              {constellation.name}
            </Text>
          )}
        </group>
      ))}
    </>
  );
};

const NightSkyViewer = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        err => {
          setError(err.message);
          setLocation({ latitude: 40.7128, longitude: -74.0060 });
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocation({ latitude: 40.7128, longitude: -74.0060 });
    }
  }, []);

  return (
    <div className="sky-viewer-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {location ? (
        <>
          <div className="location-info">
            Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
          </div>
          
          <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.4}
            />
            <StarField latitude={location.latitude} longitude={location.longitude} />

          </Canvas>
        </>
      ) : (
        <div className="loading-spinner"></div>
      )}
    </div>
  );
};

export default NightSkyViewer;