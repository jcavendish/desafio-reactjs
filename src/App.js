import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((error) =>
        console.warn(
          `An error occurred while fetching the repositories: ${error}`
        )
      );
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        title: "New repository",
        owner: "jcavendish",
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.warn(
        `An error occurred while creating a new repository: ${error}`
      );
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      console.warn(`An error occurred while deleting a repository: ${error}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
