'use client';

import { useState } from 'react';

import Image from 'next/image';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* NAV */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <h1 className="text-2xl font-extrabold">⛪ CRM Igreja</h1>

        {/* BOTÃO HAMBÚRGUER (MOBILE) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
          aria-label="Abrir menu"
        >
          {open ? '✖' : '☰'}
        </button>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <a href="#inicio" className="hover:underline">Início</a>
          <a href="#problemas" className="hover:underline">Problemas</a>
          <a href="#solucao" className="hover:underline">Solução</a>

          <a
            href="/login/user"
            className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Entrar
          </a>

          <a
            href="/register/user"
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
          >
            Criar conta
          </a>
        </nav>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col text-center py-6 space-y-4">
          <a onClick={() => setOpen(false)} href="#inicio">Início</a>
          <a onClick={() => setOpen(false)} href="#problemas">Problemas</a>
          <a onClick={() => setOpen(false)} href="#solucao">Solução</a>

          <a
            onClick={() => setOpen(false)}
            href="/login/user"
            className="mx-6 px-4 py-3 border border-black rounded-full"
          >
            Entrar
          </a>

          <a
            onClick={() => setOpen(false)}
            href="/register/user"
            className="mx-6 px-4 py-3 bg-black text-white rounded-full"
          >
            Criar conta
          </a>
        </div>
      )}
    </header>


      {/* HERO */}
      <section
        id="inicio"
        className="max-w-6xl mx-auto px-6 py-10 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          CRM para igrejas
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Cuide melhor <br /> da sua igreja 📊🙏
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Saiba quem está na igreja, quem desviou, quem não é batizado e muitas outras informações no nosso CRM feito especialmente para igrejas.
        </p>

      <a href="/register/user">
        <button
          className="
            md:px-8 md:py-4 px-4 py-3 rounded-full
            bg-black text-white
            font-semibold
            hover:scale-105 hover:bg-gray-900
            transition-all
            cursor-pointer
          "
        >
          Quero cuidar da minha igreja 🚀
        </button>
      </a>

      <a
        href="https://wa.me/5521992002356"
        target="_blank"
        rel="noopener noreferrer"
        className="
          hidden md:inline-flex
          items-center gap-2
          ml-2
          px-8 py-4
          rounded-full
          bg-green-500 text-white
          font-semibold
          hover:bg-green-600 hover:scale-105
          transition-all
        "
      >
        💬 WhatsApp
      </a>


      </section>

      <section className="py-2 bg-white" >
        <div
          className="
            relative mx-auto
            max-w-5xl
            md:rounded-2xl
            overflow-hidden
            shadow-2xl
            ring-1 ring-black/10
            bg-white
          "
        >
          <Image
            src="/img/dashboard1.png"
            alt="Dashboard do App Igreja"
            width={1200}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      <section className="py-0 bg-white" >
        <div
          className="
            relative mx-auto
            max-w-5xl
            md:rounded-2xl
            overflow-hidden
            shadow-2xl
            ring-1 ring-black/10
            bg-white
          "
        >
          <Image
            src="/img/dashboard2.png"
            alt="Dashboard do App Igreja"
            width={1200}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      <section className="py-2 bg-white item-center flex" >
        <div
          className="
            relative mx-auto
            max-w-5xl
            md:rounded-2xl
            overflow-hidden
            shadow-2xl
            ring-1 ring-black/10
            bg-white
          "
        >
          <Image
            src="/img/dashboard3.png"
            alt="Dashboard do App Igreja"
            width={600}
            height={300}
            className="w-auto h-auto"
            priority
          />
        </div>
      </section>

      {/* PROBLEMAS */}
      <section
        id="problemas"
        className="bg-gray-50 py-15"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Você enfrenta algum desses problemas? 😕
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              'Você não sabe quantas pessoas entram na sua igreja',
              'Você não percebe quando uma ovelha vai embora',
              'Falta tempo para cuidar de quem realmente precisa',
              'Poucas pessoas aceitam Jesus',
              'A igreja tem só jovens ou só idosos e você não entende o motivo',
            ].map((item, index) => (
              <div
                key={index}
                className="
                  p-6 border border-gray-200 rounded-xl
                  hover:shadow-md transition
                  bg-white
                "
              >
                <p className="text-gray-800">❌ {item}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
          <a href="/register/user">
            <button
              className="
                md:px-8 md:py-4 px-4 py-3 rounded-full
                bg-black text-white
                font-semibold
                hover:scale-105 hover:bg-gray-900
                transition-all
                cursor-pointer
              "
            >
              Quero cuidar da minha igreja 🚀
            </button>
          </a>
          </div>
        </div>
      </section>

      {/* CONSEQUÊNCIAS */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            As consequências desses problemas ⚠️
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              'Novos convertidos não recebem o cuidado necessário',
              'A igreja cresce sem estrutura preparada',
              'Membros se afastam sem que você perceba',
              'Baixo número de conversões revela falhas no evangelismo',
            ].map((item, index) => (
              <p
                key={index}
                className="text-gray-700 border-l-4 border-black pl-4"
              >
                {item}
              </p>
            ))}
          </div>

          <div className="text-center mt-12">
          <a href="/register/user">
            <button
              className="
                md:px-8 md:py-4 px-4 py-3 rounded-full
                bg-black text-white
                font-semibold
                hover:scale-105 hover:bg-gray-900
                transition-all
                cursor-pointer
              "
            >
              Quero cuidar da minha igreja 🚀
            </button>
          </a>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section
        id="solucao"
        className="bg-black py-24"
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            A solução: App Igreja 📈
          </h2>

          <div className="grid gap-8 md:grid-cols-3 " >
            {[
              '👥 Total de membros',
              '💧 Batizados e não batizados',
              '🔥 Conversões e reconciliações',
              '👫 Homens e mulheres',
              '🎂 Faixa etária',
              '📊 Relatórios claros e simples',
            ].map((item, index) => (
              <div
                key={index}
                className="
                  p-6 rounded-xl
                  border border-white/20
                  hover:bg-black hover:text-black
                  transition text-white
                "
              >
                {item}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/register/user">
              <button
                className="
                  md:px-8 md:py-4 px-4 py-3 rounded-full
                  bg-white text-black
                  font-semibold
                  hover:scale-105 hover:bg-gray-900
                  transition-all
                  cursor-pointer
                "
              >
                Quero cuidar da minha igreja 🚀
              </button>
            </a>
          </div>
        </div>
      </section>

  {/* <section
    id="contato"
    className="py-24 bg-white"
  >
  <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
        Vamos cuidar da sua igreja juntos 🙏
      </h2>

      <p className="text-gray-600 mb-6">
        Preencha o formulário e receba mais informações sobre como o
        App Igreja pode ajudar você a cuidar melhor das pessoas,
        do crescimento e da saúde da sua igreja.
      </p>

      <p className="text-sm text-gray-500">
        📩 Entraremos em contato por ligação, WhatsApp ou e-mail.
      </p>
    </div>
  </div>
</section> */}


{/* FOOTER */}
<footer
  id="contato"
  className="py-12 text-center text-sm text-gray-500"
>
  © {new Date().getFullYear()} App Igreja — Cuidando de vidas ❤️
</footer>

<a
  href="https://wa.me/5521992002356"
  target="_blank"
  rel="noopener noreferrer"
  className="
    fixed bottom-6 right-6 z-50
    flex items-center justify-center
    w-14 h-14 rounded-full
    bg-green-500 text-white
    shadow-2xl
    hover:bg-green-600 hover:scale-110
    transition-all
  "
  aria-label="Fale conosco no WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path d="M16.003 3C9.384 3 4 8.383 4 15c0 2.646.87 5.095 2.34 7.09L4 29l7.105-2.297A11.94 11.94 0 0 0 16.003 27C22.62 27 28 21.617 28 15S22.62 3 16.003 3zm0 21.8a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-4.22 1.36 1.38-4.11-.24-.38A9.77 9.77 0 0 1 6.2 15c0-5.4 4.4-9.8 9.803-9.8 5.4 0 9.8 4.4 9.8 9.8 0 5.4-4.4 9.8-9.8 9.8zm5.39-7.36c-.29-.14-1.71-.84-1.98-.94-.27-.1-.47-.14-.67.14-.2.29-.77.94-.95 1.13-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.44-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.03.14.19 2.07 3.16 5.01 4.43.7.3 1.24.48 1.66.61.7.22 1.33.19 1.83.12.56-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.19-.56-.33z" />
  </svg>
</a>


</div>
  );
}
