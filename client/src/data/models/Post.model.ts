export interface PostModel {
    content: string;
    dateCreated?: string;
    title: string;
    author: {
      username: string;
    };
}
