import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChatLastMessage } from './ChatLastMessage'

describe("Chat Last Message", () => {
  test("Chat Last Message with Text Message", () => {
    render(
      <MemoryRouter>
        <ChatLastMessage
            lastmessage="Ini pesan terakhir"
            lastmessagetype="text"
            id="a1"
        />
      </MemoryRouter>
    );
    const chatLastMessage = screen.getByText("Ini pesan terakhir");
    expect(chatLastMessage).toBeInTheDocument();
  });

  test("Chat Last Message with Image Message", () => {
    render(
      <MemoryRouter>
        <ChatLastMessage
            lastmessage="ini caption akjsgdjagsjdaskdgajksdgjasjkdajksdajks jkagskjdajskgdjkagsd kajsdjkagsjd kajsgdkjasgdkj akjsgdjkahsdjkasgdj"
            lastmessagetype="image"
            id="a2"
        />
      </MemoryRouter>
    );
    const chatLastMessage = screen.getByTestId("a2");
    expect(chatLastMessage).toHaveClass("bi bi-camera-fill");
  });

  test("Chat Last Message with Audio Message", () => {
    render(
      <MemoryRouter>
        <ChatLastMessage
            lastmessage="ini audio akjsgdjagsjdaskdgajksdgjasjkdajksdajks jkagskjdajskgdjkagsd kajsdjkagsjd kajsgdkjasgdkj akjsgdjkahsdjkasgdj"
            lastmessagetype="audio"
            id="a3"
        />
      </MemoryRouter>
    );
    const chatLastMessage = screen.getByTestId("a3");
    expect(chatLastMessage).toHaveClass("bi bi-mic-fill");
  });

  test("Chat Last Message with Video Message", () => {
    render(
      <MemoryRouter>
        <ChatLastMessage
            lastmessage="ini video akjsgdjagsjdaskdgajksdgjasjkdajksdajks jkagskjdajskgdjkagsd kajsdjkagsjd kajsgdkjasgdkj akjsgdjkahsdjkasgdj"
            lastmessagetype="video"
            id="a4"
        />
      </MemoryRouter>
    );
    const chatLastMessage = screen.getByTestId("a4");
    expect(chatLastMessage).toHaveClass("bi bi-camera-video-fill");
  });

  test("Chat Last Message with Document Message", () => {
    render(
      <MemoryRouter>
        <ChatLastMessage
            lastmessage="ini Document akjsgdjagsjdaskdgajksdgjasjkdajksdajks jkagskjdajskgdjkagsd kajsdjkagsjd kajsgdkjasgdkj akjsgdjkahsdjkasgdj"
            lastmessagetype="document"
            id="a5"
        />
      </MemoryRouter>
    );
    const chatLastMessage = screen.getByTestId("a5");
    expect(chatLastMessage).toHaveClass("bi bi-file-earmark-fill");
  });

  test("Chat Last Message with Location Message", () => {
    render(
      <MemoryRouter>
        <ChatLastMessage
            lastmessage="ini lokasi akjsgdjagsjdaskdgajksdgjasjkdajksdajks jkagskjdajskgdjkagsd kajsdjkagsjd kajsgdkjasgdkj akjsgdjkahsdjkasgdj"
            lastmessagetype="location"
            id="a6"
        />
      </MemoryRouter>
    );
    const chatLastMessage = screen.getByTestId("a6");
    expect(chatLastMessage).toHaveClass("bi bi-geo-alt-fill");
  });

});

