import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* NAV */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">⛪ App Igreja</h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#inicio" className="hover:underline">Início</a>
          <a href="#problemas" className="hover:underline">Problemas</a>
          <a href="#solucao" className="hover:underline">Solução</a>
          <a href="#contato" className="hover:underline">Contato</a>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="max-w-6xl mx-auto px-6 py-10 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          Tecnologia para igrejas
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Cuide melhor <br /> da sua igreja 📊🙏
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Tenha clareza sobre membros, novos convertidos, não batizados,
          evangelismo e crescimento da sua igreja — tudo em um único painel.
        </p>

      <a href="#contato">
        <button
          className="
            px-8 py-4 rounded-full
            bg-black text-white
            font-semibold text-lg
            hover:scale-105 hover:bg-gray-900
            transition-all
          "
        >
          Cuidar da sua igreja agora 🚀
        </button>
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
          <a href="#contato">
            <button
              className="
                px-8 py-4 rounded-full
                bg-black text-white
                font-semibold text-lg
                hover:scale-105 hover:bg-gray-900
                transition-all
              "
            >
              Cuidar da sua igreja agora 🚀
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
          <a href="#contato">
            <button
              className="
                px-8 py-4 rounded-full
                bg-black text-white
                font-semibold text-lg
                hover:scale-105 hover:bg-gray-900
                transition-all
              "
            >
              Cuidar da minha igreja agora ✝️
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
            <a href="#contato">
              <button
                className="
                  px-8 py-4 rounded-full
                  bg-black text-white
                  font-semibold text-lg
                  hover:scale-105 hover:bg-gray-900
                  transition-all
                "
              >
                Começar agora 🚀
              </button>
            </a>
          </div>
        </div>
      </section>

      <section
  id="contato"
  className="py-24 bg-white"
>
  <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    {/* TEXTO */}
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

    {/* FORMULÁRIO */}
    <div className="border border-gray-200 rounded-2xl p-8 shadow-sm">
      <form
        action="https://formsubmit.co/527894bd84d24a9d8d96773ae35a4128"
        method="POST"
        className="space-y-6"
      >
        {/* CONFIG FORM SUBMIT */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://appigreja-two.vercel.app/obrigado" />

        <div>
          <label className="block text-sm font-medium mb-1">
            Nome da igreja ⛪
          </label>
          <input
            type="text"
            name="nome_da_igreja"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
            placeholder="Ex: Igreja Batista Central"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            E-mail 📧
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            WhatsApp 📱
          </label>
          <input
            type="text"
            name="whatsapp"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
            placeholder="(99) 99999-9999"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Quantas filiais a igreja possui? 🏛️
          </label>
          <input
            type="number"
            name="quantidade_filiais"
            min="1"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
            placeholder="Ex: 1"
          />
        </div>

        <button
          type="submit"
          className="
            w-full py-4 rounded-full
            bg-black text-white
            font-semibold text-lg
            hover:scale-105 hover:bg-gray-900
            transition-all
          "
        >
          Quero cuidar da minha igreja 🚀
        </button>
      </form>
    </div>

  </div>
</section>


      {/* FOOTER */}
      <footer
        id="contato"
        className="py-12 text-center text-sm text-gray-500"
      >
        © {new Date().getFullYear()} App Igreja — Cuidando de vidas ❤️
      </footer>
    </div>
  );
}
