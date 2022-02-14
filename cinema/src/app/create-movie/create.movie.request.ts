export interface CreateMovieRequest{
    title: string;
    description: string;
    date: Date;
    urlImage: string;
    
}
export class CreateMovieRequest implements CreateMovieRequest{
}