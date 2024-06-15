import React, { useState } from "react";
import "./prompt.css";
import getDataFromSql from "../../services/sqlservice";
import getDataFromMongoDB from "../../services/mongodbservice";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-dark.css";
import "prismjs/themes/prism-dark.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Result from "../Result/Result";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [databaseType, setDatabaseType] = useState("MySQL");
  const [database, setDatabase] = useState("");
  const [query, setQuery] = useState("");
  const [databaseRecords, setDatabaseRecords] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const databaseOptions = {
    MySQL: ["ecommerce","car", "cs220p"],
    MongoDB: ["SampleUCI"],
  };

  const handleTypeChange = (event) => {
    setDatabaseType(event.target.value);
    setDatabase(""); // Reset the selected database when type changes
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const getQuery = async () => {
    let api = "";
    setLoading(true);
    setError(null);
    try {
      if (databaseType === "MySQL") {
        api = "http://localhost:5001/chat";
      } else if (databaseType === "MongoDB") {
        api = "http://localhost:5001/mongo/chat";
      }
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setQuery(data.msg);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const fetchRecordsFromDatabase = async () => {
    try {
      console.log(`Query from handleSubmit : ${query}`);
      let data;
      if (databaseType === "MySQL") {
        data = await getDataFromSql({ query, database });
      } else if (databaseType === "MongoDB") {
        data = await getDataFromMongoDB({ query, database });
      }
      setDatabaseRecords(data); // Wrap data in an array
      if (gridApi) {
        gridApi.setRowData(data); // Wrap data in an array
      }
      console.log(databaseRecords);
    } catch (error) {
      console.error("Error fetching data from SQL:", error.message);
      setError(error.message);
    }
  };

  const columnDefs =
    databaseRecords.length > 0
      ? Object.keys(databaseRecords[0]).map((key) => ({
          headerName: key,
          field: key,
          sortable: true,
          filter: true,
          resizable: true,
        }))
      : [];

  return (
    <div className="main">
      <h2>Query Engine</h2>

      <label>
        Database Type:
        <select value={databaseType} onChange={handleTypeChange}>
          <option value="">Select a type</option>
          {Object.keys(databaseOptions).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Database:
        <select
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          disabled={!databaseType}
        >
          <option value="">Select a database</option>
          {databaseType &&
            databaseOptions[databaseType].map((db) => (
              <option key={db} value={db}>
                {db}
              </option>
            ))}
        </select>
      </label>

      <input
        className="input-field"
        value={prompt}
        onChange={handleInputChange}
        type="text"
        placeholder="Enter your prompt"
      />

      <button className="queryButton" onClick={getQuery}>
        Get Query
      </button>
      <div>
        {query ? (
          <div style={{ margin: "20px" }}>
            <Editor
              value={query}
              onValueChange={(code) => setQuery(code)}
              highlight={(code) => highlight(code, languages.sql)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                width: "50%", // set the width to 50%
                height: "auto", // set the height to auto
                backgroundColor: "white",
              }}
            />
            <button
              style={{ margin: "20px" }}
              onClick={fetchRecordsFromDatabase}
            >
              Submit
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
      </div>
      <div>
        {/*  {databaseRecords &&
                    <div>{JSON.stringify(databaseRecords)}</div>
                } */}
        {databaseRecords.length > 0 ? (
          <div>
            <Result
              onGridReady={onGridReady}
              columnDefs={columnDefs}
              databaseRecords={databaseRecords}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Prompt;
