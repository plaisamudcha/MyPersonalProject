import dayjs from "dayjs";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

function TimeFooter() {
  const [currentTime, setCurrentTime] = useState(
    dayjs().format("DD/MM/YYYY - HH:mm:ss")
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("DD/MM/YYYY - HH:mm:ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTime]);
  return (
    <footer className="py-5 text-center text-lg text-gray-500">
      <div className="flex justify-center gap-2">
        <Timer />
        <p> {currentTime}</p>
      </div>
    </footer>
  );
}

export default TimeFooter;
