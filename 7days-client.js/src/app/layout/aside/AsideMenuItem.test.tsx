import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AsideMenuItem } from './AsideMenuItem'

describe("Aside Menu Item", () => {
  test("Menu item with bubble danger notification", () => {
    render(
      <MemoryRouter>
        <AsideMenuItem
            to='/unhandlechat'
            icon='/media/icons/duotune/communication/com002.svg'
            title='Customer in Queue'
            fontIcon='bi-app-indicator'
            bbcount={10}
            bbcolor='danger'
        />
      </MemoryRouter>
    );
    const asideMenuItem = screen.getByText("Customer in Queue");
    expect(asideMenuItem).toBeTruthy();
    expect(asideMenuItem).toHaveClass("menu-title");
    const bubble = screen.getAllByText(10)[1]
    expect(bubble).toBeTruthy();
    expect(bubble).toHaveClass("badge");
    expect(bubble).toHaveClass("badge-circle");
    expect(bubble).toHaveClass("fw-bolder");
    expect(bubble).toHaveClass("fs-7");
    expect(bubble).toHaveClass("bg-danger");
    const bubbleSide = screen.getAllByText(10)[0]
    expect(bubbleSide).toBeTruthy();
    expect(bubbleSide).toHaveClass("badge");
    expect(bubbleSide).toHaveClass("symbol-badge");
    expect(bubbleSide).toHaveClass("badge-circle");
    expect(bubbleSide).toHaveClass("menu-bubble");
    expect(bubbleSide).toHaveClass("bg-danger");
  });

  test("Menu item with bubble success notification", () => {
    render(
      <MemoryRouter>
        <AsideMenuItem
            to='/chat'
            icon='/media/icons/duotune/communication/com010.svg'
            title='Handled Customer'
            fontIcon='bi-layers'
            bbcount={9}
            bbcolor='success'
        />
      </MemoryRouter>
    );
    const asideMenuItem = screen.getByText("Handled Customer");
    expect(asideMenuItem).toBeTruthy();
    expect(asideMenuItem).toHaveClass("menu-title");
    const bubble = screen.getAllByText(9)[1]
    expect(bubble).toBeTruthy();
    expect(bubble).toHaveClass("badge");
    expect(bubble).toHaveClass("badge-circle");
    expect(bubble).toHaveClass("fw-bolder");
    expect(bubble).toHaveClass("fs-7");
    expect(bubble).toHaveClass("bg-success");
    const bubbleSide = screen.getAllByText(9)[0]
    expect(bubbleSide).toBeTruthy();
    expect(bubbleSide).toHaveClass("badge");
    expect(bubbleSide).toHaveClass("symbol-badge");
    expect(bubbleSide).toHaveClass("badge-circle");
    expect(bubbleSide).toHaveClass("menu-bubble");
    expect(bubbleSide).toHaveClass("bg-success");
  });

  test("Menu item without bubble notification", () => {
    render(
      <MemoryRouter>
        <AsideMenuItem
             to='/contacts'
             icon='/media/icons/duotune/communication/com005.svg'
             title='Contacts'
             fontIcon='bi-layers'
        />
      </MemoryRouter>
    );
    const asideMenuItem = screen.getByText("Contacts");
    expect(asideMenuItem).toBeTruthy();
    expect(asideMenuItem).toHaveClass("menu-title");
  });
});

