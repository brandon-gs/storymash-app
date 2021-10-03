export type Story = {
  image: string;
  category: Array<string>;
  lastPartCreatedAt: Date;
  views: Array<string>;
  totalLikes: number;
  totalComments: number;
  totalRankPoints: number;
  totalParts: number;
  parts: Array<StoryPart>;
  _id: string;
  author: {image: string; _id: string; username: string};
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StoryPart = {
  content: string;
  likes: Array<string>;
  comments: StoryPartComment[];
  createdAt: Date;
  updatedAt: Date;
};

export type Author = {
  username: string;
  image: string;
  _id: string;
};

export type StoryPartComment = {
  content: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};
