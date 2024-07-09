import React from "react";
import { Vortex } from "../ui/vortex";

export function VortexDemoSecond() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="1a6769"
        rangeY={800}
        particleCount={25}
        baseHue={150}
      >
      </Vortex>
    </div>
  );
}
