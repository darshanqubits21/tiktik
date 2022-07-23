export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  userId: string;
}

interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}
