export function authorize(userId: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["admin"]), 2000);
  });
}
