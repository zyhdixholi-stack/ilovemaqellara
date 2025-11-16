import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl prose max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-emerald-800 mb-8">Politika e Privatësisë</h1>

      <p className="text-sm text-gray-500 italic text-center mb-8">Data e hyrjes në fuqi: 25 Korrik 2024</p>
      
      <p>"Zbulo Maqellarën" është i përkushtuar për të mbrojtur privatësinë tuaj. Kjo Politikë Privatësie shpjegon se si ne mbledhim, përdorim dhe mbrojmë informacionin tuaj.</p>

      <h2>1. Informacioni që Mbledhim</h2>
      <p>Ne mbledhim informacionin që ju na jepni drejtpërdrejt kur përdorni aplikacionin tonë, si:</p>
      <ul>
        <li><strong>Informacioni i postimit:</strong> Emri juaj, komentet, fotot dhe videot që ju dërgoni për miratim.</li>
        <li><strong>Të dhënat e fjalëkalimit të administratorit:</strong> Fjalëkalimi për panelin e administratorit ruhet lokalisht në shfletuesin tuaj dhe nuk transmetohet tek serverat tanë.</li>
      </ul>
      <p>Ne nuk mbledhim automatikisht informacion personal identifikues si adresa IP apo të dhëna lokacioni, përveç rasteve kur ju i ndani ato vullnetarisht në përmbajtjen tuaj.</p>

      <h2>2. Si e Përdorim Informacionin Tuaj</h2>
      <p>Informacioni i mbledhur përdoret për qëllimet e mëposhtme:</p>
      <ul>
        <li>Për të operuar dhe mirëmbajtur aplikacionin.</li>
        <li>Për të shfaqur përmbajtjen tuaj pasi të jetë miratuar.</li>
        <li>Për të menaxhuar dhe moderuar postimet e komunitetit.</li>
        <li>Për t'ju identifikuar si autor i përmbajtjes që postoni.</li>
      </ul>

      <h2>3. Ndarja e Informacionit</h2>
      <p>Ne nuk e ndajmë informacionin tuaj personal me palë të treta, përveç në rastet e mëposhtme:</p>
      <ul>
        <li>Përmbajtja që ju postoni (emri, komenti, media) bëhet publike në aplikacion pasi miratohet.</li>
        <li>Nëse kërkohet nga ligji ose në përgjigje të një procesi të vlefshëm ligjor.</li>
      </ul>

      <h2>4. Siguria e të Dhënave</h2>
      <p>Ne marrim masa të arsyeshme për të mbrojtur informacionin tuaj. Megjithatë, asnjë sistem sigurie nuk është i pathyeshëm dhe ne nuk mund të garantojmë sigurinë absolute të të dhënave tuaja.</p>

      <h2>5. Ndryshimet në këtë Politikë</h2>
      <p>Ne mund ta përditësojmë këtë politikë privatësie herë pas here. Ne do t'ju njoftojmë për çdo ndryshim duke postuar politikën e re në këtë faqe.</p>

      <div className="mt-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-r-lg">
        <p className="font-bold">Shënim i Rëndësishëm</p>
        <p>Ky dokument është një shembull dhe nuk përbën këshillë ligjore. Për një dokument ligjërisht të vlefshëm, rekomandohet konsultimi me një profesionist ligjor.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;