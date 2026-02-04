'use client';

import { useState, useEffect } from 'react';
import { UserService } from '@/service/user/UserService';
import { UserResponseDTO } from '@/dto/user/UserDTO';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState<number | null>(null); // null = anual
    const [users, setUsers] = useState<UserResponseDTO[]>([]);

    const [stats, setStats] = useState({
        total: 0,
        baptized: 0,
        notBaptized: 0,
        aceitouJesus: 0,
        reconciliou: 0,
        recebeuOracao: 0,
        trocaIgreja: 0,
        homem: 0,
        mulher: 0,
    });

    const [ageStats, setAgeStats] = useState({
        criancas: 0,
        adolescentes: 0,
        jovens: 0,
        adultos: 0,
        meiaIdade: 0,
        idosos: 0,
    });

    const totalGeral = users.length;

    const calculateAge = (birthdate: Date | string) => {
        const birth = new Date(birthdate);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    };

    const percentage = (value: number) => {
        if (totalGeral === 0) return 0;
        return Math.round((value / totalGeral) * 100);
    };

    const filterUsersByDate = (users: UserResponseDTO[]) => {
    return users.filter(user => {
        if (!user.createdAt) return false;

        const date = new Date(user.createdAt);
        const userYear = date.getFullYear();
        const userMonth = date.getMonth();

        if (userYear !== year) return false;
        if (month !== null && userMonth !== month) return false;

        return true;
        });
    };

    useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await UserService.getAllUsers();
        setUsers(usersData.users || []);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const filteredUsers = filterUsersByDate(users);

    const statsCalculated = {
        total: filteredUsers.length,
        baptized: filteredUsers.filter(u => u.baptized).length,
        notBaptized: filteredUsers.filter(u => u.baptized === false).length,
        aceitouJesus: filteredUsers.filter(u => u.invitationofgrace === 'Aceitou Jesus').length,
        reconciliou: filteredUsers.filter(u => u.invitationofgrace === 'Reconciliou').length,
        recebeuOracao: filteredUsers.filter(u => u.invitationofgrace === 'Recebeu oração').length,
        trocaIgreja: filteredUsers.filter(u => u.invitationofgrace === 'Troca de igreja').length,
        homem: filteredUsers.filter(u => u.gender === 'Masculino').length,
        mulher: filteredUsers.filter(u => u.gender === 'Feminino').length,
    };

    setStats(statsCalculated);
}, [users, year, month]);


    useEffect(() => {
        const ageGroups = {
            criancas: 0,
            adolescentes: 0,
            jovens: 0,
            adultos: 0,
            meiaIdade: 0,
            idosos: 0,
        };

        users.forEach(user => {
            if (!user.birthdate) return;

            const age = calculateAge(user.birthdate);

            if (age <= 12) ageGroups.criancas++;
            else if (age <= 17) ageGroups.adolescentes++;
            else if (age <= 29) ageGroups.jovens++;
            else if (age <= 44) ageGroups.adultos++;
            else if (age <= 59) ageGroups.meiaIdade++;
            else ageGroups.idosos++;
        });

        setAgeStats(ageGroups);
    }, [users]);


    // useEffect(() => {
    // const loadData = async () => {
    //     try {
    //         const [usersData] = await Promise.all([
    //             UserService.getAllUsers(),
    //             // CelulaService.getAllCelulas()
    //         ]);

    //         // const user = usersData.users || [];
    //         setUsers(usersData.users || [])

    //         const statsCalculated = {
    //             total: users.length,
    //             baptized: users.filter(u => u.baptized === true).length,
    //             notBaptized: users.filter(u => u.baptized === false).length,
    //             aceitouJesus: users.filter(u => u.invitationofgrace === 'Aceitou Jesus').length,
    //             reconciliou: users.filter(u => u.invitationofgrace === 'Reconciliou').length,
    //             recebeuOracao: users.filter(u => u.invitationofgrace === 'Recebeu oração').length,
    //             trocaIgreja: users.filter(u => u.invitationofgrace === 'Troca de igreja').length,
    //             homem: users.filter(u => u.gender === 'Masculino').length,
    //             mulher: users.filter(u => u.gender === 'Feminino').length,
    //         };

    //         setStats(statsCalculated);

    //         const ageGroups = {
    //             criancas: 0,
    //             adolescentes: 0,
    //             jovens: 0,
    //             adultos: 0,
    //             meiaIdade: 0,
    //             idosos: 0,
    //             };

    //             users.forEach(user => {
    //             if (!user.birthdate) return;

    //             const age = calculateAge(user.birthdate);

    //             if (age <= 12) ageGroups.criancas++;
    //             else if (age <= 17) ageGroups.adolescentes++;
    //             else if (age <= 29) ageGroups.jovens++;
    //             else if (age <= 44) ageGroups.adultos++;
    //             else if (age <= 59) ageGroups.meiaIdade++;
    //             else ageGroups.idosos++;
    //         });

    //         const usersWithBirthdate = users.filter(u => u.birthdate);
    //         const percentage = (value: number) => {
    //         if (usersWithBirthdate.length === 0) return 0;
    //         return Math.round((value / usersWithBirthdate.length) * 100);
    //         };


    //         setAgeStats(ageGroups);

    //         // setUsersCount(usersData.users?.length || 0);
    //         // setCelulaCount(celulasData.celulas?.length || 0)
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             console.error(error.message);
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // loadData();
    // }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Painel Pastoral</h1>
                <p className="text-gray-600 mt-2">Bem-vindo ao painel administrativo</p>
            </div>

            {/* Filtros */}
            <div className="flex gap-4">
                <select
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="border rounded px-3 py-2"
                >
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                </select>

                <select
                value={month ?? ''}
                onChange={e =>
                    setMonth(e.target.value === '' ? null : Number(e.target.value))
                }
                className="border rounded px-3 py-2"
                >
                <option value="">Anual</option>
                {[
                    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
                ].map((m, i) => (
                    <option key={i} value={i}>{m}</option>
                ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total de membros (users) */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
                    <p className="text-gray-600 text-sm font-medium">Total de Geral</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{totalGeral}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
                    <p className="text-gray-600 text-sm font-medium">Total de Membros do período</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <p className="text-gray-600 text-sm font-medium">Batizados</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.baptized}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                    <p className="text-gray-600 text-sm font-medium">Não Batizados</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.notBaptized}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                    <p className="text-gray-600 text-sm font-medium">Aceitou Jesus</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.aceitouJesus}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                    <p className="text-gray-600 text-sm font-medium">Reconciliou</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.reconciliou}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                    <p className="text-gray-600 text-sm font-medium">Troca de Igreja</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.trocaIgreja}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                    <p className="text-gray-600 text-sm font-medium">Homens</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.homem}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                    <p className="text-gray-600 text-sm font-medium">Mulheres</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.mulher}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Faixa Etária dos Membros
                </h2>

                {[
                    { label: '(0–12)', value: ageStats.criancas },
                    { label: '(13–17)', value: ageStats.adolescentes },
                    { label: '(18–29)', value: ageStats.jovens },
                    { label: '(30–44)', value: ageStats.adultos },
                    { label: '(45–59)', value: ageStats.meiaIdade },
                    { label: '(60+)', value: ageStats.idosos },
                ].map(item => (
                    <div key={item.label} className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium text-gray-700">
                        {percentage(item.value)}% • {item.value} pessoas
                    </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-cyan-600 h-2 rounded-full"
                        style={{ width: `${percentage(item.value)}%` }}
                        />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
