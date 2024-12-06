# **Expense Tracker Application**

An **Expense Tracker Application** that allows users to manage their financial expenses efficiently. This application is built with an Angular-based frontend and an ASP.NET Core backend. The backend uses Entity Framework Core for database operations, and authentication is implemented using **BCrypt** for password hashing.

---

## **Table of Contents**

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
---

## **Features**

- **User Registration and Login**:
  - Sign up with a unique username, email, and password.
  - Login with secure authentication using BCrypt password hashing.
  
- **Expense Tracking**:
  - Add, update, and delete expenses.
  - Categorize expenses for better management.

---

## **Technology Stack**

### **Frontend**
- Framework: Angular 18.

### **Backend**
- Framework: .Net 8
- Database: SQL SERVER

---

## **Setup and Installation**

### **Backend Setup**

1. **Prerequisites**:
   - Install .NET 8 SDK.
   - Install SQL SERVER.

2. **Configure Database**:
   - Open the `appsettings.json` file located in the backend project directory.
   - Update the connection string to match your database configuration.

3. **Run Migrations**:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   
### **Frontend Setup**

1. **Prerequisites**:
   - Install  Node.js.
   - Install Angular CLI globally:

2. **Configure Database**:
   - Open the `appsettings.json` file located in the backend project directory.
   - Update the connection string to match your database configuration.

3. **Run Migrations**:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
     
