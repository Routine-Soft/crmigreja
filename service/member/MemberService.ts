import { CreateMemberDTO, MemberIdentityDTO, UpdateMemberDTO, MemberResponseDTO } from '../../dto/member/MemberDTO';

export const MemberService = {
    getAllMembers: async (): Promise<{ members: MemberResponseDTO[] }> => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            throw new Error('Usuário não autenticado');
        }

        const user = JSON.parse(storedUser);
        const ownerId = user._id;

        const response = await fetch(`/api/member?owner=${ownerId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar membros');
        }

        return response.json();
    },

    getMemberById: async ({_id, token}: MemberIdentityDTO) => {
        const response = await fetch(`/api/member/${_id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
        });

        if (!response.ok){
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar membro')
        }

        return response.json()
    },

    createMember: async (memberData: CreateMemberDTO) => {
        const response = await fetch('/api/member', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(memberData),
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao criar membro')
        }

        return response.json();
    },

    updateMember: async ({_id, token}: MemberIdentityDTO, memberData: UpdateMemberDTO) => {
        const response = await fetch(`/api/member/${_id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify(memberData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao atualizar membro')
        }

        return response.json();
    },

    deleteMember: async ({_id, token}: MemberIdentityDTO) => {
        const response = await fetch(`/api/member/${_id}`, {
            method: 'DELETE',
            headers: { 
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao deletar membro')
        }

        return response.json();
    },
}
