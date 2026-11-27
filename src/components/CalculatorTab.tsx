import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Minus } from 'lucide-react';
import {
  DieModel,
  calculateGrandTotalKg,
  calculatePairKg,
  formatKg,
  getModelTotalGrams,
  lookupTotalGrams,
} from '../data/dieModels';

interface CalculatorTabProps {
  models: DieModel[];
  slots: [string | null, string | null, string | null, string | null];
  count13: string;
  count24: string;
  onSelectSlot: (slotIndex: 0 | 1 | 2 | 3, modelName: string | null) => void;
  onCount13Change: (raw: string) => void;
  onCount24Change: (raw: string) => void;
}

export function CalculatorTab({
  models,
  slots,
  count13,
  count24,
  onSelectSlot,
  onCount13Change,
  onCount24Change,
}: CalculatorTabProps) {
  const pair13Kg = calculatePairKg(models, slots[0], slots[2], count13);
  const pair24Kg = calculatePairKg(models, slots[1], slots[3], count24);
  const grandTotalKg = calculateGrandTotalKg(pair13Kg, pair24Kg);

  const pair13Grams =
    lookupTotalGrams(models, slots[0]) + lookupTotalGrams(models, slots[2]);
  const pair24Grams =
    lookupTotalGrams(models, slots[1]) + lookupTotalGrams(models, slots[3]);

  const handleCountInput = (
    raw: string,
    setter: (next: string) => void
  ) => {
    const digitsOnly = raw.replace(/\D+/g, '');
    setter(digitsOnly);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-6">
      <p className="text-[15px] leading-relaxed text-[#6E695E] dark:text-[#A39D90]">
        Pick up to four models to combine their dice weight into kilograms.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Left column on desktop (top on mobile): Four numbered slot dropdowns */}
        <div className="space-y-3 lg:col-span-7">
          {([0, 1, 2, 3] as const).map((idx) => (
            <SlotDropdownRow
              key={idx}
              slotNumber={idx + 1}
              selectedModel={slots[idx]}
              models={models}
              onSelect={(name) => onSelectSlot(idx, name)}
              onClear={() => onSelectSlot(idx, null)}
            />
          ))}
        </div>

        {/* Right column on desktop (bottom on mobile): Two Count + Pair kg columns & Grand Total */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Column 1: Count (1+3) + Result box */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="count-1-3"
                className="text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]"
              >
                Count
              </label>
              <input
                id="count-1-3"
                type="text"
                inputMode="numeric"
                value={count13}
                onChange={(e) => handleCountInput(e.target.value, onCount13Change)}
                placeholder="0"
                className="font-mono-num h-12 w-full rounded-[14px] border border-[#D6D2C4] bg-[#FBFAF6] px-3.5 text-lg font-bold text-[#23211E] outline-none transition-colors focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#22201C] dark:text-[#F4F1E8] dark:focus:border-[#E0A526]"
              />
              <div className="rounded-[16px] border border-[#D6D2C4] bg-[#FBFAF6] px-4 py-3.5 dark:border-[#38342D] dark:bg-[#22201C]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]">
                  <span>1 + 3</span>
                  <span className="font-mono-num font-medium">{pair13Grams}g</span>
                </div>
                <div className="font-mono-num mt-1.5 text-[21px] font-bold tracking-tight text-[#23211E] dark:text-[#F4F1E8]">
                  {formatKg(pair13Kg)}
                </div>
              </div>
            </div>

            {/* Column 2: Count (2+4) + Result box */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="count-2-4"
                className="text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]"
              >
                Count
              </label>
              <input
                id="count-2-4"
                type="text"
                inputMode="numeric"
                value={count24}
                onChange={(e) => handleCountInput(e.target.value, onCount24Change)}
                placeholder="0"
                className="font-mono-num h-12 w-full rounded-[14px] border border-[#D6D2C4] bg-[#FBFAF6] px-3.5 text-lg font-bold text-[#23211E] outline-none transition-colors focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#22201C] dark:text-[#F4F1E8] dark:focus:border-[#E0A526]"
              />
              <div className="rounded-[16px] border border-[#D6D2C4] bg-[#FBFAF6] px-4 py-3.5 dark:border-[#38342D] dark:bg-[#22201C]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]">
                  <span>2 + 4</span>
                  <span className="font-mono-num font-medium">{pair24Grams}g</span>
                </div>
                <div className="font-mono-num mt-1.5 text-[21px] font-bold tracking-tight text-[#23211E] dark:text-[#F4F1E8]">
                  {formatKg(pair24Kg)}
                </div>
              </div>
            </div>
          </div>

          {/* Dark GRAND TOTAL bar */}
          <div className="flex items-center justify-between rounded-[16px] bg-[#23211E] px-5 py-4 dark:border dark:border-[#38342D] dark:bg-[#0F0E0C]">
            <span className="text-xs font-bold tracking-[0.12em] text-[#D6D2C4]">
              GRAND TOTAL
            </span>
            <span className="font-mono-num text-[24px] font-bold text-[#E0A526]">
              {formatKg(grandTotalKg)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SlotDropdownRowProps {
  slotNumber: number;
  selectedModel: string | null;
  models: DieModel[];
  onSelect: (modelName: string) => void;
  onClear: () => void;
}

function SlotDropdownRow({
  slotNumber,
  selectedModel,
  models,
  onSelect,
  onClear,
}: SlotDropdownRowProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const selectedGrams = lookupTotalGrams(models, selectedModel);

  return (
    <div ref={containerRef} className="relative flex items-center gap-2.5">
      {/* Number badge */}
      <div className="font-mono-num flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#23211E] text-sm font-bold text-[#E0A526] dark:border dark:border-[#38342D]">
        {slotNumber}
      </div>

      {/* Material 3 ExposedDropdownMenu equivalent */}
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Slot ${slotNumber} model`}
          className={`flex h-12 w-full items-center justify-between rounded-[14px] border bg-[#FBFAF6] px-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E0A526] dark:bg-[#22201C] ${
            open
              ? 'border-[#E0A526]'
              : 'border-[#D6D2C4] hover:border-[#B5B0A1] dark:border-[#38342D] dark:hover:border-[#534E44]'
          }`}
        >
          {selectedModel ? (
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[15px] font-bold text-[#23211E] dark:text-[#F4F1E8]">
                {selectedModel}
              </span>
              <span className="font-mono-num shrink-0 text-xs text-[#6E695E] dark:text-[#A39D90]">
                {selectedGrams}g
              </span>
            </span>
          ) : (
            <span className="truncate text-[15px] text-[#6E695E] dark:text-[#A39D90]">
              — Select model —
            </span>
          )}
          <ChevronDown
            className={`ml-2 h-4 w-4 shrink-0 text-[#6E695E] transition-transform duration-150 dark:text-[#A39D90] ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label={`Select model for slot ${slotNumber}`}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-64 overflow-y-auto rounded-[14px] border border-[#D6D2C4] bg-[#FBFAF6] py-1.5 shadow-lg dark:border-[#38342D] dark:bg-[#22201C]"
          >
            {models.map((model) => {
              const isSelected = selectedModel === model.name;
              const grams = getModelTotalGrams(model);
              return (
                <li key={model.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(model.name);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#23211E] font-bold text-[#E0A526]'
                        : 'text-[#23211E] hover:bg-[#EFECE3] dark:text-[#F4F1E8] dark:hover:bg-[#2E2B25]'
                    }`}
                  >
                    <span className="font-semibold">{model.name}</span>
                    <span
                      className={`font-mono-num text-xs ${
                        isSelected
                          ? 'text-[#E0A526]'
                          : 'text-[#6E695E] dark:text-[#A39D90]'
                      }`}
                    >
                      {grams}g
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Clear slot ("−") button */}
      <button
        type="button"
        onClick={onClear}
        disabled={!selectedModel}
        aria-label={`Clear slot ${slotNumber}`}
        title={`Clear slot ${slotNumber}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-[#D6D2C4] bg-[#FBFAF6] text-[#23211E] transition-colors hover:border-[#23211E] hover:bg-[#EFECE3] disabled:cursor-not-allowed disabled:opacity-35 dark:border-[#38342D] dark:bg-[#22201C] dark:text-[#F4F1E8] dark:hover:border-[#E0A526]"
      >
        <Minus className="h-4 w-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
