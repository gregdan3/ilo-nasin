export async function consoleLogAsync(
  message: string,
  other?: any,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0)).then(() =>
    console.info(message, other),
  );
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
