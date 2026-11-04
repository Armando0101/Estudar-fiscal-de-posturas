export function fisherYates(arr, rnd) {
  const a = arr.slice();
  const rand = rnd || Math.random;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

export function choiceId(index) {
  return "c" + index;
}

export function originalIndex(id) {
  return Number(String(id).replace(/^c/, ""));
}

export function defaultOrder(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(choiceId(i));
  return out;
}

export function correctPos(order, answerIndex) {
  return order.indexOf(choiceId(answerIndex));
}

export function orderForAnswer(n, answerIndex, lastCorrectPos, rnd) {
  let order = fisherYates(defaultOrder(n), rnd);
  let guard = 0;
  while (lastCorrectPos != null && correctPos(order, answerIndex) === lastCorrectPos && guard < 24) {
    order = fisherYates(defaultOrder(n), rnd);
    guard += 1;
  }
  if (lastCorrectPos != null && correctPos(order, answerIndex) === lastCorrectPos) {
    const i = lastCorrectPos;
    const want = choiceId(answerIndex);
    let j = order.findIndex((id, idx) => idx !== i);
    if (j < 0) j = (i + 1) % n;
    const atI = order[i];
    const atJ = order[j];
    if (atI === want) {
      order[i] = atJ;
      order[j] = atI;
    } else {
      const k = order.indexOf(want);
      order[k] = order[i];
      order[i] = order[j];
      order[j] = want;
    }
  }
  return order;
}
