import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import { NavBar } from "./NavBar";
import { Router } from "react-router";

const createRouterWrapper =
  (history): React.ComponentType =>
  ({ children }) =>
    <Router history={history}>{children}</Router>;

describe("NavBar", () => {
  it("navigation to home", () => {
    const history = createMemoryHistory();
    render(<NavBar />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("Home"));
    expect(history.location.pathname).toBe("/home");
  });

  it("navigation to cgv", () => {
    const history = createMemoryHistory();
    render(<NavBar />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("CGV"));
    expect(history.location.pathname).toBe("/cgv");
  });
});
