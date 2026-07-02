package com.TodoList.todo_app;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Title cannot be empty!")
    @Size(min=3,max=100,message="Title must be between 3 and 100 characters!")
    @Column(name = "title")
    private String title;

    @Column(name = "completed")
    private boolean completed;

    @NotNull(message="Priority cannot be null!")
    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @NotNull(message="Due date cannot be null!")
    @Future(message="Due date must be a future date!")
    @Column(name = "due_date")
    private LocalDate dueDate;


     @NotBlank(message="Category cannot be empty!")
    @Column(name = "category")
    private String category;

    public enum Priority {
        HIGH, MEDIUM, LOW
    }
}