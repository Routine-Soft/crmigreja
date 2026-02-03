// 'use client';

// import { useEffect, useState } from 'react';
// import {
//     CreateCelulaDTO,
//     UpdateCelulaDTO,
//     CelulaResponseDTO,
// } from '@/dto/celula/celulaDTO';
// import { CelulaService } from '@/service/celula/CelulaService';

// type Mode = 'list' | 'create' | 'edit';

// interface EnderecoDTO {
//     cep: string;
//     rua: string;
//     numero: string;
//     bairro: string;
//     cidade: string;
//     estado: string;
// }

// export default function CelulasManager() {
//     const [mode, setMode] = useState<Mode>('list');
//     const [celulas, setCelulas] = useState<CelulaResponseDTO[]>([]);
//     const [editingId, setEditingId] = useState<string | null>(null);

//     const [form, setForm] = useState<CreateCelulaDTO>({
//         lideres: [],
//         anfitrioes: [],
//         enderecos: [],
//         telefones: [],
//     });

//     const [inputValue, setInputValue] = useState('');
//     const [field, setField] = useState<'lideres' | 'anfitrioes' | 'telefones'>('lideres');

//     const [enderecoForm, setEnderecoForm] = useState<EnderecoDTO>({
//         cep: '',
//         rua: '',
//         numero: '',
//         bairro: '',
//         cidade: '',
//         estado: '',
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchCelulas();
//     }, []);

//     const fetchCelulas = async () => {
//         try {
//             const data = await CelulaService.getAllCelulas();
//             setCelulas(data.celulas || []);
//         } catch (error) {
//             if (error instanceof Error) {
//                 setError(error.message);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setForm({ lideres: [], anfitrioes: [], enderecos: [], telefones: [] });
//         setEnderecoForm({
//             cep: '',
//             rua: '',
//             numero: '',
//             bairro: '',
//             cidade: '',
//             estado: '',
//         });
//         setEditingId(null);
//     };

//     const addSimpleItem = () => {
//         if (!inputValue.trim()) return;

//         setForm({
//             ...form,
//             [field]: [...(form[field] || []), inputValue.trim()],
//         });

//         setInputValue('');
//     };

//     const addEndereco = () => {
//         const { cep, rua, numero, bairro, cidade, estado } = enderecoForm;
//         if (!cep || !rua || !numero || !bairro || !cidade || !estado) return;

//         setForm({
//             ...form,
//             enderecos: [...(form.enderecos || []), enderecoForm],
//         });

//         setEnderecoForm({
//             cep: '',
//             rua: '',
//             numero: '',
//             bairro: '',
//             cidade: '',
//             estado: '',
//         });
//     };

//     const handleCreate = async () => {
//         try {
//             if (!form.lideres.length) {
//                 setError('Informe ao menos um líder');
//                 return;
//             }

//             await CelulaService.createCelula({
//                 lideres: form.lideres,
//                 anfitrioes: form.anfitrioes?.length ? form.anfitrioes : undefined,
//                 enderecos: form.enderecos?.length ? form.enderecos : undefined,
//                 telefones: form.telefones?.length ? form.telefones : undefined,
//             });

//             resetForm();
//             setMode('list');
//             fetchCelulas();
//         } catch (error) {
//             if (error instanceof Error) {
//                 alert(error.message);
//             }
//         }
//     };

//     const handleEdit = (c: CelulaResponseDTO) => {
//         setEditingId(c._id);
//         setForm({
//             lideres: c.lideres || [],
//             anfitrioes: c.anfitrioes || [],
//             enderecos: c.enderecos || [],
//             telefones: c.telefones || [],
//         });
//         setMode('edit');
//     };

//     const handleUpdate = async () => {
//         if (!editingId) return;

//         try {
//             const payload: UpdateCelulaDTO = {
//                 lideres: form.lideres,
//                 anfitrioes: form.anfitrioes,
//                 enderecos: form.enderecos,
//                 telefones: form.telefones,
//             };

//             await CelulaService.updateCelula({ _id: editingId }, payload);

//             resetForm();
//             setMode('list');
//             fetchCelulas();
//         } catch (error) {
//             if (error instanceof Error) {
//                 alert(error.message);
//             }
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (!confirm('Deseja realmente deletar esta célula?')) return;

//         try {
//             await CelulaService.deleteCelula({ _id: id });
//             setCelulas((prev) => prev.filter((c) => c._id !== id));
//         } catch (error) {
//             if (error instanceof Error) {
//                 alert(error.message);
//             }
//         }
//     };

//     if (loading) return <div className="py-8 text-center">Carregando...</div>;

//     return (
//         <div className="max-w-4xl mx-auto space-y-6">
//             <h1 className="text-3xl font-bold">Células</h1>

//             {(mode === 'create' || mode === 'edit') && (
//                 <div className="bg-white p-6 rounded shadow space-y-4">
//                     <h2 className="text-xl font-semibold">
//                         {mode === 'create' ? 'Criar Célula' : 'Editar Célula'}
//                     </h2>

//                     <div className="flex gap-2">
//                         <select
//                             value={field}
//                             onChange={(e) => setField(e.target.value as 'lideres' | 'anfitrioes' | 'telefones')}
//                             className="border px-3 py-2 rounded"
//                         >
//                             <option value="lideres">Líder</option>
//                             <option value="anfitrioes">Anfitrião</option>
//                             <option value="telefones">Telefone</option>
//                         </select>

//                         <input
//                             value={inputValue}
//                             onChange={(e) => setInputValue(e.target.value)}
//                             className="flex-1 border px-3 py-2 rounded"
//                         />

//                         <button onClick={addSimpleItem} className="bg-emerald-600 text-white px-4 rounded">
//                             Adicionar
//                         </button>
//                     </div>

//                     {/* ENDEREÇO */}
//                     <div className="grid grid-cols-2 gap-2">
//                         {Object.entries(enderecoForm).map(([k, v]) => (
//                             <input
//                                 key={k}
//                                 placeholder={k}
//                                 value={v}
//                                 onChange={(e) =>
//                                     setEnderecoForm({ ...enderecoForm, [k]: e.target.value })
//                                 }
//                                 className="border px-3 py-2 rounded"
//                             />
//                         ))}
//                         <button onClick={addEndereco} className="col-span-2 bg-blue-600 text-white py-2 rounded">
//                             Adicionar Endereço
//                         </button>
//                     </div>

//                     <div className="flex gap-2 pt-4">
//                         <button
//                             onClick={mode === 'create' ? handleCreate : handleUpdate}
//                             className="flex-1 bg-emerald-600 text-white py-2 rounded"
//                         >
//                             Salvar
//                         </button>
//                         <button
//                             onClick={() => {
//                                 resetForm();
//                                 setMode('list');
//                             }}
//                             className="flex-1 bg-gray-300 py-2 rounded"
//                         >
//                             Cancelar
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {mode === 'list' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {celulas.map((c) => (
//                         <div key={c._id} className="bg-white p-6 rounded shadow space-y-2">
//                             <div><strong>Líderes:</strong> {c.lideres.join(', ')}</div>
//                             <div className="flex gap-2 pt-4">
//                                 <button onClick={() => handleEdit(c)} className="flex-1 bg-blue-600 text-white py-2 rounded">
//                                     Editar
//                                 </button>
//                                 <button onClick={() => handleDelete(c._id)} className="flex-1 bg-red-600 text-white py-2 rounded">
//                                     Deletar
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
