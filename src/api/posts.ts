export type NewPost = {
  title: string;
  description: string;
};

export type Post = NewPost & {
  id: string;
};

const url = process.env.REACT_APP_API_URL + "/posts";

export async function getPosts() {
  const response = await fetch(url);
  const body = await response.json();

  return body;
}

export async function getPost(id: string) {
  const response = await fetch(url + `/${id}`);
  const post = response.json();

  return post;
}

export async function savePost(post: NewPost) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  return body;
}
