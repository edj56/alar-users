export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    city?: string;
    country?: string;
    phoneNumber?: string;
}
