## Part 2: Written Questions


### Question 2.1: Explain your decisions

 >**Why did you structure your code the way you did?**
 - I've structured my code in a very simple way for several reasons.
   - To save time
   - Because as a test, this code is not likely to evolve over time, and even more developers won't be working on it.
   - This API is not intended to receive a large flow of operations.

>**What would you do differently in a production environment?**

- In a production environment I will:
    - Avoid sending my .env file containing my secret keys online.
    - Used an architecture like mvc to break up my code and better manage its complexity.
    - encrypts user passwords before saving them

### Question 2.2: Code Review

the error in this code is that: the verification of user information is incomplete.
a user whose age is null will respect the condition user.age<21 and will therefore be registered in the database.

# Part 3: Time Management Task

### 1- Fix a critical bug in the login module (5h).

It will be the first task to be carried out because if users can't log in they can't do anything on the platform, which could totally block their activity on the platform.

### 2- Document the API you developed in Task 1 (3h).

It will be the second, because if a problem occurs on this API, it will be difficult to debug if there's no documentation.

### 3- Optimize the database queries in an existing module (8h).

It will be the third, because we need to improve our application as our users grow.

### 4- Develop a new feature that has been highly requested by clients (24h). 

It will be the last one, because to develop a new feature, you have to make sure that the existing one behaves well, and it will take longer.
    