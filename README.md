# 📝 Todo REST API

A Todo REST API application built with Spring Boot, Spring Data JPA, and H2 Database.

## 🚀 Features
- ✅ Create, Read, Update, Delete todos
- ✅ Priority levels (HIGH, MEDIUM, LOW)
- ✅ Due dates for todos
- ✅ Categories (Work, Personal, Shopping)
- ✅ Filter todos by priority
- ✅ Filter todos by category

## 🛠️ Technologies Used
- Java 25
- Spring Boot 3.5.16
- Spring Data JPA
- H2 In-Memory Database
- Lombok
- Maven

## 🔗 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/todos | Get all todos |
| GET | /api/todos/{id} | Get todo by ID |
| GET | /api/todos/priority/{priority} | Get todos by priority |
| GET | /api/todos/category/{category} | Get todos by category |
| POST | /api/todos | Create new todo |
| PUT | /api/todos/{id} | Update todo |
| DELETE | /api/todos/{id} | Delete todo |

## 📋 Sample Request

### Create Todo:
```json
{
    "title": "Learn Spring Boot",
    "completed": false,
    "priority": "HIGH",
    "dueDate": "2026-07-05",
    "category": "Work"
}
```

### Sample Response:
```json
{
    "id": 1,
    "title": "Learn Spring Boot",
    "completed": false,
    "priority": "HIGH",
    "dueDate": "2026-07-05",
    "category": "Work"
}
```

## ⚙️ How to Run

1. Clone the repository
```bash
git clone https://github.com/Ragavi17/todo-app.git
```

2. Open in IntelliJ IDEA

3. Run the application

4. Open browser and go to: