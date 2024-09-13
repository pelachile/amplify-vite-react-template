import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { SignUpInput, signUp } from "aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { TodoCreateForm } from "../ui-components";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const services = {
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const { username, password, options } = input;
      const customUsername = username.toLowerCase();
      const customEmail = options?.userAttributes?.email.toLowerCase();
      return signUp({
        username: customUsername,
        password,
        options: {
          ...input.options,
          userAttributes: {
            ...input.options?.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator services={services} initialState="signUp">
      {({ signOut, user }) => (
        <main>
          <div className="flex justify-center items-center mt-5 flex-col">
            <h1 className="text-3xl underline mb-5">
              {user?.signInDetails?.loginId}'s todos
            </h1>
            <div>
              <TodoCreateForm
                overrides={{
                  content: {
                    placeholder: "Enter a todo",
                    variation: "quiet",
                    label: "Todo",
                  },
                }}
              />
            </div>
            <div>
              <ul role="list" className="divide-y divide-gray-100">
                {todos.map((todo) => (
                  <li
                    onClick={() => deleteTodo(todo.id)}
                    key={todo.id}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    {todo.content}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={signOut}
              className="rounded-md px-3 py-2 bg-cyan-700 font-bold text-white"
            >
              Sign Out
            </button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
