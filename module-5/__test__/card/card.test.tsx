import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Card from "../../components/Card";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Card Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  const mockProducts = [
    {
      id: 1,
      title: "Test Product",
      description: "This is a test product description.",
      price: 100,
      images: ["/test-image.jpg"],
    },
  ];

  test("renders product correctly", () => {
    render(<Card products={mockProducts} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  test("redirects to product page when clicked", () => {
    render(<Card products={mockProducts} />);

    fireEvent.click(screen.getByText("Test Product"));
    expect(mockPush).toHaveBeenCalledWith("/product/1");
  });

  test("adds product to cart when 'Add to Cart' is clicked", () => {
    Storage.prototype.setItem = jest.fn(); // Mock localStorage
    render(<Card products={mockProducts} />);

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.stringContaining("Test Product")
    );
    expect(mockPush).toHaveBeenCalledWith("/cart");
  });
});
