import React, { useState } from "react";

function Electricity() {
  const [unit, setUnit] = useState(0);
  const [eleResults, setEleResults] = useState("");
  const [equipment, setEquipment] = useState("");
  const [watt, setWatt] = useState("");
  const [noamp, setNoamp] = useState("");
  const [hours, setHours] = useState("");
  const [equipResults, setEquipResults] = useState("");

  // Handle Electricity calculations
  const handleElectricity = () => {
    let Elemission = unit * 0.823;
    let ElRenew = unit * 0.716;
    let Elpng = Elemission / 2.4761;

    setEleResults({
      emission: Elemission.toFixed(2),
      renew: ElRenew.toFixed(2),
      png: Elpng.toFixed(2),
    });
  };

  // Handle Equipment calculations
  const handleEquipments = () => {
    let Eqemission = (watt * noamp * hours * 30.1045) / 1000;
    let EqRenew = (Eqemission / 0.823) * 0.716;
    let EqPng = Eqemission / 2.4761;

    setEquipResults({
      emission: Eqemission.toFixed(2),
      renew: EqRenew.toFixed(2),
      png: EqPng.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">CO2 Emissions Calculator</h1>
        
        {/* Electricity Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Electricity CO2 Emissions</h2>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Unit of Electricity"
              value={unit}
              onChange={(e) => setUnit(parseInt(e.target.value))}
            />
            <button
              onClick={handleElectricity}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Calculate
            </button>
          </div>

          {eleResults && (
            <div className="p-4 bg-gray-50 rounded border border-gray-200 text-lg">
              <p className="text-gray-700 p-2">Total CO2 Emission: <span className="font-bold">{eleResults.emission}</span> Kg CO2</p>
              <p className="text-gray-700 p-2">Renewable Generation Impact: <span className="font-bold">{eleResults.renew}</span> Kg CO2</p>
              <p className="text-gray-700 p-2">Switching to PNG: <span className="font-bold">{eleResults.png}</span> Kg CO2</p>
            </div>
          )}
        </div>

        {/* Equipment Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Industrial Equipment CO2 Emissions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type of Equipment (e.g. Boiler)"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Approx. Load (Watts)"
              value={watt}
              onChange={(e) => setWatt(parseInt(e.target.value))}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="No. of Appliances"
              value={noamp}
              onChange={(e) => setNoamp(parseInt(e.target.value))}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Avg. Usage (hrs)"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
          </div>
          <button
            onClick={handleEquipments}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Calculate
          </button>

          {equipResults && (
            <div className="p-4 bg-gray-50 rounded border border-gray-200 flex flex-col gap-4">
              <p className="text-gray-700">Total CO2 Emission: <span className="font-bold">{equipResults.emission}</span> Kg CO2</p>
              <p className="text-gray-700">Renewable Generation Impact: <span className="font-bold">{equipResults.renew}</span> Kg CO2</p>
              <p className="text-gray-700">Switching to PNG: <span className="font-bold">{equipResults.png}</span> Kg CO2</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Electricity;
