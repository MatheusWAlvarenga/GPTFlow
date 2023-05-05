import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

const apiKeyTest: string =
  "";

function App() {
  const [question, setQuestion] = useState<string>("");
  const [chat, setChat] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const textArea: any = useRef();

  const handleSubmit = async (event?: any) => {
    setLoading(true);
    if (event) event.preventDefault();
    setChat(`${chat !== "" ? chat + "\n\n" : ""}Me: ${question}`);

    setChat(
      `${
        chat !== "" ? chat + "\n\n" : ""
      }Me: ${question}\n\nChatGPT: waiting...`
    );

    let text = "";
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKeyTest,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 2048,
        temperature: 0.5,
      }),
    })
      .then((response: any) => {
        return response.json();
      })
      .then((json) => {
        if (json.error?.message) text = `Error: ${json.error.message}`;

        if (json.choices[0]?.text)
          text = `ChatGPT: ${json.choices[0].text.toString() || "No answer."}`;
      })
      .catch((error: any) => {
        text = `ChatGPT: ${error.data || "Error during request."}`;
      });

    setChat(
      `${
        chat.length ? chat.replace("Wainting...", "") + "\n\n" : ""
      }Me: ${question}\n\n${text.length ? text.replace("\n\n", " ") : ""}`
    );
    setQuestion("");
    setLoading(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuestion(e.target.value);
  };

  const cleanChat = () => {
    setChat("");
    setQuestion("");
  };

  useEffect(() => {
    let area: any = textArea.current;
    area.scrollTop = area.scrollHeight;
  });

  return (
    <div className={styles.App}>
      <div className={styles.Title}>
        <span className={styles.Title1}>GPTFlow</span>
        <span className={styles.Title2}>ChatGPT Integration Simulator</span>
      </div>

      <textarea
        ref={textArea}
        className={styles.AppFieldView}
        id="QuestionBody"
        name="input2"
        value={chat}
        onChange={() => {}}
      ></textarea>

      {chat !== "" ? (
        <div className={styles.ClearChat}>
          <button
            type="button"
            onClick={cleanChat}
            className={styles.ClearChatButton}
          >
            Clear
          </button>
        </div>
      ) : (
        ""
      )}
      <form className={styles.InputForm} onSubmit={handleSubmit}>
        <input
          className={styles.InputField}
          type="text"
          id="input"
          name="input"
          placeholder="Send a Question..."
          value={question}
          onChange={onChange}
          required
          disabled={loading}
        />
        <button className={styles.InputButton} type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 15 15"
          >
            <path
              fill="#4479ff"
              d="m14.5.5l.46.197a.5.5 0 0 0-.657-.657L14.5.5Zm-14 6l-.197-.46a.5.5 0 0 0-.06.889L.5 6.5Zm8 8l-.429.257a.5.5 0 0 0 .889-.06L8.5 14.5ZM14.303.04l-14 6l.394.92l14-6l-.394-.92ZM.243 6.93l5 3l.514-.858l-5-3l-.514.858ZM5.07 9.757l3 5l.858-.514l-3-5l-.858.514Zm3.889 4.94l6-14l-.92-.394l-6 14l.92.394ZM14.146.147l-9 9l.708.707l9-9l-.708-.708Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default App;
