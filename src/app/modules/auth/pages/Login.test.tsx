import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import { MemoryRouter as Router } from "react-router-dom";

describe("login page", () => {
  test("email is valid", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const email = screen.getByTestId("email");
    expect(email).toHaveValue("admin@demo.com");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(email);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(email, {
        target: { value: "vita@amxware.com" },
      });
    });
    expect(email).toHaveValue("vita@amxware.com");
  });

  test("email not valid", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const email = screen.getByTestId("email");
    expect(email).toHaveValue("admin@demo.com");
    const password = screen.getByTestId("password");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(email);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(email, {
        target: {
          value: "vita.com",
        },
      });
      password.focus();
    });
    expect(password).toHaveFocus();
    expect(email).not.toHaveFocus();
    expect(email).toHaveValue("vita.com");
    expect(email).toHaveClass("is-invalid");
    const error = screen.getByTestId("emailerror");
    expect(error).toHaveTextContent("Wrong email format");
  });

  test("email is null", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const email = screen.getByTestId("email");
    expect(email).toHaveValue("admin@demo.com");
    const password = screen.getByTestId("password");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(email);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(email, {
        target: {
          value: "",
        },
      });
      password.focus();
    });
    expect(password).toHaveFocus();
    expect(email).not.toHaveFocus();
    expect(email).toHaveValue("");
    expect(email).toHaveClass("is-invalid");
    const error = screen.getByTestId("emailerror");
    expect(error).toHaveTextContent("Email is required");
  });

  test("password valid or not null", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const password = screen.getByTestId("password");
    expect(password).toHaveValue("demo");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(password);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(password, {
        target: { value: "testing" },
      });
    });
    expect(password).toHaveValue("testing");
  });

  test("password less than 3 character", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const password = screen.getByTestId("password");
    expect(password).toHaveValue("demo");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(password);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(password, {
        target: { value: "ab" },
      });
    });
    expect(password).toHaveValue("ab");
    const error = screen.getByTestId("passworderror");
    expect(error).toHaveTextContent("Minimum 3 symbols");
  });

  test("password is null", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const password = screen.getByTestId("password");
    expect(password).toHaveValue("demo");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(password);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(password, {
        target: { value: "" },
      });
    });
    expect(password).toHaveValue("");
    const error = screen.getByTestId("passworderror");
    expect(error).toHaveTextContent("Password is required");
  });
});
