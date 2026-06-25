'use client';

import { useEffect, useState } from 'react';
import { MemberService } from '@/service/member/MemberService';
import { UpdateMemberDTO, MemberResponseDTO } from '@/dto/member/MemberDTO';

type EditableField =
  | 'name'
  | 'phone'
  | 'email'
  | 'birthdate'
  | 'church'
  | 'cep'
  | 'address'
  | 'neighborhood'
  | 'city'
  | 'state';

const EDITABLE_FIELDS: EditableField[] = [
  'name',
  'phone',
  'email',
  'birthdate',
  'church',
  'cep',
  'address',
  'neighborhood',
  'city',
  'state',
];

const FIELD_LABELS: Record<string, string> = {
  name: 'Nome',
  email: 'E-mail',
  phone: 'Telefone',
  birthdate: 'Data de Nascimento',
  gender: 'Gênero',
  church: 'Igreja',
  cep: 'CEP',
  address: 'Endereço',
  neighborhood: 'Bairro',
  city: 'Cidade',
  state: 'Estado',
  invitationofgrace: 'Convite da Graça',
  status: 'Status',
};

const GENDER_OPTIONS = ['Masculino', 'Feminino'];
const INVITATION_OPTIONS = ['Aceitou Jesus', 'Reconciliou', 'Troca de igreja'];
const STATUS_OPTIONS = ['Está na igreja', 'Está afastado', 'Foi para outra igreja'];

export default function Membros() {
  const [users, setUsers] = useState<MemberResponseDTO[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<MemberResponseDTO[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UpdateMemberDTO>({});

  const loadData = async () => {
    try {
      const res = await MemberService.getAllMembers();
      setUsers(res.members);
      setFilteredUsers(res.members);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const result = users.filter(user =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  const handleEdit = (user: MemberResponseDTO) => {
    setEditingId(user._id);
    setExpandedId(user._id);
    setEditForm({ ...user });
  };

  const handleSave = async (_id: string) => {
    try {
      await MemberService.updateMember({ _id }, editForm);
      await loadData();
      setEditingId(null);
      setExpandedId(null);
      setEditForm({});
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleDelete = async (user: MemberResponseDTO) => {
    if (!confirm('Deseja apagar este membro?')) return;
    await MemberService.deleteMember({ _id: user._id, token: '' });
    setUsers(prev => prev.filter(u => u._id !== user._id));
  };

  const formatWhatsappLink = (phone: string) => {
    const onlyNumbers = phone.replace(/\D/g, '');
    return `https://wa.me/55${onlyNumbers}`;
  };

  if (loading) return <p>Carregando...</p>;

  return (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800">Membros</h1>

    <input
      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      placeholder="Buscar por nome..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />

    {error && <p className="text-red-500">{error}</p>}

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 hidden md:table-header-group">
          <tr></tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => {
            const isEditing = editingId === user._id;
            const data = isEditing ? editForm : user;

            return (
              <>
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 md:table-cell block">
                    <span className="font-semibold md:hidden"></span>
                    {user.name}
                  </td>

                  <td className="px-4 py-3 block">
                    <span className="font-semibold md:hidden"></span>
                    {user.phone && (
                      <a
                        href={formatWhatsappLink(user.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline font-medium"
                      >
                        {user.phone}
                      </a>
                    )}
                  </td>

                  <td className="px-4 py-3 block md:table-cell">
                    <span className="font-semibold md:hidden"></span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        user.baptized
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.baptized ? 'Batizado' : 'Não Batizado'}
                    </span>
                  </td>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        user.status === 'Está na igreja'
                          ? 'bg-emerald-100 text-emerald-700'
                          : user.status === 'Está afastado'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    `}
                  >
                    {user.status}
                  </span>


                  <td className="px-4 py-3 text-right block md:table-cell">
                    <div className="flex flex-col md:flex-row md:justify-end gap-2">
                      <button
                        className="cursor-pointer rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200 transition"
                        onClick={() =>
                          setExpandedId(
                            expandedId === user._id ? null : user._id
                          )
                        }
                      >
                        Ver mais
                      </button>

                      <button
                        className="cursor-pointer rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700 hover:bg-emerald-200 transition"
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </button>

                      <button
                        className="cursor-pointer rounded-full bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200 transition"
                        onClick={() => handleDelete(user)}
                      >
                        Apagar
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedId === user._id && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="p-6 overflow-x-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {EDITABLE_FIELDS.map(field => (
                          <div key={field}>
                          <label className="block font-medium text-gray-700 mb-1">
                            {FIELD_LABELS[field] ?? field}
                          </label>
                            <input
                              className="w-full max-w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                              disabled={!isEditing}
                              value={String(data[field] ?? '')}
                              onChange={e =>
                                setEditForm(prev => ({
                                  ...prev,
                                  [field]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        ))}

                        <div>
                          <label className="block font-medium text-gray-700 mb-1">
                            Gênero
                          </label>
                          <select
                            disabled={!isEditing}
                            className="w-full max-w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                            value={data.gender ?? ''}
                            onChange={e =>
                              setEditForm(prev => ({
                                ...prev,
                                gender: e.target.value,
                              }))
                            }
                          >
                            <option value="">Selecione</option>
                            {GENDER_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-gray-700 mb-1">
                            Convite da Graça
                          </label>
                          <select
                            disabled={!isEditing}
                            className="w-full max-w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                            value={data.invitationofgrace ?? ''}
                            onChange={e =>
                              setEditForm(prev => ({
                                ...prev,
                                invitationofgrace: e.target.value,
                              }))
                            }
                          >
                            <option value="">Selecione</option>
                            {INVITATION_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-gray-700 mb-1">
                            Batizado
                          </label>
                          <select
                            disabled={!isEditing}
                            className="w-full max-w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                            value={data.baptized ? 'true' : 'false'}
                            onChange={e =>
                              setEditForm(prev => ({
                                ...prev,
                                baptized: e.target.value === 'true',
                              }))
                            }
                          >
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            disabled={!isEditing}
                            className="w-full max-w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                            value={data.status ?? ''}
                            onChange={e =>
                              setEditForm(prev => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                          >
                            <option value="">Selecione</option>
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-6 flex flex-col md:flex-row gap-3">
                          <button
                            className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 transition"
                            onClick={() => handleSave(user._id)}
                          >
                            Salvar
                          </button>

                          <button
                            className="cursor-pointer rounded-lg bg-gray-400 px-5 py-2 text-white hover:bg-gray-500 transition"
                            onClick={() => {
                              setEditingId(null);
                              setExpandedId(null);
                              setEditForm({});
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

}
