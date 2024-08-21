import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./index.tsx";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Products List/i);
  expect(linkElement).toBeInTheDocument();
});
