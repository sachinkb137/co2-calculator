import React, { useState } from 'react';

// Data for GHGs and their GWP values
const GHG_DATA = {
  CO2: { name: 'Carbon Dioxide (CO2)', gwp: 1 },
  CH4: { name: 'Methane (CH4)', gwp: 25 },
  N2O: { name: 'Nitrous Oxide (N2O)', gwp: 298 },
};

const CarbonCreditsCalculator = () => {
  // State to hold user inputs and the result
  const [ghg, setGhg] = useState('CO2');
  const [baselineEmissions, setBaselineEmissions] = useState('');
  const [actualEmissions, setActualEmissions] = useState('');
  const [carbonCredits, setCarbonCredits] = useState(null);

  // Function to calculate carbon credits based on GHG and GWP
  const calculateCarbonCredits = () => {
    const baseline = parseFloat(baselineEmissions);
    const actual = parseFloat(actualEmissions);
    const gwp = GHG_DATA[ghg].gwp;

    // Ensure valid inputs
    if (isNaN(baseline) || isNaN(actual) || baseline < actual) {
      setCarbonCredits('Invalid input: Baseline emissions must be greater than or equal to actual emissions.');
      return;
    }

    // Convert emissions to CO2-equivalent using GWP
    const baselineCO2e = baseline * gwp;
    const actualCO2e = actual * gwp;

    // Carbon credits are the reduction in CO2-equivalent emissions
    const credits = baselineCO2e - actualCO2e;
    setCarbonCredits(credits);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-black mb-4 text-center">Carbon Credits Calculator</h2>

      <label className="block text-black mb-2">
        Select Greenhouse Gas:
        <select
          className="block w-full border border-black rounded-lg p-2 bg-white text-black"
          value={ghg}
          onChange={(e) => setGhg(e.target.value)}
        >
          {Object.keys(GHG_DATA).map((key) => (
            <option key={key} value={key}>
              {GHG_DATA[key].name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-black mb-2">
        Baseline Emissions (in tons):
        <input
          type="number"
          className="block w-full border border-black rounded-lg p-2 bg-white text-black"
          value={baselineEmissions}
          onChange={(e) => setBaselineEmissions(e.target.value)}
        />
      </label>

      <label className="block text-black mb-2">
        Actual Emissions (in tons):
        <input
          type="number"
          className="block w-full border border-black rounded-lg p-2 bg-white text-black"
          value={actualEmissions}
          onChange={(e) => setActualEmissions(e.target.value)}
        />
      </label>

      <button
        onClick={calculateCarbonCredits}
        className="w-full bg-green-400 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-700"
      >
        Calculate Carbon Credits
      </button>

      {carbonCredits !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {typeof carbonCredits === 'string' ? (
            <p className="text-red-600">{carbonCredits}</p>
          ) : (
            <p className="text-xl font-semibold">
              Carbon Credits Earned: {carbonCredits.toFixed(2)} CO2-equivalent tons
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarbonCreditsCalculator;
