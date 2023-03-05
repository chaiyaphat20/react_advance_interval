import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [increase, setIncrease] = useState(0);
  const [count, setCount] = useState(0);

  const [round, setRound] = useState(0);
  const [text, setText] = useState("");
  const [lastPage, setLastPage] = useState(5);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  //increase
  const increaser = () => {
    setIncrease((prev) => prev + 1000);
  };

  useEffect(() => {
    console.log("Render useEffect increaseTimer");
    const increaseTimer = setInterval(increaser, 1000);

    return () => {
      console.log("Clean Up increaseTimer");
      clearInterval(increaseTimer);
    };
  }, []);

  //increase
  console.log("Re-render");
  const logicInterval = (count: number, lastPage: number): number => {
    if (count < lastPage) {
      return count;
    } else {
      setCount(0);
      return 0;
    }
  };
  let cycle1TO4 = logicInterval(count, lastPage);

  const combineData = async (
    countParams: number,
    roundParam: number,
    increaseParam: number
  ) => {
    setText(
      `count: ${countParams},round ${roundParam} X 3000 =  increase: ${increaseParam}`
    );
  };

  useEffect(() => {
    console.log("useEffect combineData")
    let newCount = logicInterval(count, lastPage);
    combineData(newCount, round, increase);
  }, [count]);

  const countData = useCallback(() => {
    setCount((prev) => prev + 1);
    setRound((prev) => prev + 1);
  }, []);

  //Set Count
  useEffect(() => {
    console.log("Render useEffect pageCountInterval");
    const pageCountInterval = setInterval(() => {
      countData();
    }, 3000);
    return () => {
      console.log("CleanUp Render useEffect pageCountInterval");
      clearInterval(pageCountInterval);
    };
  }, []);

  return (
    <div>
      <h1>count 1 sec.{increase}</h1>
      <h1>Cycle Page 1-4 .{cycle1TO4}</h1>
      <h1>Combine Data 2 useEffect :{text}</h1>
      <h1>LastPage :{lastPage}</h1>
      <input
        onChange={(e) => setLastPage(parseInt(e.target.value))}
        type="number"
      />
    </div>
  );
}

export default App;
