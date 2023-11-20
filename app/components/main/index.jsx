{/*}
import Features from "../features";
import Hero from "../hero";
import bgImage from "../../public/bg.png";

export default function Main() {
  return (
    <main className="bg-tertiary-300">
      <Hero />
      <Features />
    </main>
  );
}
*/}

import Features from "../features";
import Hero from "../hero";
import NavBar from "../navbar";
import Image from 'next/image';
import bgImage from "/public/bg.png"; // Import the background image

export default function Main() {
  return (
    <main
      className="bg-cover bg-center"
    >
      <div style ={{
        zIndex: -1,
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}>
      <Image 
        src={bgImage}
        layout="fill"
        objectFit="cover"
      />
      </div>
      <NavBar />
      <Hero />
      <Features />
    </main>
  );
}