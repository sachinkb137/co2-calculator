from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

# Reuse your existing functions
def calculate(kg, coal, factor):
    x = coal[[0]]
    y = coal[1]
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=46)
    lr = LinearRegression()
    lr.fit(x_train, y_train)
    TotalEmission = factor * kg
    ReduceEmission = lr.predict([[kg]])[0]
    return {
        'total_emission': round(TotalEmission, 2),
        'reduced_emission': round(ReduceEmission, 2),
        'reduction_percentage': round((ReduceEmission / TotalEmission) * 100, 2)
    }

# Define routes for each type of coal
@app.route('/calculate', methods=['POST'])
def calculate_emission():
    data = request.json
    coal_type = data['coal_type']
    kg = data['kg']
    
    # Call the respective function based on coal type
    if coal_type == 'antracite':
        return jsonify(calculate(kg, pd.DataFrame({...}), 2.8696536797))
    elif coal_type == 'bitumin':
        return jsonify(calculate(kg, pd.DataFrame({...}), 2.5650649351))
    elif coal_type == 'lignite':
        return jsonify(calculate(kg, pd.DataFrame({...}), 1.5316883117))
    elif coal_type == 'subbitumin':
        return jsonify(calculate(kg, pd.DataFrame({...}), 1.848907563))
    else:
        return jsonify({'error': 'Invalid coal type'}), 400

if __name__ == '__main__':
    app.run(debug=True)
