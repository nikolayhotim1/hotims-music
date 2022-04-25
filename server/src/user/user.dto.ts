export class UserDto {
    readonly email: string;
    readonly id: string;
    readonly isActivated: boolean;

    constructor(model: any) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
};