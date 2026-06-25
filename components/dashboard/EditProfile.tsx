'use client';

import { useState, useEffect } from 'react';
import { UserIdentityDTO, UpdateUserDTO } from '@/dto/user/UserDTO';
import { UserService } from '@/service/user/UserService';

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    gender: string;
    church: string;
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    invitationofgrace: string;
    baptized: boolean;
    status: string;
}

const GENDER_OPTIONS = ['Masculino', 'Feminino'];
const INVITATION_OPTIONS = ['Aceitou Jesus', 'Reconciliou', 'Troca de igreja'];
const STATUS_OPTIONS = ['Está na igreja', 'Está afastado', 'Foi para outra igreja'];

export default function EditProfile() {
    const [user, setUser] = useState<UserIdentityDTO | null>(null);
    const [profileData, setProfileData] = useState<Partial<UserProfile>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser: UserIdentityDTO = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchUserData(parsedUser);
        } else {
            setError('Usuário não autenticado');
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (currentUser: UserIdentityDTO) => {
        try {
            setLoading(true);
            const data = await UserService.getUserById(currentUser);
            
            // Formatar data para input type="date"
            const birthdate = data.user.birthdate 
                ? new Date(data.user.birthdate).toISOString().split('T')[0]
                : '';

            setProfileData({
                ...data.user,
                birthdate,
            });
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        setProfileData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value,
        }));
        setPasswordError('');
    };

    const validateAndUpdatePassword = async () => {
        setPasswordError('');

        if (!passwordData.currentPassword) {
            setPasswordError('Digite sua senha atual');
            return false;
        }

        if (!passwordData.newPassword) {
            setPasswordError('Digite sua nova senha');
            return false;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError('A nova senha deve ter no mínimo 6 caracteres');
            return false;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('As senhas não coincidem');
            return false;
        }

        if (passwordData.newPassword === passwordData.currentPassword) {
            setPasswordError('A nova senha deve ser diferente da atual');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            setError('Usuário não autenticado');
            return;
        }

        try {
            setSaving(true);
            setError('');
            setSuccess('');

            const updateData: UpdateUserDTO = {
                name: profileData.name,
                email: profileData.email,
                phone: profileData.phone,
                birthdate: profileData.birthdate ? new Date(profileData.birthdate) : undefined,
                gender: profileData.gender,
                church: profileData.church,
                cep: profileData.cep,
                address: profileData.address,
                neighborhood: profileData.neighborhood,
                city: profileData.city,
                state: profileData.state,
                invitationofgrace: profileData.invitationofgrace,
                baptized: profileData.baptized,
                status: profileData.status,
            };

            await UserService.updateUser(user, updateData);
            setSuccess('Perfil atualizado com sucesso!');
            
            // Atualizar localStorage com novo nome se houver
            if (profileData.name) {
                const updatedUser = { ...user, name: profileData.name };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }

            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            setPasswordError('Usuário não autenticado');
            return;
        }

        const isValid = await validateAndUpdatePassword();
        if (!isValid) return;

        try {
            setSaving(true);
            setPasswordError('');

            const updateData: UpdateUserDTO = {
                password: passwordData.newPassword,
            };

            // Enviar também a senha atual para validação no backend
            const response = await fetch(`/api/user/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token || ''}`,
                },
                body: JSON.stringify({
                    ...updateData,
                    currentPassword: passwordData.currentPassword,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao atualizar senha');
            }

            setSuccess('Senha alterada com sucesso!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setShowPasswordSection(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setPasswordError(err instanceof Error ? err.message : 'Erro ao atualizar senha');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Carregando dados do perfil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Perfil</h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informações Pessoais */}
                    <fieldset className="border border-gray-200 rounded-lg p-4">
                        <legend className="text-lg font-semibold text-gray-700 px-2">
                            Informações Pessoais
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Nome */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name || ''}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email || ''}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Telefone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Data de Nascimento */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Data de Nascimento
                                </label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={profileData.birthdate || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Gênero */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gênero
                                </label>
                                <select
                                    name="gender"
                                    value={profileData.gender || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione...</option>
                                    {GENDER_OPTIONS.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Batismo */}
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="baptized"
                                        checked={profileData.baptized || false}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Batizado
                                    </span>
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    {/* Informações de Igreja */}
                    <fieldset className="border border-gray-200 rounded-lg p-4">
                        <legend className="text-lg font-semibold text-gray-700 px-2">
                            Informações de Igreja
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Igreja */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Igreja
                                </label>
                                <input
                                    type="text"
                                    name="church"
                                    value={profileData.church || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Convite de Graça */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Convite de Graça
                                </label>
                                <select
                                    name="invitationofgrace"
                                    value={profileData.invitationofgrace || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione...</option>
                                    {INVITATION_OPTIONS.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={profileData.status || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione...</option>
                                    {STATUS_OPTIONS.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    {/* Endereço */}
                    <fieldset className="border border-gray-200 rounded-lg p-4">
                        <legend className="text-lg font-semibold text-gray-700 px-2">
                            Endereço
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {/* CEP */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CEP
                                </label>
                                <input
                                    type="text"
                                    name="cep"
                                    value={profileData.cep || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Endereço */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Endereço
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profileData.address || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Bairro */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    name="neighborhood"
                                    value={profileData.neighborhood || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Cidade */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={profileData.city || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={profileData.state || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Botões */}
                    <div className="flex gap-4 justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                        >
                            {saving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>

                {/* SEÇÃO DE SEGURANÇA - ALTERAR SENHA */}
                <div className="mt-8 border-t pt-8">
                    <button
                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                        className="mb-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                    >
                        {showPasswordSection ? 'Cancelar' : 'Alterar Senha'}
                    </button>

                    {showPasswordSection && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Alterar Senha</h2>

                            {passwordError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {passwordError}
                                </div>
                            )}

                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                {/* Senha Atual */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Senha Atual *
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Digite sua senha atual"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Nova Senha */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nova Senha *
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Digite uma nova senha (mín. 6 caracteres)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Confirmar Senha */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirmar Nova Senha *
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirme sua nova senha"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Botões */}
                                <div className="flex gap-4 justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                                    >
                                        {saving ? 'Alterando...' : 'Alterar Senha'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
