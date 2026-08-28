import { render, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import userEvent from "@testing-library/user-event"

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

describe("LoginForm", () => {
  test("renders the login form", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /login/i })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/username/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });

  test("login button is disabled when fields are empty", () => {
    render(<LoginForm />);

    const loginButton = screen.getByRole("button", {
            name: /login/i,
    });

        expect(loginButton).toBeDisabled();
  });

  test("enables login button when username and password are entered", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
        name: /login/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(passwordInput, "password123");

    expect(loginButton).toBeEnabled();
  });

});