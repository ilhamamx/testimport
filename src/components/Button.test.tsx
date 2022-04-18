import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("button component", () => {
  test("buttonbg primary", () => {
    render(
      <Button btnbg="primary" data-testid="button">
        <p data-testid="button-children">button-bg primary</p>
      </Button>
    );
    const button = screen.getByTestId("button");
    const p = screen.getByTestId("button-children");
    expect(button).toBeTruthy();
    expect(button).toHaveClass("btn btn-bg-primary");
    expect(button).toContainElement(p);
    expect(p).toHaveTextContent("button-bg primary");
  });
  test("buttonbs white", () => {
    render(
      <Button btnbs="white" data-testid="button">
        <p data-testid="button-children">button-bs white</p>
      </Button>
    );
    const button = screen.getByTestId("button");
    const p = screen.getByTestId("button-children");
    expect(button).toBeTruthy();
    expect(button).toHaveClass("btn btn-white");
    expect(button).toContainElement(p);
    expect(p).toHaveTextContent("button-bs");
  });
  test("buttonlg success", () => {
    render(
      <Button btnlg="success" data-testid="button">
        <p data-testid="button-children">button-lg success</p>
      </Button>
    );
    const button = screen.getByTestId("button");
    const p = screen.getByTestId("button-children");
    expect(button).toBeTruthy();
    expect(button).toHaveClass("btn btn-lg btn-success");
    expect(button).toContainElement(p);
    expect(p).toHaveTextContent("success");
  });
  test("buttonlg success, have content", () => {
    render(
      <Button
        btnlg="success"
        data-testid="button"
        backgroundcolor="green"
      >
        Text
      </Button>
    );
    const button = screen.getByTestId("button");
    expect(button).toBeTruthy();
    expect(button).toHaveClass("btn btn-lg btn-success");
    expect(button).toHaveTextContent(/^Text$/);
    expect(button).toHaveAttribute("backgroundcolor", "green");
  });
  test("buttonlg success, not have content", () => {
    render(
      <Button
        btnlg="success"
        data-testid="button"
        backgroundcolor="green"
      ></Button>
    );
    const button = screen.getByTestId("button");
    expect(button).toBeTruthy();
    expect(button).toHaveClass("btn btn-lg btn-success");
    expect(button).not.toHaveTextContent(/^Text$/);
    expect(button).toHaveAttribute("backgroundcolor", "green");
  });
  test("buttonlg success, onclick", () => {
    render(
      <Button
        btnlg="success"
        data-testid="button"
        backgroundcolor="green"
        onClick={() => {
            console.log = jest.fn();
            console.log('success')}}
      ></Button>
    );
    const button = screen.getByTestId("button");
    expect(button).toBeTruthy();
    expect(button).toHaveClass("btn btn-lg btn-success");
    expect(button).not.toHaveTextContent(/^Text$/);
    expect(button).toHaveAttribute("backgroundcolor", "green");
    userEvent.click(button);
    expect(console.log).toHaveBeenCalledWith('success');
  });
});
