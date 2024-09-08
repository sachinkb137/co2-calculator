import React, { useState } from "react";
import seqBg from '../../assets/seq3.jpeg'

const COAL_EMISSION_FACTOR = 2.4;
const SEQUESTRATION_RATE_PER_TREE = 0.015;
const TREES_PER_HECTARE = 1200;

function calculateCoalEmissions(tonsOfCoal) {
    return tonsOfCoal * COAL_EMISSION_FACTOR;
}

function calculateNumberOfTreesNeeded(emissions, years) {
    const totalSequestrationPerTree = SEQUESTRATION_RATE_PER_TREE * years;
    return emissions / totalSequestrationPerTree;
}

function calculateLandArea(treesNeeded) {
    return treesNeeded / TREES_PER_HECTARE;
}

function offsetCoalEmissions(tonsOfCoal, years) {
    const emissions = calculateCoalEmissions(tonsOfCoal);
    const treesNeeded = calculateNumberOfTreesNeeded(emissions, years);
    const landArea = calculateLandArea(treesNeeded);
    const totalCarbonStored = treesNeeded * SEQUESTRATION_RATE_PER_TREE * years;

    return {
        emissions: emissions.toFixed(2),
        treesNeeded: Math.round(treesNeeded),
        landArea: landArea.toFixed(2),
        totalCarbonStored: totalCarbonStored.toFixed(2),
    };
}

const AfforestationCalculator = () => {
    const [coalBurned, setCoalBurned] = useState("");
    const [afforestationYears, setAfforestationYears] = useState("");
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const coalValue = parseFloat(coalBurned);
        const yearsValue = parseInt(afforestationYears);

        if (isNaN(coalValue) || isNaN(yearsValue)) {
            alert("Invalid input. Please enter numeric values.");
            return;
        }

        const result = offsetCoalEmissions(coalValue, yearsValue);
        setResult(result);
    };

    return (
        <div
            className="min-h-screen bg-green-50 flex items-center justify-center py-10"
            style={
                {
                    backgroundImage: `url(${seqBg})`,
                    backgroundSize: 'cover'
                }
            }
        >
            <div className="w-full max-w-md bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-black p-6">
                <h1 className="text-2xl font-bold text-center text-black mb-6">
                    Coal Emissions Offset Calculator
                </h1>
                <label className="block text-gray-900 font-medium mb-2">
                    Enter the amount of coal burned (in tons):
                </label>
                <input
                    type="text"
                    value={coalBurned}
                    onChange={(e) => setCoalBurned(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label className="block text-gray-900 font-medium mb-2">
                    Enter the number of years for afforestation:
                </label>
                <input
                    type="text"
                    value={afforestationYears}
                    onChange={(e) => setAfforestationYears(e.target.value)}
                    className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleCalculate}
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Calculate
                </button>

                {result && (
                    <div className="mt-6 bg-green-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-green-700 mb-4">
                            Offset Summary
                        </h2>
                        <p className="text-gray-700 p-2">
                            <strong>Emissions (tons of CO2):</strong> {result.emissions} tons
                        </p>
                        <p className="text-gray-700 p-2">
                            <strong>Trees Required:</strong> {result.treesNeeded} trees
                        </p>
                        <p className="text-gray-700 p-2">
                            <strong>Land Area Required:</strong> {result.landArea} hectares
                        </p>
                        <p className="text-gray-700 p-2">
                            <strong>Total Carbon Stored:</strong> {result.totalCarbonStored} tons of CO2
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AfforestationCalculator;
