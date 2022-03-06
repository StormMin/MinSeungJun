import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [user, setUser] = useState("");
  const [want, setWant] = useState("0");
  const [thing, setthing] = useState("");
  const [a, seta] = useState("1");
  const [b, setb] = useState("현재값");
  const onChange = (event) => {
    setUser(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (user === "") return;
    setWant(user);
    setUser("");
  };
  const onch = (event) => {
    setthing(parseInt(event.target.value));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, []);
  useEffect(() => {
    const Option = coins[thing];
    if (Option != "undefined" && Option != null) {
      seta(want / coins[thing].quotes.USD.price);
      setb(coins[thing].symbol);
    }
  }, [coins[thing]]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>
          The Coins! {loading ? <strong>king</strong> : `(${coins.length})`}
        </h1>
        <input
          className={styles.sel}
          value={user}
          placeholder="write down"
          type="text"
          onChange={onChange}
        ></input>
        <button className={styles.sel}>입력</button>
        <h2 className={styles.title}>현재잔고 :{want}$</h2>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select className={styles.sel} onChange={onch}>
            <option value={"xx"}>select your coin</option>
            {coins.map((item, index) => (
              <option value={index} key={index}>
                {item.name}: {item.quotes.USD.price} {item.symbol}
              </option>
            ))}
          </select>
        )}
      </form>
      <hr />
      <p>
        {a} {b}
      </p>
    </div>
  );
}

export default App;
