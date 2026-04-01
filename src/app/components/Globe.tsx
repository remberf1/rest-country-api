import { Sphere, OrbitControls,Html } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader, CanvasTexture } from "three";
import {geoTo3D} from "../utils/geoTo3D.ts";
import data from "../data.json";
import { useState,useMemo,useEffect} from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";


export default function Globe() {
  const [politicalTexture,setPoliticalTexture] = useState(null);
  const [worldData,setWorldData] = useState(null);

  useEffect(() => {
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(response => response.json())
    .then(worldData => {
      setWorldData(worldData);

    })
    .catch(error => console.error('❌ Error loading world data:', error));
}, []);
useEffect(() => {
    if (!worldData) return;

    console.log("Creating political map texture...");
    
    // Create canvas for the map texture
    const width = 2048;
    const height = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Step 3: Set up map projection
    const projection = d3
      .geoEquirectangular()
      .scale(width / (2 * Math.PI))
      .translate([width / 2, height / 2]);

    const geoPath = d3.geoPath(projection, ctx);

    // Step 4: Draw ocean background
    ctx.fillStyle = "#1a4d8c";
    ctx.fillRect(0, 0, width, height);

    // Step 5: Get all countries from the topology
    const countries = feature(worldData, worldData.objects.countries) as any;
    
    console.log(`Drawing ${countries.features.length} countries...`);

    // Step 6: Draw each country with a simple outline
    countries.features.forEach((country: any, index: number) => {
      // Start path for this country
      ctx.beginPath();
      geoPath(country);
      
      // Fill with light color
      ctx.fillStyle = "#c9d9e8";
      ctx.fill();
      
      // Add border outline
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // Step 7: Add a simple grid for reference
    const graticule = d3.geoGraticule()();
    ctx.beginPath();
    geoPath(graticule);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 0.3;
    ctx.stroke();

    // Step 8: Create texture from canvas
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    setPoliticalTexture(texture);
    
    console.log("Political map texture created!");
  }, [worldData]);

  // Fallback texture while loading
  const fallbackTexture = useLoader(
    TextureLoader,
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );
 
  
console.log(data.map(country => country.latlng))
   return (
    <div style={{ width: "100%", height: "100vh", background: "#000", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        
        {/* Globe with political boundaries */}
        <Sphere args={[1.5, 128, 128]}>
          <meshStandardMaterial 
            map={politicalTexture || fallbackTexture}
            roughness={0.4}
            metalness={0.05}
          />
        </Sphere>
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Loading indicator */}
      {!politicalTexture && (
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          background: "rgba(0,0,0,0.7)",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "12px"
        }}>
          Loading political boundaries...
        </div>
      )}
    </div>
  );
}
