import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Avatar from "./Avatar";

describe("avatar component", () => {

  test("avatar radius 0", async () => {
    render(
      <Avatar data-testid="avatar" height="100" width="100" imgRadius="0%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("100px");
    expect(getComputedStyle(imgAvatar).height).toBe("100px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("0%");
  });

  test("avatar radius 10", async () => {
    render(
      <Avatar data-testid="avatar" height="100" width="100" imgRadius="10%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("100px");
    expect(getComputedStyle(imgAvatar).height).toBe("100px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("10%");
  });

  test("avatar radius 20", async () => {
    render(
      <Avatar data-testid="avatar" height="100" width="100" imgRadius="20%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("100px");
    expect(getComputedStyle(imgAvatar).height).toBe("100px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("20%");
  });

  test("avatar radius 30", async () => {
    render(
      <Avatar data-testid="avatar" height="100" width="100" imgRadius="30%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("100px");
    expect(getComputedStyle(imgAvatar).height).toBe("100px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("30%");
  });

  test("avatar radius 40", async () => {
    render(
      <Avatar data-testid="avatar" height="100" width="100" imgRadius="40%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("100px");
    expect(getComputedStyle(imgAvatar).height).toBe("100px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("40%");
  });

  test("avatar radius 50", async () => {
    render(
      <Avatar data-testid="avatar" height="100" width="100" imgRadius="50%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("100px");
    expect(getComputedStyle(imgAvatar).height).toBe("100px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("50%");
  });

  test("avatar custom height & width", async () => {
    render(
      <Avatar data-testid="avatar" height="150" width="150" imgRadius="50%" imgSrc="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" > 
      </Avatar>
    );
    const imgAvatar = screen.getByRole('img');
    expect(imgAvatar).toBeTruthy();
    expect(imgAvatar).toHaveAttribute("src","https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png");
    expect(getComputedStyle(imgAvatar).width).toBe("150px");
    expect(getComputedStyle(imgAvatar).height).toBe("150px");
    expect(getComputedStyle(imgAvatar).borderRadius).toBe("50%");
  });


});
