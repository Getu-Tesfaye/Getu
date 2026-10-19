import { Profiler } from "react";

function PerformanceProfiler({ page, children }) {
  function handleProfile(id, phase, actualDuration) {
    console.log(
      `${id} ${phase}: ${actualDuration.toFixed(2)} ms`
    );
  }

  return (
    <Profiler id={page} onRender={handleProfile}>
      {children}
    </Profiler>
  );
}

export default PerformanceProfiler;