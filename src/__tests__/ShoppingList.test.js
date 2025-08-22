import "whatwg-fetch";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { resetData } from "../mocks/handlers";
import { server } from "../mocks/server";
import ShoppingList from "../components/ShoppingList";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetData();
});
afterAll(() => server.close());

test("displays all the items from the server after the initial render", async () => {
  render(<ShoppingList />);

  expect(await screen.findByText(/Yogurt/)).toBeInTheDocument();
  expect(await screen.findByText(/Pomegranate/)).toBeInTheDocument();
  expect(await screen.findByText(/Lettuce/)).toBeInTheDocument();
});

test("adds a new item to the list when the ItemForm is submitted", async () => {
  const { rerender } = render(<ShoppingList />);

  const dessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/Category/i), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.getByText(/Add to List/i));

  const iceCream = await screen.findByText(/Ice Cream/);
  expect(iceCream).toBeInTheDocument();

  const desserts = await screen.findAllByText(/Dessert/);
  expect(desserts.length).toBe(dessertCount + 1);

  // Rerender the component to ensure the item was persisted
  rerender(<ShoppingList />);
  expect(await screen.findByText(/Ice Cream/)).toBeInTheDocument();
});

test("updates the isInCart status of an item when the Add/Remove from Cart button is clicked", async () => {
  const { rerender } = render(<ShoppingList />);

  const addButtons = await screen.findAllByText(/Add to Cart/i);

  expect(addButtons.length).toBe(3);
  expect(screen.queryByText(/Remove From Cart/i)).not.toBeInTheDocument();

  fireEvent.click(addButtons[0]);

  const removeButton = await screen.findByText(/Remove From Cart/i);
  expect(removeButton).toBeInTheDocument();

  // Rerender the component to ensure the item was persisted
  rerender(<ShoppingList />);

  const rerenderedAddButtons = await screen.findAllByText(/Add to Cart/i);
  const rerenderedRemoveButtons = await screen.findAllByText(/Remove From Cart/i);

  expect(rerenderedAddButtons.length).toBe(2);
  expect(rerenderedRemoveButtons.length).toBe(1);
});

test("removes an item from the list when the delete button is clicked", async () => {
  const { rerender } = render(<ShoppingList />);

  const yogurt = await screen.findByText(/Yogurt/i);
  expect(yogurt).toBeInTheDocument();

  const deleteButtons = await screen.findAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/Yogurt/i));

  // Rerender the component to ensure the item was persisted
  rerender(<ShoppingList />);

  const rerenderedDeleteButtons = await screen.findAllByText(/Delete/i);

  expect(rerenderedDeleteButtons.length).toBe(2);
  expect(screen.queryByText(/Yogurt/i)).not.toBeInTheDocument();
});
