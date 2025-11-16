<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Aplikacioni "Zbulo Maqellarën" në AI Studio

Ky repozitorium përmban kodin burimor për aplikacionin interaktiv "Zbulo Maqellarën", i ndërtuar me React, Vite dhe Gemini API.

Shikoni aplikacionin tuaj në AI Studio: https://ai.studio/apps/drive/1D3oq_rOsN8bC6N5vlozatyEIq2U-USKm

## Si të Filloni

Ndiqni këto udhëzime për të marrë një kopje të projektit dhe për ta vënë në punë në kompjuterin tuaj lokal për qëllime zhvillimi dhe testimi.

### Parakushtet

Duhet të keni të instaluar [Node.js](https://nodejs.org/) (rekomandohet versioni 18 ose më i ri) dhe npm në kompjuterin tuaj.

### Instalimi dhe Konfigurimi

1.  **Klononi repozitoriumin:**
    ```bash
    git clone <url-i-repozitoriumit-tuaj>
    cd <direktoria-e-repozitoriumit-tuaj>
    ```

2.  **Instaloni varësitë:**
    Kjo komandë do të shkarkojë dhe instalojë të gjitha paketat e nevojshme të përcaktuara në `package.json`.
    ```bash
    npm install
    ```

3.  **Konfiguroni Variablat e Mjedisit:**
    Krijoni një skedar të ri me emrin `.env.local` në direktorinë rrënjë të projektit tuaj. Ky skedar është për çelësat tuaj sekretë API dhe do të injorohet nga Git (falë skedarit `.gitignore`). Shtoni çelësin tuaj Gemini API në këtë skedar:
    ```
    API_KEY=VENDOS_CELËSIN_TËND_GEMINI_API_KETU
    ```
    Zëvendësoni `VENDOS_CELËSIN_TËND_GEMINI_API_KETU` me çelësin tuaj aktual.

## Skriptet e Disponueshme

### Ekzekutimi në Modin e Zhvillimit
Kjo komandë nis serverin e zhvillimit.
```bash
npm run dev
```
Hapni [http://localhost:3000](http://localhost:3000) (ose adresën e shfaqur në terminalin tuaj) për ta parë në shfletues. Faqja do të ringarkohet nëse bëni ndryshime.

### Ndërtimi për Prodhim
Kjo komandë ndërton aplikacionin për prodhim në dosjen `dist`. Ajo paketon saktë React-in në modin e prodhimit dhe optimizon ndërtimin për performancën më të mirë.
```bash
npm run build
```
Ndërtimi është i minifikuar dhe emrat e skedarëve përfshijnë hashe për prishjen e cache-it. Aplikacioni juaj tani është gati për t'u vendosur!

### Paraqitja e Ndërtimit të Prodhimit
Kjo komandë shërben aplikacionin e ndërtuar për prodhim nga direktoria `dist`. Është një mënyrë e dobishme për të testuar ndërtimin e prodhimit lokalisht para se ta vendosni.
```bash
npm run preview
```

## Vendosja (Deployment)
Pas ekzekutimit të `npm run build`, do të krijohet një dosje `dist`. Kjo dosje përmban të gjithë skedarët statikë të aplikacionit tuaj.

Ju mund ta vendosni këtë dosje `dist` në çdo shërbim hostimi të faqeve statike, siç janë:
*   [Vercel](https://vercel.com/)
*   [Netlify](https://www.netlify.com/)
*   [GitHub Pages](https://pages.github.com/)
*   [Firebase Hosting](https://firebase.google.com/docs/hosting)

Shumica e këtyre shërbimeve ofrojnë një ndërfaqe të thjeshtë "drag-and-drop" ose mund të lidhen direkt me repozitoriumin tuaj Git për vendosje automatike.

## Publikimi në Android (Google Play Store)

Ky aplikacion është konfiguruar si një **Progressive Web App (PWA)**. Për ta publikuar në Google Play Store, duhet ta paketoni brenda një aplikacioni Android. Mjeti më i thjeshtë për këtë është [PWABuilder](https://www.pwabuilder.com/).

### Hapat Kryesorë

1.  **Vendosni Aplikacionin Web:** Sigurohuni që aplikacioni të jetë i aksesueshëm publikisht përmes një URL-je.

2.  **Paketoni me PWABuilder:**
    *   Shkoni te [www.pwabuilder.com](https://www.pwabuilder.com/).
    *   Vendosni URL-në tuaj dhe klikoni "Start".
    *   Klikoni butonin "Package For Stores", pastaj zgjidhni "Android".
    *   Në dritaren "Android Package Options":
        *   **Ndryshoni "Package ID"** në: `zbulo.maqellara`. Ky hap është shumë i rëndësishëm dhe duhet të përputhet me atë në skedarin `assetlinks.json`.
        *   **Sigurohuni që "Include source code"** të jetë zgjedhur "Enable".
        *   Klikoni **"Download Package"** për të shkarkuar kodin burimor (`.zip`). **KUJDES:** Ky nuk është skedari `.aab` final, por kodi i projektit Android.

3.  **Konfiguroni Digital Asset Links (Lidhjet e Aseteve Dixhitale):**
    Ky hap është thelbësor për të hequr shiritin e shfletuesit dhe për të mundësuar një përvojë të plotë si aplikacion.

    #### Si ta gjeni gjurmën dixhitale SHA-256
    Pasi të keni shkarkuar kodin burimor nga PWABuilder (si skedar `.zip`) dhe ta keni zbërthyer, përdorni metodën e mëposhtme për të gjetur gjurmën dixhitale të certifikatës suaj të nënshkrimit.

    **Metoda e Rreshtit të Komandave `gradlew` (Më e Besueshme)**
    Kjo është metoda më e mirë dhe funksionon edhe nëse Android Studio ka probleme.

    1.  **Gjeni dhe Zbërthejeni Skedarin e Duhur:** Së pari, gjeni skedarin `.zip` që keni shkarkuar nga **PWABuilder** (zakonisht në dosjen tuaj "Downloads"). Zbërthejeni (`extract`/`unzip`) përmbajtjen e tij në një dosje të re dhe të lehtë për t'u gjetur, p.sh., në Desktop.
    
    2.  **Hapni një Terminal/Command Prompt.**
    
    3.  **Navigoni te Dosja e Projektit Android:** Përdorni komandën `cd` për të lëvizur **brenda** dosjes që zbërthyet në hapin 1.

        **KUJDES:** Ky **NUK** është i njëjti folder me projektin tuaj web. Folderi i saktë duhet të përmbajë skedarët `gradlew.bat` dhe `gradlew`.

        *Shembull në Windows:*
        ```bash
        cd C:\Users\EmriJuaj\Desktop\pwa-android-project
        ```

    4.  **Ekzekutoni Komandën:** Pasi të jeni në dosjen e duhur, shkruani dhe ekzekutoni komandën përkatëse:
        *   Në Windows: `.\gradlew.bat signingReport`
        *   Në macOS ose Linux: `./gradlew signingReport`
        
        **Shënim i rëndësishëm për Windows:** Nëse përdorni PowerShell (terminali standard në versionet e reja të Windows), sigurohuni që të shtoni `.\` përpara komandës. Ky prefiks i tregon terminalit të ekzekutojë komandën nga dosja aktuale. Nëse përdorni Command Prompt-in e vjetër (`cmd`), komanda `gradlew.bat signingReport` mund të funksionojë pa `.\`.
    
    5.  **Kopjoni Gjurmën:** Pas disa momentesh, do të shfaqet një raport. Kërkoni për variantin `release` dhe kopjoni vlerën e gjatë pranë **`SHA-256`**.

    #### Përditësimi i `assetlinks.json`
    *   Hapeni skedarin `public/.well-known/assetlinks.json` në projektin tuaj web.
    *   Verifikoni që vlera e `sha256_cert_fingerprints` përputhet me gjurmën SHA-256 që sapo gjeneruat. Nëse jo, përditësojeni atë.
    *   Vendoseni përsëri aplikacionin tuaj web me skedarin e përditësuar `assetlinks.json` përpara se të ndërtoni paketën finale për Play Store.

4.  **Ndërtoni dhe Publikoni në Google Play:**
    *   Hapni projektin e shkarkuar nga PWABuilder në [Android Studio](https://developer.android.com/studio).
    *   Ndiqni udhëzimet standarde për të gjeneruar paketën e nënshkruar (`.aab`). Ky proces përfshin krijimin e një "keystore" nëse nuk e keni një të tillë.
    *   Ngarkojeni paketën `.aab` në [Google Play Console](https://play.google.com/console) dhe ndiqni procesin e publikimit.
