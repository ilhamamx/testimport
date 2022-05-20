import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon component", () => {
  test("icon with danger badge", () => {
    render(
      <Icon
        imgSrc="/media/icons/duotune/communication/com002.svg"
        badgeStyle="bg-danger"
        number={9}
        data-testid="test-danger-badge"
        activeColor="custom"
        nav="/handled-customer"
        size="2hx"
      ></Icon>
    );
    const icon = screen.getByTestId("test-danger-badge");
    expect(icon).toBeInTheDocument();
    const a = screen.getByRole("link");
    expect(icon).toContainElement(a);
    expect(a).toBeInTheDocument();
    expect(a).toHaveClass("symbol w-25");
    const number = screen.getByText("9");
    expect(icon).toContainElement(number);
    expect(number).toBeInTheDocument();
    const href = a.getAttribute("href");
    expect(href).toEqual("/handled-customer");
    const imgicon = icon.childNodes[0];
    expect(imgicon).toHaveClass("svg-icon svg-icon-muted svg-icon-2hx");
    expect(imgicon).toContainHTML("svg");
    const badge = icon.childNodes[1];
    expect(badge).toHaveClass("symbol-badge badge badge-circle bg-danger");
  });

  test("icon with success badge", () => {
    render(
      <Icon
        imgSrc="/media/icons/duotune/communication/com010.svg"
        badgeStyle="bg-success"
        number={9}
        nav="/customer-in-queue"
        data-testid="test-succes-badge"
        activeColor="custom"
      ></Icon>
    );
    const icon2 = screen.getByTestId("test-succes-badge");
    expect(icon2).toBeInTheDocument();
    const number2 = screen.getByText("9");
    expect(number2).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("symbol w-25");
    expect(icon2).toContainElement(link);
    expect(icon2).toContainHTML("span");
    expect(icon2).toContainHTML("href");
    const img = icon2.childNodes[0];
    expect(img).toHaveClass("svg-icon svg-icon-muted svg-icon-4hx");
    const badgeIcon = icon2.childNodes[1];
    expect(badgeIcon).toHaveClass("symbol-badge badge badge-circle bg-success");
    // eslint-disable-next-line testing-library/no-node-access
    const test = icon2.querySelector("span.badge");
    expect(test).toBeInTheDocument();
  });

  test("icon without badge and non active", () => {
    render(
      <Icon
        imgSrc="/media/icons/duotune/general/gen024.svg"
        nav="/dashboard"
        data-testid="test-icon-without-badge"
        activeColor="custom"
      ></Icon>
    );
    const icon = screen.getByTestId("test-icon-without-badge");
    expect(icon).toBeInTheDocument();
    const a = screen.getByRole("link");
    expect(icon).toContainElement(a);
    expect(a).toBeInTheDocument();
    expect(a).toHaveClass("symbol w-25");
    const href = a.getAttribute("href");
    expect(href).toEqual("/dashboard");
    const imgicon = icon.childNodes[0];
    expect(imgicon).toHaveClass("svg-icon");
    expect(imgicon).toContainHTML("svg");
  });

  test("icon without badge and active", () => {
    render(
      <Icon
        imgSrc="/media/icons/duotune/communication/com005.svg"
        nav="/contact"
        data-testid="test-icon-without-badge2"
        activeColor="custom"
        size="3hx"
        currentLocation="/contact"
      ></Icon>
    );
    const iconContact = screen.getByTestId("test-icon-without-badge2");
    expect(iconContact).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(iconContact).toContainElement(link);
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("symbol w-25");
    const href2 = link.getAttribute("href");
    expect(href2).toEqual("/contact");
    const imgIcon = iconContact.childNodes[0];
    expect(imgIcon).toHaveClass("svg-icon svg-icon-custom");
  });

  test("icon with undefined/null notification", () => {
    render(
      <Icon
        imgSrc="/media/icons/duotune/communication/com002.svg"
        badgeStyle="bg-danger"
        data-testid="test-danger-badge"
        activeColor="custom"

      ></Icon>
    );
    const icon = screen.getByTestId("test-danger-badge");
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveClass("bg-danger");
    // eslint-disable-next-line testing-library/no-node-access
    const test = icon.querySelector("span.badge");
    expect(test).not.toBeInTheDocument();
  });

  test("icon with 0 number notification", () => {

    render(
      <Icon
        imgSrc="/media/icons/duotune/communication/com002.svg"
        badge="bg-danger"
        number={0}
        data-testid="test-danger-badge"
        activeColor="custom"
      ></Icon>
    );
    const icon = screen.getByTestId("test-danger-badge");
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveClass("bg-danger");
    // eslint-disable-next-line testing-library/no-node-access
    const test = icon.querySelector("span");
    expect(test).not.toHaveClass("svg-icon svg-icon-muted svg-icon-2hx");
  });
});

