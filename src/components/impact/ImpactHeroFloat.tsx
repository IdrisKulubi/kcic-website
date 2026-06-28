export function ImpactHeroFloat({
  stamp,
  card1Label,
  card1Value,
  card2Label,
  card2Value,
}: {
  stamp: string;
  card1Label: string;
  card1Value: string;
  card2Label: string;
  card2Value: string;
}) {
  return (
    <div data-impact-float className="relative min-h-[470px]">
      <svg className="absolute inset-0 h-full w-full text-[#101010]" viewBox="0 0 760 520" fill="none" aria-hidden="true">
        <path data-impact-line d="M95 87H574V442H95V87Z" stroke="currentColor" strokeWidth="5" />
        <path data-impact-line d="M133 145H520" stroke="currentColor" strokeWidth="5" />
        <path data-impact-line d="M133 209H480" stroke="currentColor" strokeWidth="5" />
        <path data-impact-line d="M133 273H528" stroke="currentColor" strokeWidth="5" />
        <path data-impact-line d="M133 337H402" stroke="currentColor" strokeWidth="5" />
        <path data-impact-line d="M612 123C660 149 689 194 699 257C710 325 689 381 637 424" stroke="currentColor" strokeWidth="4" />
        <path data-impact-line d="M58 404C115 475 207 491 336 453" stroke="currentColor" strokeWidth="4" />
        <path data-impact-line d="M594 74L674 54L693 129L613 149L594 74Z" stroke="currentColor" strokeWidth="5" />
        <path data-impact-line d="M614 102L674 87" stroke="currentColor" strokeWidth="4" />
      </svg>

      <div className="absolute left-4 top-10 rotate-[-4deg] border-[4px] border-[#101010] bg-[#80c738] px-5 py-3 text-lg font-black uppercase shadow-[7px_7px_0_#101010] sm:left-14">
        {stamp}
      </div>
      <div className="absolute right-4 top-28 rotate-3 border-[4px] border-[#101010] bg-[#fff7df] px-5 py-4 shadow-[7px_7px_0_#101010] sm:right-12">
        <p className="text-xs font-black uppercase text-[#58523f]">{card1Label}</p>
        <p className="text-3xl font-black uppercase leading-none">{card1Value}</p>
      </div>
      <div className="absolute bottom-14 left-8 max-w-[260px] -rotate-2 border-[4px] border-[#101010] bg-[#101010] px-5 py-4 text-[#fff7df] shadow-[7px_7px_0_#80c738] sm:left-20">
        <p className="text-xs font-black uppercase text-[#80c738]">{card2Label}</p>
        <p className="mt-2 text-lg font-black uppercase leading-tight">{card2Value}</p>
      </div>
    </div>
  );
}
