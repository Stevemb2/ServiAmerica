import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return <span>Current Time: {time.toLocaleTimeString()}</span>;
};

export default Clock;
