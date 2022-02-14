export interface CreateOfferRequest{
    description: string;
    deadline:Date;
    addPoints: number;
    subPoints: number;
    cinemaUsername: string;
}
export class CreateOfferRequest implements CreateOfferRequest{
}