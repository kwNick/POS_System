import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import userEvent from "@testing-library/user-event"

const mockLogin = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
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

  test("calls login with the username and password", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(passwordInput, "password123");

    await user.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith(
      "nick",
      "password123"
    );
  });

  test("displays an error when login fails", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValue(false);

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(passwordInput, "wrongpassword");

    await user.click(loginButton);

    expect(
      await screen.findByText(/invalid username or password/i)
    ).toBeInTheDocument();
  });

  test("refreshes the router after successful login", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValue(true);

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(passwordInput, "password123");

    await user.click(loginButton);

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

});