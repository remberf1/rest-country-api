export function geoTo3D(latitude: number, longitude: number, radius:number= 2.05): { x: number; y: number; z: number } {
    const latRad = (latitude * Math.PI) / 180;
    const longRad = (longitude * Math.PI) / 180;
    const x = radius * Math.cos(latRad) * Math.cos(longRad);
    const y = radius * Math.sin(latRad)  ;
    const z = radius * Math.cos(latRad) * Math.sin(longRad);
    return { x, y, z };
  }