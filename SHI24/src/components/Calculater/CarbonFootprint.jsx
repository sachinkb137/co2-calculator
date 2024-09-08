import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import bg from '../../assets/bg.jpg'

function CarbonFootprint() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [kg, setKg] = useState('');
    const [coalType, setCoalType] = useState('');
    const [population, setPopulation] = useState('');

    const handleCalculate = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/calculate', {
            coal_type: coalType,
            kg: parseFloat(kg),
            population: parseFloat(population),
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data) {
                    setResult(response.data);
                    setError(null);
                }
            })
            .catch(err => {
                setError('Error in API call: ' + (err.response ? err.response.data.error : err.message));
                console.error('API Error:', err);
            });
    }

    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen bg-gray-100'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover'
            }}
        >
            <div className='w-full max-w-2xl bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-black p-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Calculate Carbon Footprint</h1>
                <form className='space-y-6' onSubmit={handleCalculate}>
                    {/* Coal Type Input */}
                    <div>
                        <label className='block text-lg font-medium text-gray-700 mb-2'>Select Type of Coal</label>
                        <select
                            className='w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-green-100 focus:border-green-500'
                            value={coalType}
                            onChange={(e) => setCoalType(e.target.value)}
                            required
                        >
                            <option value="none">Select an Option</option>
                            <option value="antracite">Anthracite</option>
                            <option value="bitumin">Bituminous</option>
                            <option value="lignite">Lignite</option>
                            <option value="subbitumin">Subbituminous</option>
                        </select>
                    </div>

                    {/* Amount of Coal (kg) Input */}
                    <div>
                        <label className='block text-lg font-medium text-gray-700 mb-2'>Amount of Coal (kg)</label>
                        <input
                            type="number"
                            placeholder='Enter amount in kilograms'
                            className='w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-green-100 focus:border-green-500'
                            value={kg}
                            onChange={(e) => setKg(e.target.value)}
                            required
                        />
                    </div>

                    {/* Population Input */}
                    <div>
                        <label className='block text-lg font-medium text-gray-700 mb-2'>Population</label>
                        <input
                            type="number"
                            placeholder='Enter population'
                            className='w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-green-100 focus:border-green-500'
                            value={population}
                            onChange={(e) => setPopulation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className='w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
                    >
                        Calculate
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className='mt-4 text-red-600 text-center'>{error}</p>
                    )}
                </form>

                {/* Emission Results */}
                {result && (
                    <div className='mt-10'>
                        <h2 className='text-2xl font-semibold text-green-600 text-center mb-6'>Emission Results</h2>
                        <div className='space-y-4'>
                            <p className='text-lg text-gray-800'><strong>Total Emission:</strong> {result.total_emission} kg</p>
                            <p className='text-lg text-gray-800'><strong>Reduced Emission:</strong> {result.reduced_emission} kg</p>
                            <p className='text-lg text-gray-800'><strong>Reduction Percentage:</strong> {result.reduction_percentage}%</p>
                            <p className='text-lg text-gray-800'><strong>Per Capita Emission:</strong> {result.per_capita_emission} kg</p>
                        </div>

                        <h3 className='text-xl font-semibold text-gray-800 text-center mt-8'>Emission Reduction Graph</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={result.graph_data.kg_values.map((kg_val, i) => ({
                                    kg: kg_val,
                                    total_emission: result.graph_data.total_emissions[i],
                                    reduced_emission: result.graph_data.reduced_emissions[i],
                                }))}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="kg" label={{ value: 'Amount of Coal (kg)', position: 'insideBottomRight', offset: 0 }} />
                                <YAxis label={{ value: 'CO2 Emission (kg)', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="total_emission" stroke="#D32D41" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="reduced_emission" stroke="#76b7b2" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarbonFootprint;
