import { Experience } from "./experience.model";
import { Academics } from "./academics.model";
export interface Resume {
    first_name: string;
    last_name: string;
    experiences: Experience[];
    city: string;
    email: string;
    date_of_birth: string;
    academics: Academics[];
}
