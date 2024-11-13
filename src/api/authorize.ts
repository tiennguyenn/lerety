export function authorize(userId: number) {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(["admin"]), 2000);
  });
}
