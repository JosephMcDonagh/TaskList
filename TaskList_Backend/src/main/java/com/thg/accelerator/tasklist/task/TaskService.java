package com.thg.accelerator.tasklist.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(@Autowired TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = new ArrayList<>();
        taskRepository.findAll().forEach(tasks::add);
        return tasks;
    }

    public Optional<Task> getTaskByID(long id) {
         Optional<Task> task = taskRepository.findById(id);
         return task;
    }

    public void saveNewTask(Task task) {
        taskRepository.save(task);
    }

    public void updateTask(Task updatedTask, Task newTask) {
        updatedTask.setTitle(newTask.getTitle());
        updatedTask.setDescription(newTask.getDescription());
        updatedTask.setCompleted(newTask.getCompleted());
        updatedTask.setInProgress(newTask.getInProgress());
        updatedTask.setPriority(newTask.getPriority());
        saveNewTask(updatedTask);
    }

    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    public void deleteAll() {
        taskRepository.deleteAll();
    }

    public List<Task> getIncompleteTasks() {
        List<Task> tasks = taskRepository.findByCompleted(false);
        return tasks;
    }

    public List<Task> getCompletedTasks() {
        List<Task> tasks = taskRepository.findByCompleted(true);
        return tasks;
    }

    public List<Task> getInProgressTasks() {
        List<Task> tasks = taskRepository.findByInProgress(true);
        return tasks;
    }

    public List<Task> getNotInProgressTasks() {
        List<Task> tasks = taskRepository.findByInProgress(false);
        return tasks;
    }

    public void sortByPrio(List<Task> tasks) {
        tasks.sort((t1, t2)->t2.getPriority()-t1.getPriority());
    }

    public List<Task> getTasksToBeStarted(List<Task> tasks) {
        List<Task> returnedTasks = new ArrayList<>();
        for (Task task: tasks) {
            if (!task.getCompleted() && !task.getInProgress()) {
                returnedTasks.add(task);
            }
        }
        return returnedTasks;
    }

}
