import React from "react";
import { GoldRulesCard, CARD_SIZE } from "../GoldRulesCard";

// Landing slot: the flying card from CardIntro travels down and settles exactly here (Teya's CARD panel).
export default function RulesPanel() {
  return (
    <div className="flex flex-1 items-center justify-center py-6 md:py-10" data-testid="rules-panel">
      <div id="gold-card-landing" className={`invisible ${CARD_SIZE}`} aria-hidden="true">
        <GoldRulesCard />
      </div>
    </div>
  );
}
