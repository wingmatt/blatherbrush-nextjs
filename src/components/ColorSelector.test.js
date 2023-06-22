import { render, screen } from "@testing-library/react";
import ColorSelector from './ColorSelector'

test('Color Selector label matches provided color', ()=> {
  render(<ColorSelector color="indigo"/>);
  const label = screen.getByLabelText("indigo")

  expect(label).toBeInTheDocument();
})