'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from '@/components/dashboard/Home';
import CursosList from '@/components/dashboard/curso/CursosList';
import CriarCurso from '@/components/dashboard/curso/CriarCurso';
import { UserIdentityDTO } from "@/dto/user/UserDTO";
import { Can } from "@/components/can";
import { PERMISSIONS } from "@/utils/permissions";
import Membros from '@/components/dashboard/Membros';
import CreateUserManual from '@/components/dashboard/CreateUserManual';

type ActiveSection =
  | 'home'
  | 'cursos'
  | 'criar-curso'
  | 'membros'
  | 'celulas'
  | 'create-user-manual';

export default function UserAdminDashboard() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [user, setUser] = useState<UserIdentityDTO | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const useradminData = localStorage.getItem('user');
    if (!useradminData) {
      router.push('/login/user');
      return;
    }

    const parsed: UserIdentityDTO = JSON.parse(useradminData);
    queueMicrotask(() => {
      setUser(parsed);
    })
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login/user');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-white/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700
          text-white flex flex-col
          transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-white-700 text-white">
          <h1 className="text-xl font-bold text-white leading-tight">
            SUA LOGO<br />
          </h1>
          <p className="text-white text-sm mt-1">
            Admin: {user.name || user.email}
          </p>
        </div>

<nav className="flex-1 p-4 space-y-2">

  {/* TODO MUNDO */}
  <button
    onClick={() => {
      setActiveSection('home');
      setMenuOpen(false);
    }}
    className={`w-full text-left text-white px-4 py-3 rounded-lg transition
      ${activeSection === 'home'
        ? 'bg-zinc-500 font-semibold'
        : 'hover:bg-zinc-500'
      }
    `}
  >
    Inicio
  </button>

  {/* ADMIN OU LIDER DE MEMBROS */}
    <button
      onClick={() => {
        setActiveSection('membros');
        setMenuOpen(false);
      }}
      className={`w-full text-left text-white px-4 py-3 rounded-lg transition
        ${activeSection === 'membros'
          ? 'bg-zinc-500 font-semibold'
          : 'hover:bg-zinc-500'
        }
      `}
    >
      Membros
    </button>


  {/* ADMIN OU LIDER DE MEMBROS */}
    <button
      onClick={() => {
        setActiveSection('create-user-manual');
        setMenuOpen(false);
      }}
      className={`w-full text-left text-white px-4 py-3 rounded-lg transition
        ${activeSection === 'create-user-manual'
          ? 'bg-zinc-500 font-semibold'
          : 'hover:bg-zinc-500'
        }
      `}
    >
      Cadastrar Membro
    </button>

  {/* ADMIN */}
  {/* <Can user={user} permissions={[PERMISSIONS.ADMIN_ACCESS]}>
    <button
      onClick={() => {
        setActiveSection('cursos');
        setMenuOpen(false);
      }}
      className={`w-full text-left text-white px-4 py-3 rounded-lg transition
        ${activeSection === 'cursos'
          ? 'bg-zinc-500 font-semibold'
          : 'hover:bg-zinc-500'
        }
      `}
    >
      Gerenciar Estudos
    </button>
  </Can> */}

  {/* ADMIN OU LIDER DE Celula */}
  {/* <Can
    user={user}
    permissions={[
      PERMISSIONS.ADMIN_ACCESS,
      PERMISSIONS.CELULA_ACCESS
    ]}
  >
    <button
      onClick={() => {
        setActiveSection('celulas');
        setMenuOpen(false);
      }}
      className={`w-full text-left text-white px-4 py-3 rounded-lg transition
        ${activeSection === 'celulas'
          ? 'bg-zinc-500 font-semibold'
          : 'hover:bg-zinc-500'
        }
      `}
    >
      Gerenciar Celulas
    </button>
  </Can> */}

  </nav>


        <div className="p-4 border-t border-emerald-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 font-semibold transition text-white"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 overflow-auto md:ml-64">

        {/* HEADER MOBILE */}
        <header className="md:hidden flex items-center gap-4 p-4 bg-zinc-900 shadow-sm">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl font-bold text-white"
          >
            ☰
          </button>
          <span className="font-semibold text-white">
            SUA LOGO
          </span>
        </header>

        <div className="p-4 md:p-8">
          {activeSection === 'home' && (
            <Home />
          )}

          {/* {activeSection === 'cursos' && (
            <CursosList onEdit={() => setActiveSection('criar-curso')} />
          )}

          {activeSection === 'criar-curso' && (
            <CriarCurso onSuccess={() => setActiveSection('cursos')} />
          )} */}

          {activeSection === 'membros' && (
            <Membros/>
          )}

          {activeSection === 'create-user-manual' && (
            <CreateUserManual/>
          )}

          {/* {activeSection === 'celulas' && (
            <CelulasManager />
          )} */}
        </div>
      </main>
    </div>
  );
}
