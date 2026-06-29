package com.TodoList.todo_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;


    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }


    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }


    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }


    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = getTodoById(id);
        existing.setTitle(updatedTodo.getTitle());
        existing.setCompleted(updatedTodo.isCompleted());
        existing.setPriority(updatedTodo.getPriority());
        existing.setDueDate(updatedTodo.getDueDate());
        existing.setCategory(updatedTodo.getCategory());
        return todoRepository.save(existing);
    }


    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }


    public List<Todo> getTodosByPriority(Todo.Priority priority) {
        return todoRepository.findByPriority(priority);
    }

    public List<Todo> getTodosByCategory(String category) {
        return todoRepository.findByCategory(category);
    }
}