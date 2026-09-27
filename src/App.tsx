import scream from "./../public/image.png";

import { useEffect, useState } from "react";
import { eventSystem } from "./connect/logic";
import "./App.css";
import { useVolume } from "./components/useVolume";
export default function App() {
  const [isScream, setIsScream] = useState<boolean>(false);
  const { volume } = useVolume();

  useEffect(() => {
    const event = eventSystem();
    event.on("emitter", (isScream) => {
      setIsScream(isScream);
    });
  }, []);

  return (
    <img
      src={scream}
      className="scream_img"
      style={{
        opacity: volume > 0.02 ? 1.0 : 0,
        width: 150 - volume * 180,
        height: 150 + volume * 180,
      }}
    ></img>
  );
}
