// jest test
import { getFibonacciByNImpl } from "./controller";
import JSONBig from "json-bigint-native";

test("getFibonacciByNImpl - validated numbers", async () => {
  const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  const N = expected.length;
  for (let i = 1; i <= N; i++) {
    const req = {
      query: {
        n: i,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getFibonacciByNImpl(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      JSONBig.stringify({ result: expected[i - 1] }),
    );
  }
});

test("getFibonacciByNImpl - validated big numbers", async () => {
  const expected = [[99, 218922995834555169026n]];
  const N = expected.length;
  for (let i = 1; i <= N; i++) {
    const n = expected[i - 1][0];
    const expectedFib = expected[i - 1][1];
    const req = {
      query: {
        n: n,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getFibonacciByNImpl(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      JSONBig.stringify({ result: expectedFib }),
    );
  }
});

test("getFibonacciByNImpl - 0", async () => {
  const req = {
    query: {
      n: 0,
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await getFibonacciByNImpl(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    status: 400,
    message: "Invalid input.",
  });
});

test("getFibonacciByNImpl - minus", async () => {
  const req = {
    query: {
      n: -1,
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await getFibonacciByNImpl(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    status: 400,
    message: "Invalid input.",
  });
});

test("getFibonacciByNImpl - NaN", async () => {
  const req = {
    query: {
      n: "Hoge",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await getFibonacciByNImpl(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    status: 400,
    message: "Invalid input.",
  });
});
