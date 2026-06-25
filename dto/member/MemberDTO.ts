/**
 * DTOs relacionados ao domínio de Membro.
 * Arquivo único por simplicidade e fácil manutenção.
 */

export interface CreateMemberDTO {
    name: string;
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
    status?: string;
    owner: string;
}

export interface UpdateMemberDTO {
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
    status?: string;
}

export interface MemberResponseDTO {
    _id: string;
    name: string;
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
    status?: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberIdentityDTO {
    _id: string;
    token?: string;
    owner?: string;
}
