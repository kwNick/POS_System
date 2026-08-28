import { render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";
import userEvent from "@testing-library/user-event";

const mockRegister = jest.fn();
const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe("RegisterForm", () => {
  test("renders the registration form", () => {
    render(<RegisterForm />);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/username/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });
  
  test("register button is disabled when fields are empty", () => {
    render(<RegisterForm />);

    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });

    expect(registerButton).toBeDisabled();
  });

  test("enables register button when required fields are filled", async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(passwordInput, "password123");
    await user.type(emailInput, "nick@gmail.com");

    expect(registerButton).toBeEnabled();
  });

  test("calls register with the username email and password", async () => {
    const user = userEvent.setup();

    mockRegister.mockResolvedValue(true);

    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(emailInput, "nick@gmail.com");
    await user.type(passwordInput, "password123");

    await user.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith(
      "nick",
      "nick@gmail.com",
      "password123"
    );
  });

  test("displays an error when registration fails", async () => {
    const user = userEvent.setup();

    mockRegister.mockResolvedValue(false);

    render(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });

    await user.type(usernameInput, "nick");
    await user.type(emailInput, "nick@gmail.com");
    await user.type(passwordInput, "password123");

    await user.click(registerButton);

    expect(
      await screen.findByText(/invalid username or password/i)
    ).toBeInTheDocument();
  });

  test("refreshes the router after successful registration", async () => {
    const user = userEvent.setup();

    mockRegister.mockResolvedValue(true);

    render(<RegisterForm />);

    await user.type(
      screen.getByLabelText(/username/i),
      "nick"
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "nick@example.com"
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password123"
    );

    await user.click(
      screen.getByRole("button", { name: /register/i })
    );

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});