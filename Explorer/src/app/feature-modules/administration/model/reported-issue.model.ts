import { TourIssueComment } from "../../tour-authoring/model/tour-issue-comment";
import { Tour } from "../../tour-authoring/model/tour.model";

export interface ReportedIssue {
    id: number;
    category: string;
    description: string;
    priority: number;
    time: Date;
    tourId: number;
    touristId: number;
    resolved: boolean;
    tour: Tour;
    closed?: boolean;
    deadline?: Date;
    personName: string;
    profilePictureUrl: string;
    comments: TourIssueComment[];
}