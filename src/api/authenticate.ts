export type User = {
  id: number;
  name: string;
};

export function authenticate() {
  return new Promise<User>((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Bob" }), 2000);
  });
}
