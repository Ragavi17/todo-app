package com.TodoList.todo_app;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos=todoService.getAllTodos();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Todo todo=todoService.getTodoById(id);
        return new ResponseEntity<>(todo,HttpStatus.OK);
    }


    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable Todo.Priority priority) {
       List<Todo> todos=todoService.getTodosByPriority(priority);
       return new ResponseEntity<>(todos,HttpStatus.OK);
    }


    @GetMapping("/category/{category}")
    public ResponseEntity<List<Todo>> getTodosByCategory(@PathVariable String category) {
          List<Todo> todos=todoService.getTodosByCategory(category);
          return new ResponseEntity<>(todos,HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        Todo todos = todoService.createTodo(todo);
        return new ResponseEntity<>(todos, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody Todo todo) {
        Todo todos=todoService.updateTodo(id,todo);
        return new ResponseEntity<>(todos,HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return new ResponseEntity<>("Todo deleted successfully!",HttpStatus.OK);
    }
}