import React, { useState } from 'react';
import transBg from '../../assets/transBg.jpg'

const EMISSION_FACTOR = 2.68;

const efficiency = {
    "Ashok Leyland AVTR 2820-6x4": (2.25 + 3.25) / 2,
    "Tata Signa 5530.S": (2.25 + 3.5) / 2,
    "Tata Signa 3523.TK": (3.5 + 4.5) / 2,
    "Tata Signa 1923.K": (3.5 + 4.5) / 2,
    "Tata Signa 4018.S": 3.5,
    "Tata 912 LPK": 7.0,
    "Tata Signa 4825.TK": 3.0,
    "Ashok Leyland 5525 6x4": (4.5 + 5.5) / 2,
    "BharatBenz 1217C": 4.0
};

function calculateEmission(vehicle, distance, load) {
    const baseEfficiency = efficiency[vehicle];
    if (baseEfficiency === undefined) {
        return { fuelUsed: null, co2Emission: null };
    }

    const loadFactor = 1 + (load / 10000);
    const adjustedEfficiency = baseEfficiency / loadFactor;

    if (adjustedEfficiency <= 0) {
        return { fuelUsed: null, co2Emission: null };
    }

    const fuelUsed = distance / adjustedEfficiency;
    const co2Emission = fuelUsed * EMISSION_FACTOR;

    return { fuelUsed, co2Emission };
}

const Transportation = () => {
    const [vehicle, setVehicle] = useState('');
    const [distance, setDistance] = useState('');
    const [load, setLoad] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const { fuelUsed, co2Emission } = calculateEmission(vehicle, parseFloat(distance), parseFloat(load));

        if (fuelUsed !== null) {
            setResult({
                vehicle,
                distance,
                load,
                adjustedEfficiency: (efficiency[vehicle] / (1 + (load / 10000))).toFixed(2),
                fuelUsed: fuelUsed.toFixed(2),
                co2Emission: co2Emission.toFixed(2),
            });
        } else {
            setResult({ error: 'Invalid vehicle choice or incorrect calculations.' });
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8"
            style={
                {
                    backgroundImage: `url(${transBg})`,
                    backgroundSize: 'cover'
                }
            }
        >
            <div className="bg-white/50 backdrop-blur-sm shadow-2xl shadow-black rounded-2xl p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6">Transportation CO₂ Emission Calculator</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Vehicle</label>
                    <select
                        className="w-full border rounded-lg p-2"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                    >
                        <option value="">-- Select Vehicle --</option>
                        {Object.keys(efficiency).map((vehicle, index) => (
                            <option key={index} value={vehicle}>
                                {vehicle}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Distance Traveled (km)</label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter distance in kilometers"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Load Carried (kg)</label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter load in kilograms"
                        value={load}
                        onChange={(e) => setLoad(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600"
                    onClick={handleCalculate}
                >
                    Calculate Emission
                </button>

                {result && (
                    <div className="mt-6">
                        {result.error ? (
                            <p className="text-red-500">{result.error}</p>
                        ) : (
                            <div className="bg-green-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
                                <h3 className="text-xl font-semibold mb-2">Results:</h3>
                                <p><strong>Vehicle:</strong> {result.vehicle}</p>
                                <p><strong>Distance Traveled:</strong> {result.distance} km</p>
                                <p><strong>Load Carried:</strong> {result.load} kg</p>
                                <p><strong>Fuel Efficiency (adjusted):</strong> {result.adjustedEfficiency} km/l</p>
                                <p><strong>Total Fuel Used:</strong> {result.fuelUsed} liters</p>
                                <p><strong>Total CO₂ Emission:</strong> {result.co2Emission} kg</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transportation;
