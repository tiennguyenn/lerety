export type ViewerData = {
  login: string;
  avatarUrl: string;
};

export type GetViewerResponse = {
  viewer: ViewerData;
};

export type SearchFormData = {
  owner: string;
  name: string;
};

export type RepoType = {
  id: string;
  name: string;
  description: string;
  viewerHasStarred: boolean;
  stargazers: {
    totalCount: number;
  };
};

export type GetRepoResponse = {
  repository: RepoType;
};
