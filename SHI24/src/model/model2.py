Elemission=0
ElRenew=0
Elpng=0
Eqemission=0
EqRenew=0
EqPng=0
def Electricity():
    global Elemission,ElRenew,Elpng
    unit=int(input("Enter Unit of Electricity:"))
    Elemission=unit*0.823
    ElRenew=unit*0.716
    Elpng=Elemission / 2.4761
    print(f"Total CO2 emission: {Elemission:.2f} Kg CO2")
    print(f"Considering Renewable Generation and Captive Injection into the Grid:{ElRenew:.2f}Kg CO2")
    print(f"Switching to PNG Total CO2 Emissions: {Elpng:.2f} Kg CO2")
def equipments():
    global Eqemission,EqRenew,EqPng
    eqp=str(input("Type the Industrial equipment such as Boiler, Furnace, or other:"))
    watt=int(input("Approx. Load (Watts):"))
    noamp=int(input("No. of appliances:"))
    hours=int(input("Avg. usage (hrs):"))
    Eqemission=(watt*noamp*hours*30.1045)/1000
    EqRenew=Eqemission*0.716
    EqPng=Eqemission/2.4761
    print(f"Total CO2 emission:{Eqemission:.2f}Kg CO2")
    print(f"Considering Renewable Generation and Captive Injection into the Grid:{EqRenew:.2f}Kg CO2")
    print(f"Switching to PNG Total CO2 Emissions: {EqPng:.2f} Kg CO2")
Electricity()
equipments()