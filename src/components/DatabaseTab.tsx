import React, { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { DieModel, getModelTotalGrams } from '../data/dieModels';

interface DatabaseTabProps {
  models: DieModel[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddModel: (name: string, dice1: number, dice2: number, dice3: number) => void;
}

export function DatabaseTab({
  models,
  searchQuery,
  onSearchChange,
  onAddModel,
}: DatabaseTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [dice1Input, setDice1Input] = useState('');
  const [dice2Input, setDice2Input] = useState('');
  const [dice3Input, setDice3Input] = useState('');

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredModels = trimmedQuery
    ? models.filter((m) => m.name.toLowerCase().includes(trimmedQuery))
    : models;

  const resetDialog = () => {
    setNameInput('');
    setDice1Input('');
    setDice2Input('');
    setDice3Input('');
    setDialogOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = nameInput.trim();
    if (!cleanedName) return;
    const d1 = Math.max(0, Number.parseInt(dice1Input, 10) || 0);
    const d2 = Math.max(0, Number.parseInt(dice2Input, 10) || 0);
    const d3 = Math.max(0, Number.parseInt(dice3Input, 10) || 0);
    onAddModel(cleanedName, d1, d2, d3);
    resetDialog();
  };

  const sanitizeDigits = (raw: string) => raw.replace(/\D+/g, '');

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
      {/* Top Controls: Search + Full-width dark "+ Add model" button */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E695E] dark:text-[#A39D90]"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search model name..."
            aria-label="Search model name"
            className="h-12 w-full rounded-[14px] border border-[#D6D2C4] bg-[#FBFAF6] pl-10 pr-10 text-[15px] text-[#23211E] placeholder-[#6E695E] outline-none transition-colors focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#22201C] dark:text-[#F4F1E8] dark:placeholder-[#A39D90] dark:focus:border-[#E0A526]"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#6E695E] hover:bg-[#E8E5DC] dark:text-[#A39D90] dark:hover:bg-[#322E28]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#23211E] px-5 text-[15px] font-bold text-[#E0A526] transition-transform hover:bg-[#2F2C28] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A526] lg:w-auto lg:min-w-[190px] dark:border dark:border-[#4A4336] dark:bg-[#1E1C18] dark:hover:bg-[#2B2822]"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span className="whitespace-nowrap">Add model</span>
        </button>
      </div>

      {/* Subtle count line */}
      <div className="mb-3 flex items-center justify-between text-xs text-[#6E695E] dark:text-[#A39D90]">
        <span>
          Showing <span className="font-mono-num font-semibold text-[#23211E] dark:text-[#F4F1E8]">{filteredModels.length}</span> of{' '}
          <span className="font-mono-num">{models.length}</span> models
        </span>
        {trimmedQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="font-medium text-[#23211E] underline underline-offset-2 hover:text-[#E0A526] dark:text-[#F4F1E8]"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Model Cards List / Responsive Grid */}
      {filteredModels.length === 0 ? (
        <div className="rounded-[16px] border border-[#D6D2C4] bg-[#FBFAF6] px-6 py-12 text-center dark:border-[#38342D] dark:bg-[#22201C]">
          <p className="text-base font-semibold text-[#23211E] dark:text-[#F4F1E8]">
            No models match &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-sm text-[#6E695E] dark:text-[#A39D90]">
            Try a different model code or add a new entry above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
          {filteredModels.map((model) => {
            const total = getModelTotalGrams(model);
            return (
              <div
                key={model.id}
                className="flex items-center justify-between gap-3 rounded-[16px] border border-[#D6D2C4] bg-[#FBFAF6] px-4 py-3.5 transition-colors dark:border-[#38342D] dark:bg-[#22201C]"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[18px] font-bold tracking-tight text-[#23211E] dark:text-[#F4F1E8]">
                    {model.name}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <DiceChip label="D1" value={model.dice1} />
                    <DiceChip label="D2" value={model.dice2} />
                    <DiceChip label="D3" value={model.dice3} />
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="font-mono-num text-[22px] font-bold leading-tight text-[#23211E] dark:text-[#F4F1E8]">
                    {total}g
                  </div>
                  <div className="text-[11px] font-medium text-[#6E695E] dark:text-[#A39D90]">
                    total
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Model Dialog */}
      {dialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-model-dialog-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetDialog();
          }}
        >
          <div className="w-full max-w-md rounded-[20px] border border-[#D6D2C4] bg-[#FBFAF6] p-6 shadow-xl dark:border-[#38342D] dark:bg-[#22201C]">
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="add-model-dialog-title"
                className="text-lg font-bold text-[#23211E] dark:text-[#F4F1E8]"
              >
                Add model
              </h2>
              <button
                type="button"
                onClick={resetDialog}
                aria-label="Close dialog"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6E695E] hover:bg-[#E8E5DC] dark:text-[#A39D90] dark:hover:bg-[#322E28]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label
                  htmlFor="new-model-name"
                  className="mb-1 block text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]"
                >
                  Model name
                </label>
                <input
                  id="new-model-name"
                  type="text"
                  autoFocus
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. TA-042"
                  className="h-11 w-full rounded-[12px] border border-[#D6D2C4] bg-[#E8E5DC]/40 px-3.5 text-[15px] font-semibold text-[#23211E] outline-none focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#161512] dark:text-[#F4F1E8]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label
                    htmlFor="new-dice-1"
                    className="mb-1 block text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]"
                  >
                    Dice 1 (g)
                  </label>
                  <input
                    id="new-dice-1"
                    type="text"
                    inputMode="numeric"
                    value={dice1Input}
                    onChange={(e) => setDice1Input(sanitizeDigits(e.target.value))}
                    placeholder="0"
                    className="font-mono-num h-11 w-full rounded-[12px] border border-[#D6D2C4] bg-[#E8E5DC]/40 px-3 text-[15px] font-bold text-[#23211E] outline-none focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#161512] dark:text-[#F4F1E8]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-dice-2"
                    className="mb-1 block text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]"
                  >
                    Dice 2 (g)
                  </label>
                  <input
                    id="new-dice-2"
                    type="text"
                    inputMode="numeric"
                    value={dice2Input}
                    onChange={(e) => setDice2Input(sanitizeDigits(e.target.value))}
                    placeholder="0"
                    className="font-mono-num h-11 w-full rounded-[12px] border border-[#D6D2C4] bg-[#E8E5DC]/40 px-3 text-[15px] font-bold text-[#23211E] outline-none focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#161512] dark:text-[#F4F1E8]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-dice-3"
                    className="mb-1 block text-xs font-semibold text-[#6E695E] dark:text-[#A39D90]"
                  >
                    Dice 3 (g)
                  </label>
                  <input
                    id="new-dice-3"
                    type="text"
                    inputMode="numeric"
                    value={dice3Input}
                    onChange={(e) => setDice3Input(sanitizeDigits(e.target.value))}
                    placeholder="0"
                    className="font-mono-num h-11 w-full rounded-[12px] border border-[#D6D2C4] bg-[#E8E5DC]/40 px-3 text-[15px] font-bold text-[#23211E] outline-none focus:border-[#E0A526] dark:border-[#38342D] dark:bg-[#161512] dark:text-[#F4F1E8]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-[12px] bg-[#F0EDE4] px-3.5 py-2.5 text-sm dark:bg-[#2D2A24]">
                <span className="text-[#6E695E] dark:text-[#A39D90]">Calculated total</span>
                <span className="font-mono-num font-bold text-[#23211E] dark:text-[#F4F1E8]">
                  {(Number.parseInt(dice1Input, 10) || 0) +
                    (Number.parseInt(dice2Input, 10) || 0) +
                    (Number.parseInt(dice3Input, 10) || 0)}
                  g
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetDialog}
                  className="h-11 rounded-[12px] px-4 text-sm font-semibold text-[#6E695E] hover:bg-[#E8E5DC] dark:text-[#A39D90] dark:hover:bg-[#2D2A24]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!nameInput.trim()}
                  className="h-11 rounded-[12px] bg-[#23211E] px-5 text-sm font-bold text-[#E0A526] transition-opacity hover:bg-[#2F2C28] disabled:cursor-not-allowed disabled:opacity-40 dark:border dark:border-[#4A4336]"
                >
                  Save model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DiceChip({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[8px] bg-[#F0EDE4] px-2 py-0.5 text-xs dark:bg-[#2D2A24]">
      <span className="font-medium text-[#6E695E] dark:text-[#A39D90]">{label}</span>
      <span className="font-mono-num font-bold text-[#23211E] dark:text-[#F4F1E8]">
        {value}
      </span>
    </span>
  );
}
