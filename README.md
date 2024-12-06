# **Expense Tracker Application**

An **Expense Tracker Application** that allows users to manage their financial expenses efficiently. This application is built with an Angular-based frontend and an ASP.NET Core backend.

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
     ```bash
     npm install -g @angular/cli@18.0.0

2. **Navigate to Frontend Directory**:
   ```bash
   cd Expense_Tracker_app/Expense_Tracker_app_Frontend

3. **Install Dependencies**:
   ```bash
   npm install
3. **Run the Frontend**:
   - The Angular application should be running at http://localhost:4200.
     ```bash
     ng serve
---
## **API Endpoints**

### **Authentication**

| Method | Endpoint         | Description        | Request Body                                                                     |
|--------|------------------|--------------------|---------------------------------------------------------------------------------|
| POST   | `/api/auth/signup` | User registration  | `{ "username": "string", "email": "string", "password": "string" }`              |
| POST   | `/api/auth/login`  | User login         | `{ "username": "string", "password": "string" }`                                 |

### **Planned Expense Management**

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| GET    | `/api/expenses`       | Fetch all expenses      |
| POST   | `/api/expenses`       | Add a new expense       |
| DELETE | `/api/expenses/{id}`  | Delete an expense       |
     
