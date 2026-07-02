package com.TodoList.todo_app;

public class TodoNotFoundException extends RuntimeException{
    public TodoNotFoundException(String message)
    {
        super(message);
    }

}
