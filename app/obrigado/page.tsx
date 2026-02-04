import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">

        <h1 className="text-4xl font-extrabold mb-4">
          Obrigado! 🙏
        </h1>

        <p className="text-gray-600 mb-8">
          Recebemos suas informações com sucesso.
          Em breve entraremos em contato por ligação, WhatsApp ou e-mail.
        </p>

        <Link
          href="/"
          className="
            inline-block px-8 py-4 rounded-full
            bg-black text-white font-semibold
            hover:scale-105 hover:bg-gray-900
            transition
          "
        >
          Voltar para o site ⛪
        </Link>

      </div>
    </main>
  );
}
