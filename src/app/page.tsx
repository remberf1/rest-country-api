'use client';
import Navbar from "./components/Navbar";
import "./styles/_globals.scss";

import DetailView from "@/app/components/DetailView";
export default function Home() {
  return (
    <div className="k">
      <main className="">
        <Navbar />
        <div className="">
          <DetailView />
        </div>
      </main>
    </div>
  );
}