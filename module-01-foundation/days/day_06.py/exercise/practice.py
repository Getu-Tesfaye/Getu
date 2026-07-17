# --- BEFORE (SRP Violation) ---
# A single class doing everything
class BadReport:
    def build_report(self): return "Report Data"
    def save_to_file(self, data): print("Saving report to file...")
    def send_email(self, data): print("Emailing report...")

# --- AFTER (Following SRP) ---
class ReportBuilder:
    def build(self):
        return "Clean Report Data"

class ReportSaver:
    def save(self, data):
        print(f"Saved: '{data}' to the database successfully.")

class ReportEmailer:
    def send(self, data):
        print(f"Emailed: '{data}' to admin@example.com.")

# --- Test Exercise 1 ---
print("--- Exercise 1: SRP ---")
builder = ReportBuilder()
saver = ReportSaver()
emailer = ReportEmailer()

data = builder.build()
saver.save(data)
emailer.send(data)
print()


#exercise 2 =========================================================================
from abc import ABC, abstractmethod

# Abstract Base Class - closed for modification, open for new shapes
class Shape(ABC):
    @abstractmethod
    def print_area(self):
        pass

# Concrete implementations
class Circle(Shape):
    def print_area(self):
        print("Circle Area: π * r²")

class Square(Shape):
    def print_area(self):
        print("Square Area: side * side")

# --- Test Exercise 2 ---
print("--- Exercise 2: OCP ---")
shapes = [Circle(), Square()]
for shape in shapes:
    shape.print_area() # No if/elif blocks needed!
print()


#exercise 3=====================================================================

class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AppSettings, cls).__new__(cls)
            # Initialize our settings once
            cls._instance.currency = "ETB"
        return cls._instance

# --- Test Exercise 3 ---
print("--- Exercise 3: Singleton ---")
instance_one = AppSettings()
instance_two = AppSettings()

print(f"Instance 1 Currency: {instance_one.currency}")
print(f"Are both instances the exact same object?: {instance_one is instance_two}")
print()


#exercise4=====================================================================


class SimpleCircle:
    def draw(self): return "Drawing a Circle"

class SimpleSquare:
    def draw(self): return "Drawing a Square"

class SimpleTriangle:
    def draw(self): return "Drawing a Triangle"

class ShapeFactory:
    @staticmethod
    def create(kind):
        kind = kind.lower()
        if kind == "circle":
            return SimpleCircle()
        elif kind == "square":
            return SimpleSquare()
        elif kind == "triangle":
            return SimpleTriangle()
        else:
            raise ValueError(f"Unknown shape type: {kind}")

# --- Test Exercise 4 ---
print("--- Exercise 4: Factory ---")
factory_shape1 = ShapeFactory.create("circle")
factory_shape2 = ShapeFactory.create("triangle")

print(factory_shape1.draw())
print(factory_shape2.draw())
print()


#exercise5====================================================================

class NewsAgency:
    def __init__(self):
        self._subscribers = []
        self._latest_news = None

    def attach(self, subscriber):
        self._subscribers.append(subscriber)

    def detach(self, subscriber):
        self._subscribers.remove(subscriber)

    def notify_all(self):
        for subscriber in self._subscribers:
            subscriber.update(self._latest_news)

    def publish_news(self, news):
        self._latest_news = news
        print(f"NewsAgency published: {news}")
        self.notify_all()

class EmailSubscriber:
    def update(self, news):
        print(f"EmailSubscriber received alert: {news}")

class SMSSubscriber:
    def update(self, news):
        print(f"SMSSubscriber received text: {news}")

# --- Test Exercise 5 ---
print("--- Exercise 5: Observer ---")
agency = NewsAgency()

# Create pair of subscribers
sub1 = EmailSubscriber()
sub2 = SMSSubscriber()

# Attach them
agency.attach(sub1)
agency.attach(sub2)

# Publish news to trigger automatic updates
agency.publish_news("SOLID principles made easy!")