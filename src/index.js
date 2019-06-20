import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const obj = [
  {
    key: "object_type",
    value: "TropoLink"
  },
  {
    key: "id_a_value",
    value: "Site Alpha"
  },
  {
    key: "id_b_value",
    value: "Site Beta"
  },
  {
    key: "frequency_a_unit",
    value: "MHz"
  },
  {
    key: "frequency_a_value",
    value: "4400"
  },
  {
    key: "polar_a_value",
    value: "V"
  },
  {
    key: "emission_value",
    value: "30M00"
  },
  {
    key: "pwr_a_unit",
    value: "dBm"
  },
  {
    key: "pwr_a_value",
    value: "10.0"
  },
  {
    key: "gain_a_unit",
    value: "dBi"
  },
  {
    key: "gain_a_value",
    value: "0"
  },
  {
    key: "losses_a_unit",
    value: "dB"
  },
  // added losses_b_unit, maybe missing
  {
    key: "losses_b_unit",
    value: "dB"
  },
  {
    key: "latitude_a_unit",
    value: "deg"
  },
  {
    key: "latitude_a_value",
    value: "37.11360635892"
  },
  {
    key: "longitude_a_unit",
    value: "deg"
  },
  {
    key: "longitude_a_value",
    value: "-121.8361103744"
  },
  {
    key: "antEffiA_value",
    value: "55"
  },
  {
    key: "antApertureA_value",
    value: "55"
  },
  {
    key: "frequency_b_unit",
    value: "MHz"
  },
  {
    key: "frequency_b_value",
    value: "4500"
  },
  {
    key: "polar_b_value",
    value: "V"
  },
  {
    key: "pwr_b_unit",
    value: "dBm"
  },
  {
    key: "pwr_b_value",
    value: "10.0"
  },
  {
    key: "gain_b_unit",
    value: "dBi"
  },
  {
    key: "gain_b_value",
    value: "0"
  },
  {
    key: "latitude_b_unit",
    value: "deg"
  },
  {
    key: "latitude_b_value",
    value: "36.76027600624"
  },
  {
    key: "longitude_b_unit",
    value: "deg"
  },
  {
    key: "longitude_b_value",
    value: "-121.49111952822"
  },
  {
    key: "antEffiB_value",
    value: "55"
  },
  {
    key: "antApertureB_value",
    value: "55"
  },
  {
    key: "threshold_unit",
    value: "dBm"
  },
  {
    key: "threshold_value",
    value: "-80"
  },
  {
    key: "sys_type_value",
    value: "1"
  },
  {
    key: "rgba_value",
    value: "ff000000"
  }
];

const modifier = (acc, currentData) => {
  const obj = {};
  if (currentData.key === "object_type") {
    return {
      [currentData.key]: currentData.value
    };
  } else if (currentData.key.includes("rgba")) {
    acc.extra.push({
      key: currentData.key,
      value: currentData.value
    });
  } else if (currentData.key.includes("a_") || currentData.key.includes("A_")) {
    if (
      currentData.key.includes("ant") ||
      currentData.key.includes("gain") ||
      currentData.key.includes("polar")
    ) {
      acc.antA.push({
        key: currentData.key,
        value: currentData.value
      });
    } else {
      acc.siteA.push({
        key: currentData.key,
        value: currentData.value
      });
    }
  } else if (currentData.key.includes("b_") || currentData.key.includes("B_")) {
    if (
      currentData.key.includes("ant") ||
      currentData.key.includes("gain") ||
      currentData.key.includes("polar")
    ) {
      acc.antB.push({
        key: currentData.key,
        value: currentData.value
      });
    } else {
      acc.siteB.push({
        key: currentData.key,
        value: currentData.value
      });
    }
  } else {
    acc.extra.push({
      key: currentData.key,
      value: currentData.value
    });
  }
  return obj;
};

const res = obj.reduce(
  (acc, current) => {
    acc = { ...acc, ...modifier(acc, current) };
    return acc;
  },
  { siteA: [], siteB: [], antA: [], antB: [], extra: [] }
);

console.log(JSON.stringify(res, null, 2));
console.log(`Extra: ${res.extra.length}`);
console.log(`Site_A: ${res.siteA.length}`);
console.log(`Site_B: ${res.siteB.length}`);
console.log(`Ant_A: ${res.antA.length}`);
console.log(`Ant_B: ${res.antB.length}`);
console.log(
  "TOTAL",
  res.extra.length +
    res.siteA.length +
    res.siteB.length +
    res.antA.length +
    res.antB.length
);

function App() {
  return (
    <div className="App">
      <h1>Json object</h1>
      <h4>Object Length is: {obj.length}</h4>
      <br />
      <ul>
        {obj.map(x => {
          return <li key={x.key + 1}>{x.value}</li>;
        })}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
