import { useState } from "react";

function App() {
  const [billAmt, setBillAmt] = useState("");
  const [selfTipRate, setSelfTipRate] = useState(10);
  const [friendTipRate, setFriendTipRate] = useState(20);

  const avgTipRate = Math.floor((selfTipRate + friendTipRate) / 2);

  function handleInputBill(evt) {
    setBillAmt(Number(evt.target.value));
  }

  function handleReset() {
    setBillAmt("");
    setSelfTipRate(10);
    setFriendTipRate(10);
  }

  function handleSetSelfRate(evt) {
    setSelfTipRate(Number(evt.target.value));
  }

  function handleSetFriendRate(evt) {
    setFriendTipRate(Number(evt.target.value));
  }

  return (
    <div>
      <Form
        onInputBill={handleInputBill}
        bill={billAmt}
        selfTipRate={selfTipRate}
        friendTipRate={friendTipRate}
        onSetSelfRate={handleSetSelfRate}
        onSetFriendRate={handleSetFriendRate}
      />
      <TipCalculator bill={billAmt} rate={avgTipRate} />
      <ResetButton onReset={handleReset} />
    </div>
  );
}

function ResetButton({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

function TipCalculator({ bill, rate }) {
  const tip = Math.floor((rate / 100) * bill);
  return (
    <div className="tip-message">
      {" "}
      You pay ${bill + tip} ( ${bill} + ${tip} tip ){" "}
    </div>
  );
}

function DropDownList({ rate, onSetRate, children }) {
  return (
    <label>
      {children}
      <select value={rate} onChange={onSetRate}>
        <option value={0}> Dissatisfied ( 0% )</option>
        <option value={5}> It was okay ( 5% )</option>
        <option value={10}> It was good ( 10% )</option>
        <option value={20}> Absolutely amazing! ( 20% )</option>
      </select>
    </label>
  );
}

function InputBill({ onInputBill, bill }) {
  return (
    <label>
      How much was the bill?{" "}
      <input type="number" name="bill" onChange={onInputBill} value={bill} />
    </label>
  );
}

function Form({
  onInputBill,
  bill,
  selfTipRate,
  friendTipRate,
  onSetFriendRate,
  onSetSelfRate,
}) {
  return (
    <form>
      <InputBill bill={bill} onInputBill={onInputBill} />
      <DropDownList rate={selfTipRate} onSetRate={onSetSelfRate}>
        How did you like the service?
      </DropDownList>
      <DropDownList rate={friendTipRate} onSetRate={onSetFriendRate}>
        How did your friend like the service?
      </DropDownList>
    </form>
  );
}

export default App;
