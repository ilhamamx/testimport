import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {DropdownMenuItem} from './DropdownMenuItem'

describe("Dropdown input component", () => {
  test("input with bubble danger notification", () => {
    render(
      <MemoryRouter>
        <DropdownMenuItem
              data-testid='dropdown'
              to='/unhandlechat'
              title='Customer in Queue'
              bbcount={10}
              bbcolor='danger'
              />
      </MemoryRouter>
    );
    const dropdown = screen.getByText("Customer in Queue");
    expect(dropdown).toBeTruthy();
    fireEvent.click(dropdown);
    expect(dropdown).toHaveStyle({ backgroundColor: '' })
    expect(dropdown).toHaveClass("menu-text");
    const bubble = screen.getByText("10");
    expect(bubble).toBeTruthy();
    expect(bubble).toHaveClass("badge");
    expect(bubble).toHaveClass("badge-circle");
    expect(bubble).toHaveClass("fw-bolder");
    expect(bubble).toHaveClass("fs-7");
    expect(bubble).toHaveClass("bg-danger");
  });

  test("input with bubble success notification", () => {
    render(
      <MemoryRouter>
        <DropdownMenuItem
              data-testid='dropdown'
              to='/unhandlechat'
              title='Customer in Queue'
              bbcount={10}
              bbcolor='success'
              />
      </MemoryRouter>
    );
    const dropdown = screen.getByText("Customer in Queue");
    expect(dropdown).toBeTruthy();
    expect(dropdown).toHaveClass("menu-text");
    const bubble = screen.getByText("10");
    expect(bubble).toBeTruthy();
    expect(bubble).toHaveClass("badge");
    expect(bubble).toHaveClass("badge-circle");
    expect(bubble).toHaveClass("fw-bolder");
    expect(bubble).toHaveClass("fs-7");
    expect(bubble).toHaveClass("bg-success");
  });


  test("input without bubble notification", () => {
    render(
      <MemoryRouter>
        <DropdownMenuItem
              data-testid='dropdown'
              to='/unhandlechat'
              title='Customer in Queue'
              />
      </MemoryRouter>
    );
    const dropdown = screen.getByText("Customer in Queue");
    expect(dropdown).toBeTruthy();
    expect(dropdown).toHaveClass("menu-text");
    const bubble = screen.queryByText("10");
    expect(bubble).toBeNull();
  });
});

