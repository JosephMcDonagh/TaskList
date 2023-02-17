package com.thg.accelerator.tasklist.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class TaskListController {

    @Autowired
    TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        try {
            List<Task> tasks = taskService.getAllTasks();
            if(tasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
         }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") long id){
        Optional<Task> task = taskService.getTaskByID(id);
        if(task.isPresent()){
            return new ResponseEntity<>(task.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> newTask(@RequestBody Task task) {
        try {
            taskService.saveNewTask(task);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity <>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTaskByID(@PathVariable("id") long id, @RequestBody Task task){


            Optional<Task> existingTask = taskService.getTaskByID(id);
            if(existingTask.isPresent()){
                Task updatedTask = existingTask.get();
                taskService.updateTask(updatedTask, task);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteByID(@PathVariable("id") long id){
        try{
            taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/tasks")
    public ResponseEntity<HttpStatus> deleteAllTasks(){
        try{
            taskService.deleteAll();
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/incomplete")
    public ResponseEntity<List<Task>> incompleteTasks() {
        try {
            List<Task> tasks = taskService.getIncompleteTasks();
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/completed")
    public ResponseEntity<List<Task>> completedTasks() {
        try {
            List<Task> tasks = taskService.getCompletedTasks();
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/inProgress")
    public ResponseEntity<List<Task>> inProgressTasks() {
        try {
            List<Task> tasks = taskService.getInProgressTasks();
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/notInProgress")
    public ResponseEntity<List<Task>> notInProgressTasks() {
        try {
            List<Task> tasks = taskService.getNotInProgressTasks();
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/priority")
    public ResponseEntity<List<Task>> priorityOrder() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        taskService.sortByPrio(tasks);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/toBeStarted")
    public ResponseEntity<List<Task>> getTasksToBeStarted(){
        try {
            List<Task> tasks = taskService.getAllTasks();
            if(tasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            List<Task> returnedTasks = taskService.getTasksToBeStarted(tasks);
            return new ResponseEntity<>(returnedTasks, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
