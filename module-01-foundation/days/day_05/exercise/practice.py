class Vehicle:# inheritance
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        return(f"{self.make} {self.model}.")
    
    #child class

class Car(Vehicle): #pass' means it takes everything from the parent without changes yet
    pass

#super()

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

#override parent describes

class Truck(Vehicle):
    def describe(self):
        parent_text = super().describe()
        return(f"{parent_text} capacity as {self.capacity}.")
    
#polymorphism :create objects

my_car = Car("toyota", "minibus") 
my_truck = Truck("sinotruck", "F3car")

#both are different objects adjusts to single objects
fleet = [my_car, my_truck]

for vehicle in fleet:
    print(f"vehicle.describe()")

#abstract: 
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        return(f"{self.make} {self.model}.")
    from abc import ABC, abstractmethod
    @abstractmethod
    def wheels(self):
        pass
# subclass1
class Car(Vehicle):
    def wheels(self):
            return 5
#subclass2
class Truck(Vehicle):
    def wheels(self):
            return 10
        
    









    
       