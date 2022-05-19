import { render, screen, within } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon component", () => {
  test("icon with danger badge", () => {
    render(
      <Icon
        imgSrc="/media/icons/Chat_BW.png"
        badge="bg-danger"
        number={9}
        data-testid="test-danger-badge"
      ></Icon>
    );
    const icon = screen.getByTestId("test-danger-badge");
    expect(icon).toBeInTheDocument();
    const number = screen.getByText("9");
    expect(number).toBeInTheDocument();
    // expect(icon).toHaveClass(
    //   "symbol-badge badge badge-circle bg-danger start-100"
    // );
  });
});
