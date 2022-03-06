import { useState } from "react";
import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();
  const enterTaskHandler = async (taskText) => {
    const acquiredData = (data) => {
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };
    fetchTasks(
      {
        url: "https://maxi-eda2c-default-rtdb.firebaseio.com//tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      acquiredData
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
