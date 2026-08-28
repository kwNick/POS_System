import { render, screen } from "@testing-library/react";
import AddShopForm from "../components/AddShopForm";

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

describe("AddShopForm", () => {
  test("renders the add shop form", () => {
    render(<AddShopForm />);

    expect(
      screen.getByRole("heading", { name: /add shop/i })
    ).toBeInTheDocument();
  });
});