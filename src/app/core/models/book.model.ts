import { AuthorModel } from './author.model'; // adjust the path as needed

export interface BookModel {
    id: number;
    name: string;
    authorName: string;
    // author: AuthorModel;

    // recommended by currently logged in admin or not
    recommendedByMe?:boolean;
}