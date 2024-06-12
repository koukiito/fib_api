import JSONBig from "json-bigint-native";

export const getFibonacciByNImpl = async (req, res) => {
  let n: number;
  try {
    n = parseInt(req.query.n);
  } catch (e) {
    res.status(400).json({ status: 400, message: "Invalid input." });
    return;
  }

  // validate input
  if (isNaN(n) || n <= 0) {
    res.status(400).json({ status: 400, message: "Invalid input." });
    return;
  }

  // calculate fibonacci
  const fibonacci: bigint = fibonacciByN(n);
  // return result as JSON. Use bigintReplacer to handle bigint
  res
    .status(200)
    .type("json")
    .send(JSONBig.stringify({ status: 200, result: fibonacci }));
};

function fibonacciByN(n: number): bigint {
  //Use Not recursive method
  let n1: bigint = 1n;
  let n2: bigint = 1n;

  for (let i = 2; i < n; i++) {
    let temp: bigint = n1;
    n1 = n1 + n2;
    n2 = temp;
  }
  return n1;
}
