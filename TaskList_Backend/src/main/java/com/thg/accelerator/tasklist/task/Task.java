package com.thg.accelerator.tasklist.task;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "completed")
    private boolean completed;

    @Column(name="inProgress")
    private boolean inProgress;

    @Column(name="priority")
    private int priority;

    public Task(){

    }

    public Task(String title,String description, Boolean completed, Boolean inProgress, int priority) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.inProgress = inProgress;
        this.priority = priority;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public boolean getInProgress() {
        return inProgress;
    }

    public void setInProgress(boolean inProgress) {
        this.inProgress = inProgress;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "Task: id=" + id + ", title=" + title + ", desc=" + description + ", completed=" + completed + ", inProgress="
                + inProgress + ",priority=" + priority;
    }

}

