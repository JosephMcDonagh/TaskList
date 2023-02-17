package com.thg.accelerator.tasklist.task;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByCompleted(boolean completed);
    List<Task> findByInProgress(boolean inProgress);


}
