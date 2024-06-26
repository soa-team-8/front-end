export interface TourRating {
    id?: number;
    rating: number;
    comment?: string;
    touristId: number;
    tourId: number;
    tourDate: Date
    creationDate: Date;
    imageNames?: string[];
    images?: FileList;
}