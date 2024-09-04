export function randomElem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function coalesceRandomly(
  maybeParam: string | null,
  // TODO: callable validation function for maybeParam
  defaultParams: string[],
): string {
  let param = randomElem(defaultParams);
  if (maybeParam) {
    param = maybeParam;
  }
  return param;
}

export function getFontParams() {
  const urlParams = new URLSearchParams(window.location.search);

  const fontParam = urlParams.get("font") || "";
  const font = coalesceRandomly(fontParam, []); // TODO: fonts

  return { font };
}

export function toURLParams(params: Record<string, string>) {
  const urlParams = new URLSearchParams();

  for (const key in params) {
    if (params[key]) {
      urlParams.append(key, params[key]);
    }
  }

  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
