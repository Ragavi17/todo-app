# 📝 Todo REST API

A Todo REST API application built with Spring Boot, Spring Data JPA, and MySQL Database.

## 🚀 Features
- ✅ Create, Read, Update, Delete todos
- ✅ Priority levels (HIGH, MEDIUM, LOW)
- ✅ Due dates for todos
- ✅ Categories (Work, Personal, Shopping)
- ✅ Filter todos by priority
- ✅ Filter todos by category
- ✅ Input Validation
- ✅ Global Exception Handling
- ✅ Proper HTTP Status Codes

## 🛠️ Technologies Used
- Java 25
- Spring Boot 3.5.16
- Spring Data JPA
- Hibernate
- MySQL Database
- Lombok
- Maven
- Postman (API Testing)

## 📁 Project Structure
src/main/java/com/TodoList/todo_app/
├── Todo.java                  → Entity (Database Table)
├── TodoRepository.java        → Repository (Database Operations)
├── TodoService.java           → Service (Business Logic)
├── TodoController.java        → Controller (REST API Endpoints)
├── TodoNotFoundException.java → Custom Exception
├── GlobalExceptionHandler.java→ Global Exception Handler
└── TodoAppApplication.java    → Main class

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

## ✅ Validation Rules

| Field | Rule |
|-------|------|
| title | Cannot be empty, must be 3-100 characters |
| priority | Cannot be null (HIGH, MEDIUM, LOW) |
| dueDate | Cannot be null, must be future date |
| category | Cannot be empty |

## ⚠️ Error Responses

### Todo Not Found (404):
```json
{
    "status": 404,
    "error": "Not Found",
    "message": "Todo not found with id: 999"
}
```

### Validation Failed (400):
```json
{
    "status": 400,
    "error": "Validation Failed",
    "messages": {
        "title": "Title cannot be empty!"
    }
}
```

## ⚙️ How to Run

### Prerequisites:
- Java 25
- MySQL 8.0
- Maven

### Database Setup:
```sql
CREATE DATABASE tododb;
```

### Configure application.properties:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tododb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### Run the application:
1. Clone the repository
```bash
git clone https://github.com/Ragavi17/todo-app.git
```
2. Open in IntelliJ IDEA
3. Configure MySQL credentials in application.properties
4. Run the application
5. Open Postman and test:

http://localhost:8080/api/todos

## 👩‍💻 Author
**Ragavi** — Java Developer
- GitHub: [@Ragavi17](https://github.com/Ragavi17)
- LinkedIn: [Ragavi](https://www.linkedin.com/in/ragavi-p-31b59b259/)