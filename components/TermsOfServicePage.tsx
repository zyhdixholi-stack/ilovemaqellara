import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl prose max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-emerald-800 mb-8">Kushtet e Shërbimit</h1>
      
      <p className="text-sm text-gray-500 italic text-center mb-8">Data e hyrjes në fuqi: 25 Korrik 2024</p>
      
      <p>Mirësevini në "Zbulo Maqellarën"! Duke përdorur aplikacionin tonë, ju pranoni të respektoni këto kushte shërbimi. Ju lutemi, lexojini me kujdes.</p>

      <h2>1. Përdorimi i Aplikacionit</h2>
      <p>Ky aplikacion ofrohet për të promovuar kulturën, historinë dhe bukuritë natyrore të njësisë administrative Maqellarë. Përdorimi i tij për çdo qëllim të paligjshëm ose të paautorizuar është rreptësisht i ndaluar.</p>

      <h2>2. Përmbajtja e Përdoruesit</h2>
      <p>Ju jeni përgjegjës për çdo përmbajtje (komente, foto, video) që postoni. Duke postuar, ju garantoni se keni të drejtat e nevojshme për atë përmbajtje dhe na jepni një licencë jo-ekskluzive, pa pagesë, për ta përdorur, shfaqur dhe shpërndarë atë në kuadër të aplikacionit.</p>
      <p>Përmbajtja nuk duhet të jetë:</p>
      <ul>
        <li>Ofenduese, nxitëse e urrejtjes, shpifëse, apo imorale.</li>
        <li>E paligjshme ose të shkelë të drejtat e palëve të treta.</li>
        <li>Të përmbajë portrete të identifikueshme personash pa pëlqimin e tyre, veçanërisht të miturish.</li>
      </ul>

      <h2>3. Të Drejtat e Administratorit</h2>
      <p>Ne rezervojmë të drejtën, por jo detyrimin, për të monitoruar, modifikuar, ose hequr përmbajtjen e postuar nga përdoruesit. Të gjitha postimet i nënshtrohen miratimit dhe ne mund të refuzojmë ose heqim çdo përmbajtje për çfarëdo arsye pa njoftim paraprak.</p>

      <h2>4. Kufizimi i Përgjegjësisë</h2>
      <p>Aplikacioni dhe përmbajtja e tij ofrohen "siç janë" pa asnjë garanci. Ne nuk jemi përgjegjës për asnjë dëm që mund të rezultojë nga përdorimi i këtij aplikacioni.</p>

      <h2>5. Ndryshimet në Kushte</h2>
      <p>Ne mund t'i rishikojmë këto kushte herë pas here. Versioni më i fundit do të jetë gjithmonë i disponueshëm në këtë faqe. Duke vazhduar përdorimin e aplikacionit pas hyrjes në fuqi të ndryshimeve, ju pranoni kushtet e rishikuara.</p>

      <div className="mt-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-r-lg">
        <p className="font-bold">Shënim i Rëndësishëm</p>
        <p>Ky dokument është një shembull dhe nuk përbën këshillë ligjore. Për një dokument ligjërisht të vlefshëm, rekomandohet konsultimi me një profesionist ligjor.</p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;