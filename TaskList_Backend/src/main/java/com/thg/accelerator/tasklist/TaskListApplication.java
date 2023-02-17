package com.thg.accelerator.tasklist;

import com.thg.accelerator.tasklist.task.Task;
import com.thg.accelerator.tasklist.task.TaskListController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TaskListApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskListApplication.class, args);
    }
}
