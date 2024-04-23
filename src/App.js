import './App.css';
import Data from "./Wine-Data.json";
import { useState } from 'react';

function App() {

  const[show, setShow] = useState(true);

  // Function to calculate mean
  function calculateMean(numbers) {
    const filteredNumbers = numbers.filter(num => typeof num === 'number');
    const sum = filteredNumbers.reduce((acc, val) => acc + val, 0);
    const mean =  sum / filteredNumbers.length;
    return mean.toFixed(3);
  }

  // Function to calculate median
  function calculateMedian(numbers) {
    const filteredNumbers = numbers.filter(num => typeof num === 'number');
    const sorted = filteredNumbers.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
     const median = (sorted[mid - 1] + sorted[mid]) / 2;
     return median.toFixed(3);
    } else {
      return sorted[mid].toFixed(3);
    }
  }

  // Function to calculate mode
  function calculateMode(numbers) {
    const filteredNumbers = numbers.filter(num => typeof num === 'number');
    const freqMap = {};
    filteredNumbers.forEach(num => {
      freqMap[num] = (freqMap[num] || 0) + 1;
    });

    let mode;
    let maxFreq = 0;
    for (const num in freqMap) {
      if (freqMap[num] > maxFreq) {
        mode = parseFloat(num);
        maxFreq = freqMap[num];
      }
    }
    return mode.toFixed(3);
  }

  function filterAndCalculateStats(data) {
    const uniqueClasses = new Set(data.map(item => item["Alcohol"]));
    const result = [];

    //Calcutating Gamma for every value
    const calculateGamma = (item) => {
        const { Ash, Hue, Magnesium } = item;
        if (typeof Ash === 'number' && typeof Hue === 'number' && typeof Magnesium === 'number' && Magnesium !== 0) {
            return (Ash * Hue) / Magnesium;
        } else {
            return null; // Handle missing or invalid values
        }
    };

    uniqueClasses.forEach(cls => {
        const filteredData = data.filter(item => item["Alcohol"] === cls && typeof item["Flavanoids"] === 'number');
        const flavanoidsOfClass = filteredData.map(item => item["Flavanoids"]);
        const gammasOfClass = filteredData.map(item => calculateGamma(item)).filter(gamma => typeof gamma === 'number');

        //Calculated Mean, Median, Mode for Flavanoids
        const flavanoidsMean = calculateMean(flavanoidsOfClass);
        const flavanoidsMedian = calculateMedian(flavanoidsOfClass);
        const flavanoidsMode = calculateMode(flavanoidsOfClass);

        //Calculated Mean, Median, Mode for Gamma
        const gammaMean = calculateMean(gammasOfClass);
        const gammaMedian = calculateMedian(gammasOfClass);
        const gammaMode = calculateMode(gammasOfClass);

        result.push({
            class: cls,
            flavanoids: {
                mean: flavanoidsMean,
                median: flavanoidsMedian,
                mode: flavanoidsMode
            },
            gamma: {
                mean: gammaMean,
                median: gammaMedian,
                mode: gammaMode
            }
        });
    });

    return result;
  }

  const StatsByClass = filterAndCalculateStats(Data);


  return (
    <>
      <h1>Wine Data</h1>
        {show ? <button onClick={() => setShow(false)}>Hide</button> : <button onClick={() => setShow(true)}>Show</button>}
      {show ?
        <div className='flavenoid'>
          <h2>Flavanoids</h2>
        <table border={"1px"}>
          <thead>
            <tr>
              <th>Measure</th>
              {
                StatsByClass.map(item => (
                  <th key={item.class}>Class {item.class}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>Flavonoids Mean</td>
              {
                StatsByClass.map(item => (
                  <td key={item.class}>{item.flavanoids.mean}</td>
                ))
              }
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Flavonoids Mean</td>
              {
                StatsByClass.map(item => (
                  <td key={item.class}>{item.flavanoids.median}</td>
                ))
              }
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Flavonoids Mean</td>
              {
                StatsByClass.map(item => (
                  <td key={item.class}>{item.flavanoids.mode}</td>
                ))
              }
            </tr>
          </tbody>
        </table>
      </div>:<div className='Gamma'>
        <h2>Gamma</h2>
        <table border={"1px"}>
          <thead>
            <tr>
              <th>Measure</th>
              {
                StatsByClass.map(item => (
                  <th key={item.class}>Class {item.class}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>Gamma Mean</td>
              {
                StatsByClass.map(item => (
                  <td key={item.class}>{item.gamma.mean}</td>
                ))
              }
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Gamma Median</td>
              {
                StatsByClass.map(item => (
                  <td key={item.class}>{item.gamma.median}</td>
                ))
              }
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Gamma Mode</td>
              {
                StatsByClass.map(item => (
                  <td key={item.class}>{item.gamma.mode}</td>
                ))
              }
            </tr>
          </tbody>
        </table>
        </div>}
    </>
  );
}

export default App;
