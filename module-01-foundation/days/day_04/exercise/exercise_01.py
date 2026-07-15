class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
     print(f"pages{self.title} written by {self.author} has {self.pages}")
           
book1 = Book("the lion", "jened.h.j.j", 250)
book2 = Book("the bird", "J.J.kal", 150)
book1.describe()
book2.describe()

        