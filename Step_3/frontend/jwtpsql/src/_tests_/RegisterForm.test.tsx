import { render, screen } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";

const mockRegister = jest.fn();
const mockPush = jest.fn();

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: jest.fn(),
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
  
});