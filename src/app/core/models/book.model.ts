import { AuthorModel } from './author.model'; // adjust the path as needed

export interface BookModel {
    id: number;
    name: string;
    authorName: string;
    // author: AuthorModel;

    // authorLink: string;
    // authorId: number;
    
    // recommended by currently logged in admin or not
    recommendedByMe?:boolean;
}