import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  const Header = getByText("Checkout Form");
  expect(Header).toBeInTheDocument;
});

test(" user can fill out and submit the form", () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/first Name/i);
  const lastNameInput = screen.getByLabelText(/last Name/i);
  const addressInput = screen.getByLabelText(/address/i);
  const cityInput = screen.getByLabelText(/city/i);
  const stateInput = screen.getByLabelText(/state/i);
  const zipInput = screen.getByLabelText(/zip/i);

  //fill out form (top to bottom)
  fireEvent.change(firstNameInput, { target: { value: "Alice" } });
  fireEvent.change(lastNameInput, { target: { value: "Smith" } });
  fireEvent.change(addressInput, { target: { value: "123 Any Street" } });
  fireEvent.change(cityInput, { target: { value: "Anywhere" } });
  fireEvent.change(stateInput, { target: { value: "NY" } });
  fireEvent.change(zipInput, { target: { value: "12345" } });

  //submit the form - click button
  const button = screen.getByRole("button", { name: /checkout/i });
  fireEvent.click(button);

  //shows success message
  const success = screen.getByTestId(/successMessage/i);
  expect(success).toBeInTheDocument;
});
