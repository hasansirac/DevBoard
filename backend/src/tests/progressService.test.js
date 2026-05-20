const {
  calculateBoardProgress
} = require("../services/progressService");

describe("calculateBoardProgress", () => {
  test("should return 0 when task list is empty", () => {
    expect(calculateBoardProgress([])).toBe(0);
  });

  test("should return 0 when tasks are undefined", () => {
    expect(calculateBoardProgress(undefined)).toBe(0);
  });

  test("should return 50 when 2 of 4 tasks are done", () => {
    const tasks = [
      { status: "done" },
      { status: "done" },
      { status: "todo" },
      { status: "in_progress" }
    ];

    expect(calculateBoardProgress(tasks)).toBe(50);
  });

  test("should return 100 when all tasks are done", () => {
    const tasks = [
      { status: "done" },
      { status: "done" },
      { status: "done" }
    ];

    expect(calculateBoardProgress(tasks)).toBe(100);
  });

  test("should not count non-done statuses as completed", () => {
    const tasks = [
      { status: "todo" },
      { status: "in_progress" },
      { status: "done" }
    ];

    expect(calculateBoardProgress(tasks)).toBe(33);
  });
});