package com.thg.accelerator.tasklist.task;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.assertj.core.api.Assertions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
class TaskListControllerTest {
    private ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MockMvc mvc;

    @MockBean
    private TaskService taskService;

    private Task task1 = new Task("Test 1", "Test task 1", false, false, 5);
    private Task task2 = new Task("Test 2", "Test task 2", true, true, 5);



    @Test
    public void getAllTasks() throws Exception{

        List<Task> tasks = Arrays.asList(task1);
        when(taskService.getAllTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);
    }

    @Test
    public void getAllTasks_EmplyList() throws Exception{

        List<Task> tasks = Arrays.asList();
        when(taskService.getAllTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks"))
                .andExpect(status().isNoContent())
                .andReturn().getResponse().getContentAsString();
    }
    @Test
    public void getTaskByID() throws Exception{

        when(taskService.getTaskByID(task1.getId())).thenReturn(Optional.of(task1));

        String response = mvc.perform(
                        get("/tasks/"+task1.getId()))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        mvc.perform(get("/todolist/1"))
                .andExpect(status().isNotFound());

        Task result =  objectMapper.readValue(response, Task.class);

        Assertions.assertThat(result.getId()).isEqualTo(task1.getId());
        Assertions.assertThat(result.getTitle()).isEqualTo(task1.getTitle());
        Assertions.assertThat(result.getDescription()).isEqualTo(task1.getDescription());
        Assertions.assertThat(result.getCompleted()).isEqualTo(task1.getCompleted());
        Assertions.assertThat(result.getInProgress()).isEqualTo(task1.getInProgress());
        Assertions.assertThat(result.getPriority()).isEqualTo(task1.getPriority());

    }

    @Test
    public void newTask() throws Exception {

        String json = objectMapper.writeValueAsString(task1);

        mvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andReturn();
    }

    @Test
    public void updateTaskByID_successfulWhenTaskExists() throws Exception {


        String json = objectMapper.writeValueAsString(task2);

        when(taskService.getTaskByID(task2.getId())).thenReturn(Optional.of(task2));

        mvc.perform(
                        put("/tasks/{id}", 0)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andReturn();



    }

    @Test
    public void deleteByID() throws Exception {
        mvc.perform( MockMvcRequestBuilders.delete("/tasks/{id}", 1) )
                .andExpect(status().isOk());
        verify(taskService).deleteTask(1);
    }

    @Test
    public void deleteByID_whenErrorDeletingReturn500() throws Exception {
        doThrow(new RuntimeException("")).when(taskService).deleteTask(1);

        mvc.perform( MockMvcRequestBuilders.delete("/tasks/{id}", 1) )
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void deleteAllTasks() throws Exception {
        mvc.perform( MockMvcRequestBuilders.delete("/tasks") )
                .andExpect(status().isOk());
    }

    @Test
    public void getIncompleteTasks() throws Exception {
        List<Task> tasks = Arrays.asList(task1);
        when(taskService.getIncompleteTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks/incomplete"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);
    }

    @Test
    public void getCompleteTasks() throws Exception {
        List<Task> tasks = Arrays.asList(task2);
        when(taskService.getCompletedTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks/completed"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);
    }

    @Test
    public void getInProgressTasks() throws Exception {
        List<Task> tasks = Arrays.asList(task2);
        when(taskService.getInProgressTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks/inProgress"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);
    }

    @Test
    public void getNotInProgressTasks() throws Exception {
        List<Task> tasks = Arrays.asList(task1);
        when(taskService.getNotInProgressTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks/notInProgress"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);
    }

    @Test
    public void priorityOrder() throws Exception {
        List<Task> tasks = Arrays.asList(task1);
        when(taskService.getAllTasks()).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks/priority"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);
    }

    @Test
    public void getTasksToBeStarted() throws Exception {
        List<Task> tasks = Arrays.asList(task1);
        when(taskService.getAllTasks()).thenReturn(tasks);
        when(taskService.getTasksToBeStarted(tasks)).thenReturn(tasks);

        String response = mvc.perform(
                        get("/tasks/toBeStarted"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        List results =  objectMapper.readValue(response, List.class);

        Assertions.assertThat(results).hasSize(1);


    }

}
