'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/service/user/UserService';
import { CreateUserDTO } from '@/dto/user/UserDTO';

const initialFormData: CreateUserDTO = {
    name: '',
    email: '',
    phone: '',
    birthdate: new Date(),
    gender: '',
    church: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    invitationofgrace: '',
    status: '',
    baptized: false,
    password: '123',
};

const INVITATION_OF_GRACE_OPTIONS = [
'Aceitou Jesus',
'Reconciliou',
'Troca de igreja',
];

const STATUS_OPTIONS = [
'Está na igreja',
'Está afastado',
'Foi para outra igreja',
];

const DEFAULT_PASSWORD = '123';


export default function CreateUserManual() {
    const router = useRouter();

    const [formData, setFormData] = useState<CreateUserDTO>(initialFormData);

    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const storedUser = localStorage.getItem('user');

            if (!storedUser) {
                throw new Error('Usuário não autenticado');
            }

            const user = JSON.parse(storedUser);

            // ID DO PAI (ADMIN)
            const ownerId = user._id;
            const church = user.church;

            const payload: CreateUserDTO = {
                ...formData,
                password: DEFAULT_PASSWORD,
                owner: ownerId, // 👈 ID DO PAI
                church: church, // 👈 IGREJA DO PAI
            };

            await UserService.createUser(payload);

            alert('Usuário cadastrado com sucesso!');
            setFormData(initialFormData);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        // checkbox só existe em input
        if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
            setFormData({
            ...formData,
            [name]: e.target.checked,
            });
            return;
        }

        // date (input)
        if (type === 'date') {
            setFormData({
            ...formData,
            [name]: new Date(value),
            });
            return;
        }

        // text, select, etc
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Cadastrar usuário</h1>
                    </div>
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                                placeholder="Seu nome"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                                placeholder="seu@email.com"
                            />
                        </div>

                        <input
                        type="date"
                        name="birthdate"
                        value={
                            formData.birthdate
                            ? formData.birthdate.toLocaleDateString('en-CA')
                            : ''
                        }
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gênero
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg bg-white"
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Igreja
                            </label>
                            <input
                                type="text"
                                name="church"
                                value={formData.church}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CEP
                            </label>
                            <input
                                type="text"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Endereço
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bairro
                            </label>
                            <input
                                type="text"
                                name="neighborhood"
                                value={formData.neighborhood}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cidade
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Convite da Graça
                            </label>

                            <select
                                name="invitationofgrace"
                                value={formData.invitationofgrace}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        outline-none transition-all text-gray-900 bg-white"
                            >
                                <option value="">Selecione uma opção</option>

                                {INVITATION_OF_GRACE_OPTIONS.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                                ))}
                            </select>
                        </div>


                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="baptized"
                                checked={formData.baptized}
                                onChange={handleChange}
                            />
                            <span className="text-sm text-gray-700">Batizado</span>
                        </label>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        outline-none transition-all text-gray-900 bg-white"
                            >
                                <option value="">Selecione uma opção</option>

                                {STATUS_OPTIONS.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                                ))}
                            </select>
                        </div>

                        {/* <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Senha <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                                placeholder="••••••••"
                            />
                        </div> */}

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                
                                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
                            >
                                {loading ? 'Criando...' : 'Criar usuário'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

