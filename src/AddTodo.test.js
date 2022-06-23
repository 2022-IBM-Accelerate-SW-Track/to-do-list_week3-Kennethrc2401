import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole( 'textbox', { name: /Add New Item/i});
  const inputDate = screen.getByRole( 'textbox', { name: /Due Date/i});
  const element = screen.getByRole( 'button', { name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task 1"}});
  fireEvent.change(inputDate, { target: { value: "History 06/24/2022"}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Task 2"}});
  fireEvent.change(inputDate, { target: { value: "06/24/2022"}});
  fireEvent.click(element);
  const check = screen.getAllByText(new RegExp(/Task 1/i));
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByRole( 'textbox', { name: /Due Date/i});
  const element = screen.getByRole( 'button', { name: /Add/i});
  fireEvent.change(inputDate, { target: { value: "06/24/2022"}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole( 'textbox', { name: /Add New Item/i});
  const element = screen.getByRole( 'button', { name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task"}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole( 'textbox', { name: /Add New Item/i});
  const inputDate = screen.getByRole( 'textbox', { name: /Due Date/i});
  const element = screen.getByRole( 'button', { name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task A"}});
  fireEvent.change(inputDate, { target: { value: "06/25/2022"}});
  fireEvent.click(element);
  const taskCheckedOff = screen.getByRole('checkbox');
  fireEvent.click(taskCheckedOff);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole( 'textbox', { name: /Add New Item/i});
  const inputDate = screen.getByRole( 'textbox', { name: /Due Date/i});
  const element = screen.getByRole( 'button', { name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Wake Up for Work"}});
  fireEvent.change(inputDate, { target: { value: "06/25/2023"}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Do Homework"}});
  fireEvent.change(inputDate, { target: { value: "06/25/2021"}});
  fireEvent.click(element);
  const wakeUpForWorkCheck = screen.getByTestId(/Wake Up for Work/i).style.background;
  const doHomeworkCheck = screen.getByTestId(/Do Homework/i).style.background;
  expect( wakeUpForWorkCheck === doHomeworkCheck ).toBe(false);
});
