'use client';
import data from '../data.json';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('../components/Globe'), 
{ ssr: false, 
loading: () => <p>Loading...</p>
}
);

export default function GlobePage() {

  return (
  <div >
    <Globe />
       <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs z-10">
        💡 Click on any flag to see country details
      </div>
  </div>
);
}