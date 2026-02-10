import { CreateUserDTO, UserIdentityDTO, UpdateUserDTO, UserResponseDTO } from '../../dto/user/UserDTO';

export const UserService = {
    getAllUsers: async (): Promise<{ users: UserResponseDTO[] }> => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            throw new Error('Usuário não autenticado');
        }

        const user = JSON.parse(storedUser);
        const ownerId = user._id;

        const response = await fetch(`/api/user?owner=${ownerId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar usuários');
        }

        return response.json();
    },

    getUserById: async ({_id, token}: UserIdentityDTO) => {
        const response = await fetch(`/api/user/${_id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok){
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar usuário')
        }

        return response.json()
    },

    createUser: async (userData: CreateUserDTO) => {
        const response = await fetch('/api/user//register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao criar usuário')
        }

        return response.json();
    },

    loginUser: async (email: string, password: string) => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error ?? 'Erro ao fazer login')
        }

        return response.json();
    },

    updateUser: async ({_id, token}: UserIdentityDTO, userData: UpdateUserDTO) => {
        const response = await fetch(`/api/user/${_id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao atualizar usuário')
        }

        return response.json();
    },

    deleteUser: async ({_id, token}: UserIdentityDTO) => {
        const response = await fetch(`/api/user/${_id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao deletar usuário')
        }

        return response.json();
    },

}