export function authorize() {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(["admin"]), 2000);
  });
}
