from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True, allow_headers=['Content-Type'], resources={r"/calculate": {"origins": "http://localhost:5173"}})

# Function to calculate emissions based on coal type
def calculate(kg, coal, factor, population):
    x = coal[[0]]
    y = coal[1]
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=46)
    lr = LinearRegression()
    lr.fit(x_train, y_train)

    kg_values = np.arange(1, kg + 1, 1)
    total_emissions = factor * kg_values
    reduced_emissions = lr.predict(kg_values.reshape(-1, 1))

    TotalEmission = factor * kg
    ReduceEmission = lr.predict([[kg]])[0]

    reduce_percentage = round((ReduceEmission / TotalEmission) * 100, 2)
    
    # Calculate per capita emissions
    per_capita_emission = TotalEmission / population if population > 0 else 0

    graph_data = {
        'kg_values': kg_values.tolist(),
        'total_emissions': total_emissions.tolist(),
        'reduced_emissions': reduced_emissions.tolist(),
    }

    return {
        'total_emission': round(TotalEmission, 2),
        'reduced_emission': round(ReduceEmission, 2),
        'reduction_percentage': reduce_percentage,
        'per_capita_emission': round(per_capita_emission, 2),
        'graph_data': graph_data
    }

# Define the route for calculating emissions
@app.route('/calculate', methods=['POST'])
def calculate_emission():
    try:
        data = request.get_json()

        print('====> data received', data)

        # Check for required fields: coal_type, kg, and population
        if not data or 'coal_type' not in data or 'kg' not in data or 'population' not in data:
            return jsonify({'error': 'Missing required fields: coal_type, kg, and population'}), 400

        coal_type = data['coal_type']
        kg = data.get('kg')
        population = data.get('population')

        if not isinstance(kg, (int, float)) or kg <= 0:
            return jsonify({'error': 'Invalid kg value'}), 400

        if not isinstance(population, (int, float)) or population <= 0:
            return jsonify({'error': 'Invalid population value'}), 400

        # Coal emission calculation logic
        if coal_type == 'antracite':
            coal_data = pd.DataFrame({
                0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            })
            factor = 2.8696536797
        elif coal_type == 'bitumin':
            coal_data = pd.DataFrame({
                0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            })
            factor = 2.5650649351
        elif coal_type == 'lignite':
            coal_data = pd.DataFrame({
                0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            })
            factor = 1.5316883117
        elif coal_type == 'subbitumin':
            coal_data = pd.DataFrame({
                0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            })
            factor = 1.848907563
        else:
            return jsonify({'error': 'Invalid coal type'}), 400

        # Call the calculation function for coal emissions
        result = calculate(kg, coal_data, factor, population)

        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print('-------------Server is Running!---------------')
    app.run(debug=True)
