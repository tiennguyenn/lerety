export type ViewerData = {
  login: string;
  avatarUrl: string;
};

export type GetViewerResponse = {
  data: {
    viewer: ViewerData;
  };
};

export type SearchFormData = {
  owner: string;
  name: string;
};
