import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from "./TextInput";

describe("text input component", () => {
  test("input default", () => {
    render(
      <Input
      data-testid='input'/>
    );
    const input = screen.getByTestId("input");
    expect(input).toBeTruthy();
    expect(input).toHaveClass("form-control");
    expect(input).not.toHaveClass("is-invalid");
    expect(input).not.toHaveClass("is-valid");
  });
  
  test("input solid", () => {
    render(
      <Input
      formcontrol="solid"
      data-testid='input'/>
    );
    const input = screen.getByTestId("input");
    expect(input).toBeTruthy();
    expect(input).toHaveClass("form-control-solid");
    expect(input).not.toHaveClass("is-invalid");
    expect(input).not.toHaveClass("is-valid");
  });

  test("input transparent is-valid", () => {
    const isValid:boolean = true;
    render(
      <Input
      formcontrol="transparent"
      isvalid={isValid}
      data-testid='input'/>
    );
    const input = screen.getByTestId("input");
    expect(input).toBeTruthy();
    expect(input).toHaveClass("form-control-transparent");
    expect(input).toHaveClass("is-valid");
    expect(input).not.toHaveClass("is-invalid");
  });

  test("input white is-invalid", () => {
    const isValid = false;
    render(
      <Input
      formcontrol="white"
      isvalid={isValid}
      data-testid='input'/>
    );
    const input = screen.getByTestId("input");
    expect(input).toBeTruthy();
    expect(input).toHaveClass("form-control-white");
    expect(input).toHaveClass("is-invalid");
    expect(input).not.toHaveClass("is-valid");
  });
  
  test("input default with classname mb-3", async() => {
    render(
      <Input
      data-testid='input' cName="mb-3"/>
    );
    const input = screen.getByTestId("input");
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.blur(input);
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(input, {
        target: { value: "test@gmail.com" },
      });
    });
    expect(input).toHaveValue("test@gmail.com");
    expect(input).toBeTruthy();
    expect(input).toHaveClass("form-control");
    expect(input).toHaveClass("mb-3");
    expect(input).not.toHaveClass("is-invalid");
    expect(input).not.toHaveClass("is-valid");
  });
});
