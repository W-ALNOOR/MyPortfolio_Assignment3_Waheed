import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/Home.jsx";
import { MemoryRouter } from "react-router-dom";

describe("Home component", () => {
  test("renders welcome text", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
