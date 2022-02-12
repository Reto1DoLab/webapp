export interface Movie {
    id: number;
    name: string;
    year: number;
    imageURL: string;
    description: string;
    directors: string[];
    categorys: string[];
    actors: string[];
}