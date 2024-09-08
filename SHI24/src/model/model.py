import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
# primarily used in serializing and deserializing a Python object structure.
import pickle

def antracite(kg):
    Ant = pd.DataFrame({
        1: [1, 1], 2: [2, 3], 3: [3, 4], 4: [4, 6], 
        5: [5, 7], 6: [6, 9], 7: [7, 10], 8: [8, 12], 
        9: [9, 13], 10: [10, 15], 11: [11, 16]
    }, columns=[i for i in range(1, 12)])
    Ant = Ant.T
    factor = 2.8696536797
    calculate(kg, Ant, factor)

def bitu(kg):
    bitumin = pd.DataFrame({
        1: [1, 1], 2: [2, 3], 3: [3, 4], 4: [4, 6], 
        5: [5, 7], 6: [6, 9], 7: [7, 10], 8: [8, 12], 
        9: [9, 13], 10: [10, 15], 11: [11, 16]
    }, columns=[i for i in range(1, 12)])
    bitumin = bitumin.T
    factor = 2.5650649351
    calculate(kg, bitumin, factor)

def lig(kg):
    lign = pd.DataFrame({
        1: [1, 1], 2: [2, 2], 3: [3, 3], 4: [4, 3], 
        5: [5, 4], 6: [6, 5], 7: [7, 6], 8: [8, 7], 
        9: [9, 7], 10: [10, 8], 11: [11, 9]
    }, columns=[i for i in range(1, 12)])
    lign = lign.T
    factor = 1.5316883117
    calculate(kg, lign, factor)

def sub(kg):
    sub = pd.DataFrame({
        1: [1, 1], 2: [2, 2], 3: [3, 3], 4: [4, 4], 
        5: [5, 5], 6: [6, 6], 7: [7, 7], 8: [8, 8], 
        9: [9, 9], 10: [10, 10], 11: [11, 11]
    }, columns=[i for i in range(1, 12)])
    sub = sub.T
    factor = 1.848907563
    calculate(kg, sub, factor)

def calculate(kg, coal, factor):
    # Data splitting and Linear Regression model training
    x = coal[[0]]
    y = coal[1]
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=46)
    lr = LinearRegression()
    lr.fit(x_train, y_train)

    # Emission calculations for multiple kg values
    kg_values = np.arange(1, kg + 1, 1)  # Range of kg values from 1 to the input kg
    total_emissions = factor * kg_values
    reduced_emissions = lr.predict(kg_values.reshape(-1, 1))

    # Print output for the selected kg value
    TotalEmission = factor * kg
    ReduceEmission = lr.predict([[kg]])[0]
    
    print(f"Amount in kg is: {kg}")
    print(f"The total emission of CO2 is: {TotalEmission:.2f} ≈ {round(TotalEmission)}")
    print(f"By using piped natural gas, the reduction in CO2 emission is: {ReduceEmission:.2f} ≈ {round(ReduceEmission)}")
    
    # Reduction percentage
    reduce_percentage = round((ReduceEmission / TotalEmission) * 100, 2)
    print(f"Reduction in emission percentage: {reduce_percentage}%")

    # Create a line graph for Total and Reduced Emissions
    sns.set(style="whitegrid")
    plt.figure(figsize=(10, 6))

    # Plotting the data
    plt.plot(kg_values, total_emissions, label='Total Emission', color='#D32D41', linewidth=2, marker='o')
    plt.plot(kg_values, reduced_emissions, label='Reduced Emission', color='#76b7b2', linewidth=2, marker='o')

    # Labels and Title
    plt.xlabel('Amount of Coal (kg)', fontsize=12)
    plt.ylabel('CO2 Emission (kg)', fontsize=12)
    plt.title('Comparison of CO2 Emissions Over Coal Weight', fontsize=14, fontweight='bold')

    # Adding legend
    plt.legend(loc='best', fontsize=12)

    # Show the plot
    plt.tight_layout()
    plt.show()

    # save the modle
    pickle.dump(lr, open('model.pkl', 'wb'))
    modle = pickle.load(open('model.pkl', 'rb'))

def select_coal_type():
    print("Select the type of coal:")
    print("1. Antracite")
    print("2. Bitumin")
    print("3. Lignite")
    print("4. Subbitumin")

    choice = int(input("Enter the number corresponding to the type of coal: "))
    kg = int(input("Enter the amount of coal in KG: "))
    
    # Call the respective function based on choice
    if choice == 1:
        antracite(kg)
    elif choice == 2:
        bitu(kg)
    elif choice == 3:
        lig(kg)
    elif choice == 4:
        sub(kg)
    else:
        print("Invalid choice. Please select a valid coal type.")

# Start the program
select_coal_type()
