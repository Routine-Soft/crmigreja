/**
 * DTOs relacionados ao domínio de Usuário.
 * Arquivo único por simplicidade e fácil manutenção.
 */

export interface CreateUserDTO {
    name: string;
    phone: string;
    email: string;
    birthdate: Date;
    gender: string;
    church: string;
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    invitationofgrace: string;
    baptized: boolean;
    password: string;
    permissions?: string[];
    status: string;
    owner?: string;
    canLogin?: boolean;
}

export interface UpdateUserDTO {
    name?: string;
    phone?: string;
    email?: string;
    birthdate?: Date;
    gender?: string;
    church?: string;
    cep?: string;
    address?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    invitationofgrace?: string;
    baptized?: boolean;
    password?: string;
    permissions?: string[];
    status?: string;
}

export interface UserResponseDTO {
    _id: string;
    name: string;
    phone: string;
    email: string;
    birthdate: Date;
    gender: string;
    church: string;
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    invitationofgrace: string;
    baptized: boolean;
    permissions?: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    owner: string;
}

export interface UserIdentityDTO {
    _id: string;
    token?: string;
    name?: string;
    email?: string;
    owner?: string;
    permissions?: string[];
}