export interface CreateUserDto {
    id: number;
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PutUserDto {
    id: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    permissionLevel: number;
}

// Partial feature from TypeScript creates a new type by copying another type and making all its fields optional
export interface PatchUserDto extends Partial<PutUserDto> {}