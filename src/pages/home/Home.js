import React, { useState, useEffect } from "react";
import { apiRequest } from "../../services";
import "./home.css";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [sourceCrypto, setSourceCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [sourceCryptoError, setSourceCryptoError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [apiError, setApiError] = useState("");

  const fetchCryptoList = async () => {
    try {
      const response = await apiRequest("/api/crypto/currencies", "GET");
      setCurrencies(response);
      setSourceCrypto(response[0].id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCryptoList();
  }, []);

  const handleSourceCryptoChange = (e) => {
    setSourceCrypto(e.target.value);
    setSourceCryptoError("");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  const handleConvert = async (e) => {
    e.preventDefault();

    if (!sourceCrypto) {
      setSourceCryptoError("Source Crypto is required");
      return;
    }

    if (!amount || isNaN(amount)) {
      setAmountError("Valid Amount is required");
      return;
    }

    setSourceCryptoError("");
    setAmountError("");
    setApiError("");

    let params = {
      amount,
      id: sourceCrypto,
      convert: targetCurrency.toLowerCase(),
    };

    try {
      const response = await apiRequest(
        "/api/crypto/convert",
        "GET",
        "",
        params
      );
      setConvertedAmount(response.convertedAmount);
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="container-fluid head">
      <div className="py-5">
        <div className="home" id="home">
          <div className="content">
            <h3>
              <span>D</span>
              <span>Z</span>ap <span>C</span>urrency <span>C</span>onverter
            </h3>
            <p>Convert any Currency to Your Currency.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4 mt-5">
            <label className="Data">
              Source Crypto :
              <select
                className={`form-control inputdata ${
                  sourceCryptoError && "error"
                }`}
                value={sourceCrypto}
                onChange={handleSourceCryptoChange}
              >
                {currencies.map((crypto) => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                ))}
              </select>
              {sourceCryptoError && (
                <p className="error-message">{sourceCryptoError}</p>
              )}
            </label>
          </div>
          <div className="col-4 mt-5">
            <label className="Data">
              Amount :
              <input
                className={`form-control inputdata ${amountError && "error"}`}
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
              {amountError && <p className="error-message">{amountError}</p>}
            </label>
          </div>
          <div className="col-4 mt-5">
            <label className="Data">
              Target Currency :
              <select
                className="form-control inputdata"
                value={targetCurrency}
                onChange={handleTargetCurrencyChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
          </div>
        </div>

        <button className="clickon mt-5" onClick={handleConvert}>
          Convert
        </button>

        {convertedAmount !== null && (
          <div className="mt-4">
            <h3
              style={{
                color: "#f9f8f8",
                fontSize: "2rem",
                marginTop: "3.5rem",
              }}
            >
              Converted Amount:
            </h3>
            <p style={{ color: "#dc3106", fontSize: "1.4rem" }}>
              {convertedAmount} {targetCurrency}
            </p>
          </div>
        )}

        {apiError && (
          <div className="mt-4">
            <p className="error-message">{apiError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
