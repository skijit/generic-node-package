import { LogEntry, yo } from "../index";

const v = <LogEntry>{
  message: 'this is my message',
  data: 'some other data',
  time: new Date(),
  level: 'some level string'
};

test('First Placeholder Test', () => {
  expect(yo(v)).toBeDefined();
});