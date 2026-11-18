import { useState } from "react";

function App() {
  // States
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [people, setPeople] = useState("");

  // Derived States
  const billAmount = parseFloat(bill) || 0;
  const numPeople = parseInt(people, 10) || 0;

  // Prevent division by zero
  const tipPerPerson =
    numPeople > 0 ? (billAmount * (tipPercent / 100)) / numPeople : 0;
  const totalPerPerson =
    numPeople > 0 ? billAmount / numPeople + tipPerPerson : 0;

  // Event Handler Functions
  function handlePresetTip(percent) {
    setTipPercent(percent);
    setCustomTip("");
  }

  function handleCustomTipInput(e) {
    const val = e.target.value;
    setCustomTip(Number(val));
    setTipPercent(Number(val) || 0);
  }

  function handleReset() {
    setBill("");
    setTipPercent(0);
    setCustomTip("");
    setPeople("");
  }

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <div className="input-div">
          <BillInput bill={bill} setBill={setBill} />
          <TipSelector
            tipPercent={tipPercent}
            customTip={customTip}
            onPresetTip={handlePresetTip}
            onCustomTipInput={handleCustomTipInput}
          />
          <PeopleInput people={people} setPeople={setPeople} />
        </div>
        <div className="result-div">
          <ResultsPanel
            bill={bill}
            tipPercent={tipPercent}
            customTip={customTip}
            people={people}
            tipPerPerson={tipPerPerson}
            totalPerPerson={totalPerPerson}
            handleReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <h1>
      SPLI <br /> TTER
    </h1>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <div className="bill-input-container">
      <label htmlFor="bill-input">Bill</label>
      <div className="input-wrapper">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          id="bill-input"
          className="bill-input"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </div>
    </div>
  );
}

function TipSelector({ tipPercent, customTip, onPresetTip, onCustomTipInput }) {
  const tipOptions = [5, 10, 15, 25, 50];

  return (
    <div className="tip-selector-container">
      <h2>Select Tip %</h2>
      <div className="tip-button-input">
        {tipOptions.map((percent) => (
          <button
            key={percent}
            type="button"
            className={`tip-btn ${tipPercent === percent && customTip === "" ? "active" : ""}`}
            onClick={() => onPresetTip(percent)}
          >
            {percent}%
          </button>
        ))}
        <input
          type="number"
          min="0"
          value={customTip}
          onChange={onCustomTipInput}
          placeholder="Custom"
          className="custom-tip-input"
        />
      </div>
    </div>
  );
}

function PeopleInput({ people, setPeople }) {
  // Trigger error only when the user typed "0" (not when empty "")
  const isZeroError = people !== "" && Number(people) === 0;

  function handleChange(e) {
    // Keep digits 0-9 only (blocks '-', '.', 'e', and letters)
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setPeople(Number(digitsOnly));
  }

  function handleKeyDown(e) {
    // Prevent decimal points, minus/plus signs, and scientific 'e'
    if ([".", "-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <div className="people-input-container">
      {/* Header row with label on the left and error message on the right */}
      <div className="label-row">
        <label htmlFor="people-input">Number of People</label>
        {/* <p>Test</p> */}
        {isZeroError && (
          <span className="error-message" role="alert">
            Can't be zero
          </span>
        )}
      </div>
      <div className="input-wrapper">
        <span className="people-icon" aria-hidden="true">
          👤
        </span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          step="1"
          min="1"
          id="people-input"
          className={`people-input ${isZeroError ? "input-error" : ""}`}
          value={people}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-invalid={isZeroError}
        />
      </div>
    </div>
  );
}

function ResultsPanel({
  bill,
  tipPercent,
  customTip,
  people,
  tipPerPerson,
  totalPerPerson,
  handleReset,
}) {
  const isResetDisabled =
    bill === "" && tipPercent === 0 && customTip === "" && people === "";

  return (
    <div className="results-div">
      <div className="tip-per-person">
        <div className="labels">
          <h3>Tip Amount</h3>
          <p>/ person</p>
        </div>
        <div className="amounts">
          <span>$</span>
          <span className="amount">{tipPerPerson.toFixed(2)}</span>
        </div>
      </div>

      <div className="total-per-person">
        <div className="labels">
          <h3>Total</h3>
          <p>/ person</p>
        </div>
        <div className="amounts">
          <span>$</span>
          <span className="amount">{totalPerPerson.toFixed(2)}</span>
        </div>
      </div>

      <div className="btn-div">
        <button
          className="reset-btn"
          onClick={handleReset}
          disabled={isResetDisabled}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;
