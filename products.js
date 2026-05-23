// ============================================================
// PRODUCTS PAGE — data, filtering, pagination, word rotator
// ============================================================
(() => {
  const grid = document.getElementById('products-grid');
  if (!grid) return; // not on products page

  // ----------------------------------------------------------
  // Product catalog (factual pharma data from dycinepharma.in)
  // ----------------------------------------------------------
  const PRODUCTS = [
    // TABLETS — AXA
    {name:"AMBIVAL 10",size:"10 Tablets in 1 strip",salt:"Amitriptyline 10 mg",cat:"Tablet",div:"AXA"},
    {name:"AMBIVAL 25",size:"10 Tablets in 1 strip",salt:"Amitriptyline 25 mg",cat:"Tablet",div:"AXA"},
    {name:"BELGYN 400",size:"10 Tablets in 1 strip",salt:"Albendazole 400 mg",cat:"Tablet",div:"AXA"},
    {name:"CLOBARIUM 500",size:"10 Tablets in 1 strip",salt:"Cefuroxime Axetil 500 mg",cat:"Tablet",div:"AXA"},
    {name:"CORTOSEPT-6",size:"10 Tablets in 1 strip",salt:"Deflazacort 6 mg",cat:"Tablet",div:"AXA"},
    {name:"CORTOSEPT-30",size:"10 Tablets in 1 strip",salt:"Deflazacort 30 mg",cat:"Tablet",div:"AXA"},
    {name:"DALUS FORTE TAB",size:"5x10",salt:"Citicoline 500 mg + Piracetam 800 mg",cat:"Tablet",div:"AXA"},
    {name:"DALUS-800 TAB",size:"10 Tablets in 1 strip",salt:"Piracetam 800 mg",cat:"Tablet",div:"AXA"},
    {name:"DIEPIRATE 250MG TAB",size:"10 Tablets in 1 strip",salt:"Divalproex Sodium 250 mg SR",cat:"Tablet",div:"AXA"},
    {name:"DIEPIRATE 500MG TAB",size:"10 Tablets in 1 strip",salt:"Divalproex Sodium 500 mg SR",cat:"Tablet",div:"AXA"},
    {name:"DIEPIRATE 750MG TAB",size:"10 Tablets in 1 strip",salt:"Divalproex Sodium 750 mg SR",cat:"Tablet",div:"AXA"},
    {name:"DIEPIRATE 1000MG TAB",size:"10 Tablets in 1 strip",salt:"Divalproex Sodium 1000 mg SR",cat:"Tablet",div:"AXA"},
    {name:"DYCICAL TAB",size:"10 Tablets in 1 strip",salt:"Calcium Carbonate 1250 mg + Vit D3 250 IU",cat:"Tablet",div:"AXA"},
    {name:"DYCIPAR TAB",size:"10 Tablets in 1 strip",salt:"Aceclofenac 100 mg + Paracetamol 325 mg",cat:"Tablet",div:"AXA"},
    {name:"DYCIPAR MR",size:"10 Tablets in 1 strip",salt:"Diclofenac 50 + Paracetamol 325 + Chlorzoxazone 250 mg",cat:"Tablet",div:"AXA"},
    {name:"DYCIPAR-TH",size:"10 Tablets in 1 strip",salt:"Aceclofenac 200 mg + Thiocolchicoside 8 mg",cat:"Tablet",div:"AXA"},
    {name:"DYCIZOL-40 TAB",size:"10 Tablets in 1 strip",salt:"Pantoprazole 40 mg",cat:"Tablet",div:"AXA"},
    {name:"DYRICH-NP",size:"10 Tablets in 1 strip",salt:"Pregabalin 75 SR + Nortriptyline 10 + Methylcobalamin 1500 mcg",cat:"Tablet",div:"AXA"},
    {name:"EPSOTOIN-300",size:"10 Tablets in 1 strip",salt:"Phenytoin Sodium 300 mg ER",cat:"Tablet",div:"AXA"},
    {name:"FLEBIXEN 0.5 MG",size:"10 Tablets in 1 strip",salt:"Flupentixol 0.5 mg",cat:"Tablet",div:"AXA"},
    {name:"FLEBIXEN 1MG",size:"10 Tablets in 1 strip",salt:"Flupentixol 1 mg",cat:"Tablet",div:"AXA"},
    {name:"FLEBIXEN PLUS",size:"10 Tablets in 1 strip",salt:"Flupentixol 0.5 mg + Melitracen 10 mg",cat:"Tablet",div:"AXA"},
    {name:"FREEDONAP 250",size:"10 Tablets in 1 strip",salt:"Naproxen Sodium 250 mg + Domperidone 10 mg",cat:"Tablet",div:"AXA"},
    {name:"FREEDONAP 500",size:"10 Tablets in 1 strip",salt:"Naproxen Sodium 500 mg + Domperidone 10 mg",cat:"Tablet",div:"AXA"},
    {name:"HYPOLIN 10 TAB",size:"10 Tablets in 1 strip",salt:"Atorvastatin 10 mg",cat:"Tablet",div:"AXA"},
    {name:"HYPOLIN 20 TAB",size:"10 Tablets in 1 strip",salt:"Atorvastatin 20 mg",cat:"Tablet",div:"AXA"},
    {name:"JEROCEN 1 MG",size:"10 Tablets in 1 strip",salt:"Lorazepam 1 mg",cat:"Tablet",div:"AXA"},
    {name:"JEROCEN 2 MG",size:"10 Tablets in 1 strip",salt:"Lorazepam 2 mg",cat:"Tablet",div:"AXA"},
    {name:"LEVALTY 250 MG",size:"10 Tablets in 1 strip",salt:"Levetiracetam 250 mg",cat:"Tablet",div:"AXA"},
    {name:"LEVALTY 500 MG",size:"10 Tablets in 1 strip",salt:"Levetiracetam 500 mg",cat:"Tablet",div:"AXA"},
    {name:"LEVALTY 750 MG",size:"10 Tablets in 1 strip",salt:"Levetiracetam 750 mg",cat:"Tablet",div:"AXA"},
    {name:"LEVALTY 1000 MG",size:"10 Tablets in 1 strip",salt:"Levetiracetam 1000 mg",cat:"Tablet",div:"AXA"},
    {name:"LEZAPIN-2.5 MG TAB",size:"10 Tablets in 1 strip",salt:"Olanzapine 2.5 mg Mouth Dissolving",cat:"Tablet",div:"AXA"},
    {name:"LEZAPIN-5 MG TAB",size:"10 Tablets in 1 strip",salt:"Olanzapine 5 mg Mouth Dissolving",cat:"Tablet",div:"AXA"},
    {name:"LEZAPIN-10 MG TAB",size:"10 Tablets in 1 strip",salt:"Olanzapine 10 mg Mouth Dissolving",cat:"Tablet",div:"AXA"},
    {name:"NEUCLOX-625",size:"10x1x6",salt:"Amoxycillin 500 + Clavulanate 125 mg + LAB 60M Spores",cat:"Tablet",div:"AXA"},
    {name:"ONBIXIN 12.5",size:"10 Tablets in 1 strip",salt:"Paroxetine 12.5 mg Controlled Release",cat:"Tablet",div:"AXA"},
    {name:"ONBIXIN 25",size:"10x1x6",salt:"Paroxetine 25 mg Controlled Release",cat:"Tablet",div:"AXA"},
    {name:"ONBIXIN 37.5",size:"10 Tablets in 1 strip",salt:"Paroxetine 37.5 mg Controlled Release",cat:"Tablet",div:"AXA"},
    {name:"RANDRO 5",size:"10 Tablets in 1 strip",salt:"Haloperidol 5 mg",cat:"Tablet",div:"AXA"},
    {name:"RANDRO 10",size:"10 Tablets in 1 strip",salt:"Haloperidol 10 mg",cat:"Tablet",div:"AXA"},
    {name:"REVOZIP-0.25 MG TAB",size:"10 Tablets in 1 strip",salt:"Clonazepam 0.25 mg",cat:"Tablet",div:"AXA"},
    {name:"REVOZIP-0.5 MG TAB",size:"10 Tablets in 1 strip",salt:"Clonazepam 0.5 mg",cat:"Tablet",div:"AXA"},
    {name:"REVOZIP-1 MG TAB",size:"10 Tablets in 1 strip",salt:"Clonazepam 1 mg",cat:"Tablet",div:"AXA"},
    {name:"REVOZIP-2 MG TAB",size:"10 Tablets in 1 strip",salt:"Clonazepam 2 mg",cat:"Tablet",div:"AXA"},
    {name:"RISDIL 1 MG TAB",size:"10 Tablets in 1 strip",salt:"Risperidone 1 mg Mouth Dissolving",cat:"Tablet",div:"AXA"},
    {name:"RISDIL 2 MG TAB",size:"10 Tablets in 1 strip",salt:"Risperidone 2 mg Mouth Dissolving",cat:"Tablet",div:"AXA"},
    {name:"RISDIL PLUS TAB",size:"10 Tablets in 1 strip",salt:"Risperidone 3 mg + Trihexyphenidyl 2 mg MD",cat:"Tablet",div:"AXA"},
    {name:"RISDIL FORTE",size:"10 Tablets in 1 strip",salt:"Risperidone 4 mg + Trihexyphenidyl 2 mg MD",cat:"Tablet",div:"AXA"},
    {name:"RISTRYL",size:"10 Tablets in 1 strip",salt:"Amitriptyline 12.5 mg + Chlordiazepoxide 5 mg",cat:"Tablet",div:"AXA"},
    {name:"RISTRYL FORTE",size:"10 Tablets in 1 strip",salt:"Amitriptyline 25 mg + Chlordiazepoxide 10 mg",cat:"Tablet",div:"AXA"},
    {name:"ROXVIT D 60",size:"10 Tablets in 1 strip",salt:"Cholecalciferol (Vit D3) 60000 IU",cat:"Tablet",div:"AXA"},
    {name:"SPINOPRED TAB",size:"10 Tablets in 1 strip",salt:"Methylprednisolone Sodium Succinate 4 mg",cat:"Tablet",div:"AXA"},
    {name:"VEANA CR 200MG TAB",size:"10 Tablets in 1 strip",salt:"Sodium Valproate 200 mg CR",cat:"Tablet",div:"AXA"},
    {name:"VEANA CR 300MG TAB",size:"10 Tablets in 1 strip",salt:"Sodium Valproate 300 mg CR",cat:"Tablet",div:"AXA"},
    {name:"VEANA CR 500MG TAB",size:"10 Tablets in 1 strip",salt:"Sodium Valproate 500 mg CR",cat:"Tablet",div:"AXA"},
    {name:"ZEROACH 5",size:"10 Tablets in 1 strip",salt:"Flunarizine 5 mg",cat:"Tablet",div:"AXA"},
    {name:"ZEROACH 10",size:"10 Tablets in 1 strip",salt:"Flunarizine 10 mg",cat:"Tablet",div:"AXA"},
    {name:"DIPWELL 5",size:"10 Tablets in 1 strip",salt:"Escitalopram 5 mg",cat:"Tablet",div:"AXA"},
    {name:"DIPWELL 10",size:"10 Tablets in 1 strip",salt:"Escitalopram 10 mg",cat:"Tablet",div:"AXA"},
    {name:"DIPWELL 20",size:"10 Tablets in 1 strip",salt:"Escitalopram 20 mg",cat:"Tablet",div:"AXA"},
    {name:"DIPWELL LS",size:"10 Tablets in 1 strip",salt:"Escitalopram 5 mg + Clonazepam 0.5 mg",cat:"Tablet",div:"AXA"},
    {name:"DIPWELL-H",size:"10 Tablets in 1 strip",salt:"Escitalopram 5 mg + Clonazepam 0.25 mg",cat:"Tablet",div:"AXA"},
    {name:"DIPWELL PLUS TAB",size:"10 Tablets in 1 strip",salt:"Escitalopram 10 mg + Clonazepam 0.5 mg",cat:"Tablet",div:"AXA"},

    // TABLETS — NURA
    {name:"DISTRODUL 20",size:"10 Tablets in 1 strip",salt:"Duloxetine 20 mg",cat:"Tablet",div:"NURA"},
    {name:"DISTRODUL 30",size:"10 Tablets in 1 strip",salt:"Duloxetine 30 mg",cat:"Tablet",div:"NURA"},
    {name:"EASOPID 5",size:"10 Tablets in 1 strip",salt:"Zolpidem 5 mg",cat:"Tablet",div:"NURA"},
    {name:"EASOPID 10",size:"10 Tablets in 1 strip",salt:"Zolpidem 10 mg",cat:"Tablet",div:"NURA"},
    {name:"EGEPTIN 8 MG TAB",size:"10 Tablets in 1 strip",salt:"Betahistine HCl 8 mg",cat:"Tablet",div:"NURA"},
    {name:"EGEPTIN 16 MG TAB",size:"10 Tablets in 1 strip",salt:"Betahistine HCl 16 mg",cat:"Tablet",div:"NURA"},
    {name:"EGEPTIN 24 MG TAB",size:"10 Tablets in 1 strip",salt:"Betahistine HCl 24 mg",cat:"Tablet",div:"NURA"},
    {name:"EGEPTIN OD 48 MG TAB",size:"10 Tablets in 1 strip",salt:"Betahistine HCl 48 mg SR",cat:"Tablet",div:"NURA"},
    {name:"EXAZAM 5",size:"10 Tablets in 1 strip",salt:"Clobazam 5 mg Mouth Dissolving",cat:"Tablet",div:"NURA"},
    {name:"EXAZAM 10",size:"10 Tablets in 1 strip",salt:"Clobazam 10 mg Mouth Dissolving",cat:"Tablet",div:"NURA"},
    {name:"KORDMOX",size:"10 Tablets in 1 strip",salt:"Cerebrotein Hydrolysate 90 mg",cat:"Tablet",div:"NURA"},
    {name:"LISWAS 10",size:"10 Tablets in 1 strip",salt:"Baclofen 10 mg",cat:"Tablet",div:"NURA"},
    {name:"LISWAS 20 ER",size:"10 Tablets in 1 strip",salt:"Baclofen 20 mg Extended Release",cat:"Tablet",div:"NURA"},
    {name:"LOFEBRIL 50",size:"10 Tablets in 1 strip",salt:"Fluvoxamine 50 mg",cat:"Tablet",div:"NURA"},
    {name:"LOFEBRIL 100",size:"10 Tablets in 1 strip",salt:"Fluvoxamine 100 mg",cat:"Tablet",div:"NURA"},
    {name:"MIGRALES 20",size:"10 Tablets in 1 strip",salt:"Propranolol HCl 20 mg",cat:"Tablet",div:"NURA"},
    {name:"MIGRALES 40",size:"10 Tablets in 1 strip",salt:"Propranolol HCl 40 mg",cat:"Tablet",div:"NURA"},
    {name:"MIGRALES PLUS",size:"10 Tablets in 1 strip",salt:"Propranolol HCl 40 mg + Flunarizine DHCl 10 mg",cat:"Tablet",div:"NURA"},
    {name:"RELIGABA 75MG",size:"10 Tablets in 1 strip",salt:"Pregabalin 75 mg",cat:"Tablet",div:"NURA"},
    {name:"RELIGABA 150MG",size:"10 Tablets in 1 strip",salt:"Pregabalin 150 mg",cat:"Tablet",div:"NURA"},
    {name:"SENBEST-50",size:"10x1x4",salt:"Sertraline 50 mg",cat:"Tablet",div:"NURA"},
    {name:"SENBEST-100",size:"10 Tablets in 1 strip",salt:"Sertraline 100 mg",cat:"Tablet",div:"NURA"},
    {name:"SENTRACHEM TAB",size:"10 Tablets in 1 strip",salt:"Cinnarizine 20 mg + Dimenhydrinate 40 mg MD",cat:"Tablet",div:"NURA"},
    {name:"SOLPRIWEL 50MG TAB",size:"10 Tablets in 1 strip",salt:"Amisulpride 50 mg Sustained Release",cat:"Tablet",div:"NURA"},
    {name:"SOLPRIWEL 100MG TAB",size:"10 Tablets in 1 strip",salt:"Amisulpride 100 mg Sustained Release",cat:"Tablet",div:"NURA"},
    {name:"SOLPRIWEL 200MG TAB",size:"10 Tablets in 1 strip",salt:"Amisulpride 200 mg Sustained Release",cat:"Tablet",div:"NURA"},
    {name:"ZIMQUINE-100",size:"10 Tablets in 1 strip",salt:"Quetiapine 100 mg Sustained Release",cat:"Tablet",div:"NURA"},
    {name:"ZIMQUINE-200",size:"10 Tablets in 1 strip",salt:"Quetiapine 200 mg Sustained Release",cat:"Tablet",div:"NURA"},
    {name:"ZINIP-25",size:"10 Tablets in 1 strip",salt:"Clozapine 25 mg",cat:"Tablet",div:"NURA"},
    {name:"ZINIP-50",size:"10 Tablets in 1 strip",salt:"Clozapine 50 mg",cat:"Tablet",div:"NURA"},
    {name:"ZINIP-100",size:"10 Tablets in 1 strip",salt:"Clozapine 100 mg",cat:"Tablet",div:"NURA"},
    {name:"ZYMAPTIN 100",size:"10 Tablets in 1 strip",salt:"Gabapentin 100 mg",cat:"Tablet",div:"NURA"},
    {name:"ZYMAPTIN 300",size:"10 Tablets in 1 strip",salt:"Gabapentin 300 mg",cat:"Tablet",div:"NURA"},
    {name:"ZYMAPTIN NT 100",size:"10 Tablets in 1 strip",salt:"Gabapentin 100 mg + Nortriptyline 10 mg",cat:"Tablet",div:"NURA"},
    {name:"ZYMAPTIN NT 300",size:"10 Tablets in 1 strip",salt:"Gabapentin 300 mg + Nortriptyline 10 mg",cat:"Tablet",div:"NURA"},
    {name:"ZYMAPTIN NT 400",size:"10 Tablets in 1 strip",salt:"Gabapentin 400 mg + Nortriptyline 10 mg",cat:"Tablet",div:"NURA"},

    // CAPSULES — AXA
    {name:"DYCICAL MAX",size:"1x10",salt:"Omega-3 + Methylcobalamin + Calcitriol + Calcium + Boron + Folic Acid",cat:"Capsule",div:"AXA"},
    {name:"DYCICAL-CT",size:"1x10",salt:"Calcitriol 0.25 mcg + Calcium 500 mg + Zinc 7.5 mg",cat:"Capsule",div:"AXA"},
    {name:"DYCIZOL-DSR CAP",size:"1x10",salt:"Pantoprazole 40 mg + Domperidone 30 mg SR",cat:"Capsule",div:"AXA"},
    {name:"DYRICH FORTE CAPS",size:"1x10",salt:"Methylcobalamin + Inositol + ALA + Vit A/B/C complex",cat:"Capsule",div:"AXA"},
    {name:"DYRICH PLUS",size:"1x10",salt:"Pregabalin 75 SR + Methylcobalamin 750 + B-complex",cat:"Capsule",div:"AXA"},
    {name:"ESIROMIDE PLUS",size:"3x10",salt:"Eperisone HCl 150 mg + Diclofenac Sodium 100 mg SR",cat:"Capsule",div:"AXA"},
    {name:"ROXVIT CAPS",size:"1x10",salt:"Ubiquinone + Bioflavonoids + Ginkgo + Grapeseed + Ginseng",cat:"Capsule",div:"AXA"},

    // CAPSULES — NURA
    {name:"RELIGABA D 50/20",size:"1x10",salt:"Pregabalin 50 mg + Duloxetine 20 mg",cat:"Capsule",div:"NURA"},
    {name:"RELIGABA D 75/20",size:"1x10",salt:"Pregabalin 75 mg + Duloxetine 20 mg",cat:"Capsule",div:"NURA"},
    {name:"RELIGABA D 75/30",size:"1x10",salt:"Pregabalin 75 mg + Duloxetine 30 mg",cat:"Capsule",div:"NURA"},
    {name:"ROCACOP",size:"1x10",salt:"Rosuvastatin 20 mg + Clopidogrel 75 mg",cat:"Capsule",div:"NURA"},
    {name:"ROCACOP A-10",size:"1x10",salt:"Rosuvastatin 10 + Clopidogrel 75 + Aspirin 75 mg",cat:"Capsule",div:"NURA"},
    {name:"ROCACOP A-20",size:"1x10",salt:"Rosuvastatin 20 + Clopidogrel 75 + Aspirin 75 mg",cat:"Capsule",div:"NURA"},

    // SYRUPS
    {name:"BRAINVOLT SYRUP",size:"60 ML",salt:"Citicoline 500 mg/5 ml (Sugar Free)",cat:"Syrup",div:"NURA"},
    {name:"DALUS SYRUP",size:"200 ML",salt:"Piracetam 500 mg/5 ml",cat:"Syrup",div:"AXA"},
    {name:"DYRICH SYRUP",size:"200 ML",salt:"Methylcobalamin + Vit D3 + Zinc + L-Lysine + B-complex",cat:"Syrup",div:"AXA"},
    {name:"EPREGRES UNIQUE 12",size:"200 ML",salt:"Cholecalciferol + Vit E + Vit B6 + Folic Acid + Vit B12",cat:"Syrup",div:"NURA"},
    {name:"LEVALTY SYRUP",size:"100 ML",salt:"Levetiracetam 100 mg/ml",cat:"Syrup",div:"AXA"},

    // INJECTABLES
    {name:"DALUS 1 GM Injection",size:"5x2 ML (tray of 5)",salt:"Citicoline 250 mg/ml",cat:"Injectable",div:"AXA"},
    {name:"DALUS 500 Injection",size:"5x4 ML (tray of 5)",salt:"Citicoline 250 mg/ml",cat:"Injectable",div:"AXA"},
    {name:"DYCIPAR INJ",size:"5x1 ML",salt:"Diclofenac 75 mg/ml",cat:"Injectable",div:"AXA"},
    {name:"DYCITOL IV",size:"100 ML",salt:"Mannitol 10 gm + Glycerin 10 gm",cat:"Injectable",div:"AXA"},
    {name:"DYCIZOL IV",size:"1x1",salt:"Pantoprazole 40 mg",cat:"Injectable",div:"AXA"},
    {name:"DYRICH INJ",size:"5x1 ML",salt:"Methylcobalamin 500 mcg",cat:"Injectable",div:"AXA"},
    {name:"ELDATOX INJ",size:"20 ML",salt:"Edaravone 1.5 mg/ml",cat:"Injectable",div:"AXA"},
    {name:"EPSOTOIN INJ",size:"5x2 ML (tray of 5)",salt:"Phenytoin Sodium 50 mg/ml",cat:"Injectable",div:"AXA"},
    {name:"GRANEPIP INJ",size:"4.5 g + 20 ML",salt:"Piperacillin 4 g + Tazobactam 500 mg",cat:"Injectable",div:"AXA"},
    {name:"LAVINON INJ",size:"1.125 g + 10 ML",salt:"Cefepime 1 g + Tazobactam 125 mg",cat:"Injectable",div:"AXA"},
    {name:"LEVALTY INJ",size:"5 ML",salt:"Levetiracetam 100 mg/ml",cat:"Injectable",div:"AXA"},
    {name:"LOGNEMER INJ",size:"1.5 g x 20 ML",salt:"Meropenem 1 g + Sulbactam 500 mg",cat:"Injectable",div:"AXA"},
    {name:"SPINOPRED-500 INJ",size:"500 mg + 10 ML",salt:"Methylprednisolone Sodium Succinate 500 mg",cat:"Injectable",div:"AXA"},
    {name:"SPINOPRED-1000 INJ",size:"1 g + 10 ML",salt:"Methylprednisolone Sodium Succinate 1000 mg",cat:"Injectable",div:"AXA"},
    {name:"VAPIPRO INJ",size:"Vial",salt:"Meropenem 1 g",cat:"Injectable",div:"AXA"}
  ];

  // ----------------------------------------------------------
  // Category illustrations (no-background SVG placeholders)
  // ----------------------------------------------------------
  const CAT_SVG = {
    // ----- TABLET: blister pack of 6 pills with foil backing -----
    Tablet: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tabFoil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FAFAFA"/>
          <stop offset="1" stop-color="#C9D6E6"/>
        </linearGradient>
        <radialGradient id="tabPill" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stop-color="#FFFFFF"/>
          <stop offset="0.55" stop-color="#90E0EF"/>
          <stop offset="1" stop-color="#0077B6"/>
        </radialGradient>
        <filter id="tabShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#023E8A" flood-opacity="0.25"/>
        </filter>
      </defs>
      <g transform="translate(20 24) rotate(-8 80 46)" filter="url(#tabShadow)">
        <rect x="0" y="0" width="160" height="92" rx="14" fill="url(#tabFoil)" stroke="#9DB3C7" stroke-width="1"/>
        <g>
          <circle cx="30" cy="26" r="14" fill="url(#tabPill)"/>
          <circle cx="80" cy="26" r="14" fill="url(#tabPill)"/>
          <circle cx="130" cy="26" r="14" fill="url(#tabPill)"/>
          <circle cx="30" cy="66" r="14" fill="url(#tabPill)"/>
          <circle cx="80" cy="66" r="14" fill="url(#tabPill)"/>
          <circle cx="130" cy="66" r="14" fill="url(#tabPill)"/>
          <!-- score lines -->
          <line x1="22" y1="26" x2="38" y2="26" stroke="#023E8A" stroke-width="0.9" opacity="0.55"/>
          <line x1="72" y1="26" x2="88" y2="26" stroke="#023E8A" stroke-width="0.9" opacity="0.55"/>
          <line x1="122" y1="26" x2="138" y2="26" stroke="#023E8A" stroke-width="0.9" opacity="0.55"/>
          <line x1="22" y1="66" x2="38" y2="66" stroke="#023E8A" stroke-width="0.9" opacity="0.55"/>
          <line x1="72" y1="66" x2="88" y2="66" stroke="#023E8A" stroke-width="0.9" opacity="0.55"/>
          <line x1="122" y1="66" x2="138" y2="66" stroke="#023E8A" stroke-width="0.9" opacity="0.55"/>
        </g>
      </g>
    </svg>`,

    // ----- CAPSULE: stack of 3 two-tone gel capsules -----
    Capsule: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="capL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#0077B6"/>
          <stop offset="1" stop-color="#00B4D8"/>
        </linearGradient>
        <linearGradient id="capR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#E9F1F7"/>
          <stop offset="1" stop-color="#C9D6E6"/>
        </linearGradient>
        <filter id="capShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#023E8A" flood-opacity="0.30"/>
        </filter>
      </defs>
      <g filter="url(#capShadow)">
        <!-- back capsule -->
        <g transform="translate(30 24) rotate(-22 70 14)">
          <rect x="0" y="0" width="60" height="26" rx="13" fill="url(#capL)" opacity="0.55"/>
          <rect x="60" y="0" width="60" height="26" rx="13" fill="url(#capR)" opacity="0.7"/>
        </g>
        <!-- middle capsule -->
        <g transform="translate(20 50) rotate(-10 80 14)">
          <rect x="0" y="0" width="68" height="30" rx="15" fill="url(#capL)"/>
          <rect x="68" y="0" width="68" height="30" rx="15" fill="url(#capR)" stroke="#9DB3C7" stroke-width="0.6"/>
          <ellipse cx="22" cy="6" rx="14" ry="3" fill="#FFFFFF" opacity="0.40"/>
        </g>
        <!-- front capsule -->
        <g transform="translate(38 88) rotate(8 60 12)">
          <rect x="0" y="0" width="58" height="24" rx="12" fill="url(#capL)" opacity="0.85"/>
          <rect x="58" y="0" width="58" height="24" rx="12" fill="url(#capR)" opacity="0.95"/>
        </g>
      </g>
    </svg>`,

    // ----- SYRUP: amber bottle with cap and label -----
    Syrup: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="syrBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#90E0EF"/>
          <stop offset="0.55" stop-color="#00B4D8"/>
          <stop offset="1" stop-color="#0077B6"/>
        </linearGradient>
        <linearGradient id="syrCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a2540"/>
          <stop offset="1" stop-color="#023E8A"/>
        </linearGradient>
        <filter id="syrShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#023E8A" flood-opacity="0.32"/>
        </filter>
      </defs>
      <g transform="translate(58 8)" filter="url(#syrShadow)">
        <!-- cap -->
        <rect x="14" y="0" width="56" height="18" rx="3" fill="url(#syrCap)"/>
        <rect x="14" y="3" width="56" height="2" fill="#FFFFFF" opacity="0.15"/>
        <rect x="14" y="9" width="56" height="2" fill="#FFFFFF" opacity="0.10"/>
        <!-- neck -->
        <rect x="20" y="18" width="44" height="10" rx="1" fill="#0077B6"/>
        <!-- body -->
        <path d="M8 28 Q8 22 14 22 L70 22 Q76 22 76 28 L76 110 Q76 122 64 122 L20 122 Q8 122 8 110 Z" fill="url(#syrBody)"/>
        <!-- highlight -->
        <path d="M16 32 Q14 36 14 42 L14 100 Q14 104 16 106" stroke="#FFFFFF" stroke-width="3" opacity="0.35" fill="none" stroke-linecap="round"/>
        <!-- label -->
        <rect x="14" y="46" width="56" height="48" rx="3" fill="#FFFFFF" opacity="0.95"/>
        <rect x="14" y="46" width="56" height="6" fill="#00B4D8"/>
        <rect x="20" y="58" width="44" height="3" fill="#023E8A" opacity="0.6"/>
        <rect x="20" y="65" width="36" height="2" fill="#0077B6" opacity="0.5"/>
        <rect x="20" y="71" width="44" height="2" fill="#9DB3C7" opacity="0.7"/>
        <rect x="20" y="77" width="30" height="2" fill="#9DB3C7" opacity="0.7"/>
        <rect x="14" y="86" width="56" height="6" fill="#0077B6" opacity="0.8"/>
      </g>
    </svg>`,

    // ----- INJECTABLE: vial + syringe -----
    Injectable: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="vialBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#90E0EF"/>
          <stop offset="0.5" stop-color="#00B4D8"/>
          <stop offset="1" stop-color="#0077B6"/>
        </linearGradient>
        <linearGradient id="syrBarrel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#E9F1F7"/>
          <stop offset="1" stop-color="#9DB3C7"/>
        </linearGradient>
        <filter id="injShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#023E8A" flood-opacity="0.30"/>
        </filter>
      </defs>
      <g filter="url(#injShadow)">
        <!-- vial on left -->
        <g transform="translate(28 24)">
          <rect x="6" y="0" width="36" height="10" rx="2" fill="#023E8A"/>
          <rect x="6" y="3" width="36" height="2" fill="#FFFFFF" opacity="0.15"/>
          <rect x="10" y="10" width="28" height="8" rx="1" fill="#0077B6"/>
          <rect x="4" y="18" width="40" height="72" rx="6" fill="url(#vialBody)"/>
          <path d="M10 22 Q8 28 8 36 L8 80 Q8 84 10 86" stroke="#FFFFFF" stroke-width="2.5" opacity="0.35" fill="none" stroke-linecap="round"/>
          <rect x="9" y="38" width="30" height="32" rx="2" fill="#FFFFFF" opacity="0.92"/>
          <rect x="9" y="38" width="30" height="5" fill="#0077B6"/>
          <rect x="13" y="49" width="22" height="2" fill="#023E8A" opacity="0.6"/>
          <rect x="13" y="54" width="18" height="2" fill="#9DB3C7" opacity="0.7"/>
          <rect x="13" y="59" width="22" height="2" fill="#9DB3C7" opacity="0.7"/>
        </g>
        <!-- syringe on right -->
        <g transform="translate(96 50) rotate(20 50 14)">
          <!-- plunger handle -->
          <rect x="-12" y="6" width="6" height="16" rx="1" fill="#023E8A"/>
          <rect x="-6" y="10" width="8" height="8" fill="#0077B6"/>
          <!-- barrel -->
          <rect x="2" y="6" width="68" height="16" rx="2" fill="url(#syrBarrel)" stroke="#9DB3C7" stroke-width="0.8"/>
          <!-- liquid -->
          <rect x="6" y="9" width="50" height="10" fill="#00B4D8" opacity="0.85"/>
          <rect x="6" y="9" width="50" height="3" fill="#FFFFFF" opacity="0.45"/>
          <!-- tick marks -->
          <g stroke="#023E8A" stroke-width="0.6" opacity="0.6">
            <line x1="14" y1="6" x2="14" y2="9"/>
            <line x1="22" y1="6" x2="22" y2="8"/>
            <line x1="30" y1="6" x2="30" y2="9"/>
            <line x1="38" y1="6" x2="38" y2="8"/>
            <line x1="46" y1="6" x2="46" y2="9"/>
          </g>
          <!-- needle hub -->
          <rect x="70" y="11" width="6" height="6" fill="#023E8A"/>
          <!-- needle -->
          <line x1="76" y1="14" x2="100" y2="14" stroke="#0a2540" stroke-width="1.6"/>
          <line x1="98" y1="12.5" x2="102" y2="14" stroke="#0a2540" stroke-width="1.4"/>
          <line x1="98" y1="15.5" x2="102" y2="14" stroke="#0a2540" stroke-width="1.4"/>
        </g>
      </g>
    </svg>`
  };

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------
  const PER_PAGE = 8;
  let activeCat = 'all';
  let activeDiv = 'all';
  let page = 1;

  // Honor ?cat=Tablet etc.
  const params = new URLSearchParams(window.location.search);
  const initCat = params.get('cat');
  if (initCat && ['Tablet','Capsule','Syrup','Injectable'].includes(initCat)) {
    activeCat = initCat;
  }

  // ----------------------------------------------------------
  // Filtering + rendering
  // ----------------------------------------------------------
  function filtered() {
    return PRODUCTS.filter(p =>
      (activeCat === 'all' || p.cat === activeCat) &&
      (activeDiv === 'all' || p.div === activeDiv)
    );
  }

  function render() {
    const data = filtered();
    const empty = document.getElementById('products-empty');
    const totalPages = Math.max(1, Math.ceil(data.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    const start = (page - 1) * PER_PAGE;
    const slice = data.slice(start, start + PER_PAGE);

    if (data.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = slice.map(p => `
        <article class="pcard" data-cat="${p.cat}" data-div="${p.div}">
          <div class="pcard-img">${CAT_SVG[p.cat] || ''}</div>
          <div class="pcard-body">
            <h4 class="pcard-name">${p.name}</h4>
            <dl class="pcard-meta">
              <dt>Size</dt><dd>${p.size}</dd>
              <dt>Salt</dt><dd>${p.salt}</dd>
              <dt>Category</dt><dd>${p.cat}</dd>
              <dt>Division</dt><dd><span class="pcard-div pcard-div-${p.div}">${p.div}</span></dd>
            </dl>
          </div>
        </article>
      `).join('');
    }

    renderPagination(totalPages);
    updateSidebarActive();
    updateTopRowActive();
    updateDivisionActive();
  }

  function renderPagination(totalPages) {
    const pag = document.getElementById('pagination');
    const visible = Math.min(totalPages, 10);
    let html = `<button class="pag-arrow pag-prev" ${page === 1 ? 'disabled' : ''} aria-label="Previous page"><i class="fa-solid fa-chevron-left"></i></button>`;
    // window centered around current page
    let startN = Math.max(1, page - 4);
    let endN = Math.min(totalPages, startN + visible - 1);
    if (endN - startN + 1 < visible) startN = Math.max(1, endN - visible + 1);
    for (let n = startN; n <= endN; n++) {
      html += `<button class="pag-num ${n === page ? 'is-active' : ''}" data-page="${n}">${n}</button>`;
    }
    html += `<button class="pag-arrow pag-next" ${page === totalPages ? 'disabled' : ''} aria-label="Next page"><i class="fa-solid fa-chevron-right"></i></button>`;
    pag.innerHTML = html;

    pag.querySelectorAll('.pag-num').forEach(btn => {
      btn.addEventListener('click', () => { page = parseInt(btn.dataset.page); render(); scrollToGrid(); });
    });
    pag.querySelector('.pag-prev')?.addEventListener('click', () => { if (page > 1) { page--; render(); scrollToGrid(); } });
    pag.querySelector('.pag-next')?.addEventListener('click', () => { if (page < totalPages) { page++; render(); scrollToGrid(); } });
  }

  function scrollToGrid() {
    const r = grid.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight) {
      window.scrollTo({ top: window.scrollY + r.top - 120, behavior: 'smooth' });
    }
  }

  // ----------------------------------------------------------
  // Sidebar / top row category bindings
  // ----------------------------------------------------------
  function updateSidebarActive() {
    document.querySelectorAll('.products-sidebar-btn[data-cat]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.cat === activeCat);
    });
    document.querySelectorAll('.products-sidebar-btn[data-div]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.div === activeDiv);
    });
  }
  function updateTopRowActive() { /* no top row anymore */ }
  function updateDivisionActive() { /* handled in updateSidebarActive */ }

  function setCat(cat) {
    activeCat = cat;
    page = 1;
    render();
    updateRotator(cat);
  }
  function setDiv(div) {
    activeDiv = div;
    page = 1;
    render();
  }

  document.querySelectorAll('.products-sidebar-btn[data-cat]').forEach(b => {
    b.addEventListener('click', () => setCat(b.dataset.cat));
  });
  document.querySelectorAll('.products-sidebar-btn[data-div]').forEach(b => {
    b.addEventListener('click', () => setDiv(b.dataset.div));
  });

  // ----------------------------------------------------------
  // Hero word rotator: PRODUCTS → TABLETS → CAPSULES → SYRUPS → INJECTIONS
  // ----------------------------------------------------------
  const ROTATOR_WORDS = ['PRODUCTS', 'TABLETS', 'CAPSULES', 'SYRUPS', 'INJECTIONS'];
  const CAT_TO_WORD = { Tablet:'TABLETS', Capsule:'CAPSULES', Syrup:'SYRUPS', Injectable:'INJECTIONS', all:'PRODUCTS' };
  const rotator = document.getElementById('products-rotator');
  let rotIdx = 0;
  let rotTimer = null;
  let rotPaused = false;

  function setRotatorWord(word) {
    if (!rotator) return;
    const cur = rotator.querySelector('.pr-current');
    if (cur && cur.textContent === word) return;
    if (cur) {
      cur.classList.add('pr-leave');
      setTimeout(() => cur.remove(), 320);
    }
    const next = document.createElement('span');
    next.className = 'pr-current pr-enter';
    next.textContent = word;
    rotator.appendChild(next);
    requestAnimationFrame(() => next.classList.remove('pr-enter'));
  }

  function startAutoRotate() {
    stopAutoRotate();
    rotTimer = setInterval(() => {
      if (rotPaused) return;
      rotIdx = (rotIdx + 1) % ROTATOR_WORDS.length;
      setRotatorWord(ROTATOR_WORDS[rotIdx]);
    }, 2200);
  }
  function stopAutoRotate() {
    if (rotTimer) { clearInterval(rotTimer); rotTimer = null; }
  }

  function updateRotator(cat) {
    const w = CAT_TO_WORD[cat] || 'PRODUCTS';
    rotPaused = (cat !== 'all');
    setRotatorWord(w);
    rotIdx = ROTATOR_WORDS.indexOf(w);
    if (cat === 'all') startAutoRotate(); else stopAutoRotate();
  }

  // ----------------------------------------------------------
  // Initial mount
  // ----------------------------------------------------------
  render();
  updateRotator(activeCat);
  if (activeCat === 'all') startAutoRotate();
})();
