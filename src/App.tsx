import React, { useEffect, useState } from 'react';
import { Calculator, Code2, Database, Moon, Scale, Sun } from 'lucide-react';
import { DieModel, INITIAL_DIE_MODELS } from './data/dieModels';
import { DatabaseTab } from './components/DatabaseTab';
import { CalculatorTab } from './components/CalculatorTab';
import { AndroidCodeModal } from './components/AndroidCodeModal';

type ActiveTab = 'database' | 'calculator';

export default function App() {
  // In-memory state matching DieLogViewModel + StateFlow
  const [models, setModels] = useState<DieModel[]>(INITIAL_DIE_MODELS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('database');

  // Default state on first load matching Excel verification example
  const [slots, setSlots] = useState<
    [string | null, string | null, string | null, string | null]
  >(['DX-9055', 'TA-401', 'TA-012', 'TA-030']);
  const [count13, setCount13] = useState('20');
  const [count24, setCount24] = useState('110');

  const [darkMode, setDarkMode] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddModel = (
    name: string,
    dice1: number,
    dice2: number,
    dice3: number
  ) => {
    const newEntry: DieModel = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      dice1,
      dice2,
      dice3,
    };
    setModels((prev) => [...prev, newEntry]);
  };

  const handleSelectSlot = (
    slotIndex: 0 | 1 | 2 | 3,
    modelName: string | null
  ) => {
    setSlots((prev) => {
      const next: [string | null, string | null, string | null, string | null] = [
        ...prev,
      ];
      next[slotIndex] = modelName;
      return next;
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#E8E5DC] text-[#23211E] transition-colors duration-150 dark:bg-[#161512] dark:text-[#F4F1E8]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 border-b border-[#D6D2C4] bg-[#E8E5DC]/95 backdrop-blur-sm dark:border-[#38342D] dark:bg-[#161512]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Brand mark: dark rounded square with gold Scale icon + DIE LOG + Cavity weight tracker */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#23211E] dark:border dark:border-[#38342D]">
              <Scale className="h-5 w-5 text-[#E0A526]" aria-hidden="true" />
            </div>
            <div className="min-w-0 leading-tight">
              <h1 className="font-condensed truncate text-[24px] font-extrabold uppercase leading-none tracking-[0.08em] text-[#23211E] dark:text-[#F4F1E8]">
                DIE LOG
              </h1>
              <p className="mt-0.5 truncate text-xs font-medium text-[#6E695E] dark:text-[#A39D90]">
                Cavity weight tracker
              </p>
            </div>
          </div>

          {/* Utility controls: Kotlin Source viewer & Light/Dark toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCodeModalOpen(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-[11px] border border-[#D6D2C4] bg-[#FBFAF6] px-3 text-xs font-semibold text-[#23211E] transition-colors hover:border-[#23211E] dark:border-[#38342D] dark:bg-[#22201C] dark:text-[#F4F1E8] dark:hover:border-[#E0A526]"
            >
              <Code2 className="h-4 w-4 text-[#E0A526]" />
              <span className="whitespace-nowrap">Kotlin Source</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
              className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#D6D2C4] bg-[#FBFAF6] text-[#23211E] transition-colors hover:border-[#23211E] dark:border-[#38342D] dark:bg-[#22201C] dark:text-[#E0A526] dark:hover:border-[#E0A526]"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Active Screen Content */}
      <main className="flex-1 pb-24">
        {activeTab === 'database' ? (
          <DatabaseTab
            models={models}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddModel={handleAddModel}
          />
        ) : (
          <CalculatorTab
            models={models}
            slots={slots}
            count13={count13}
            count24={count24}
            onSelectSlot={handleSelectSlot}
            onCount13Change={setCount13}
            onCount24Change={setCount24}
          />
        )}
      </main>

      {/* Bottom NavigationBar: Two tabs ("Database" & "Calculator") */}
      <nav
        aria-label="Primary navigation"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D6D2C4] bg-[#FBFAF6]/95 backdrop-blur-md dark:border-[#38342D] dark:bg-[#1E1C18]/95"
      >
        <div className="mx-auto grid h-[68px] max-w-md grid-cols-2 items-center px-4">
          <BottomNavButton
            label="Database"
            active={activeTab === 'database'}
            icon={<Database className="h-5 w-5" />}
            onClick={() => setActiveTab('database')}
          />
          <BottomNavButton
            label="Calculator"
            active={activeTab === 'calculator'}
            icon={<Calculator className="h-5 w-5" />}
            onClick={() => setActiveTab('calculator')}
          />
        </div>
      </nav>

      {/* Native Android Kotlin/Compose Project Viewer */}
      <AndroidCodeModal
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />
    </div>
  );
}

interface BottomNavButtonProps {
  label: string;
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}

function BottomNavButton({
  label,
  active,
  icon,
  onClick,
}: BottomNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="flex h-full flex-col items-center justify-center gap-1 focus-visible:outline-none"
    >
      <span
        className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${
          active
            ? 'bg-[#23211E] text-[#E0A526] ring-2 ring-[#E0A526]/70'
            : 'text-[#6E695E] hover:text-[#23211E] dark:text-[#A39D90] dark:hover:text-[#F4F1E8]'
        }`}
      >
        {icon}
      </span>
      <span
        className={`text-[11px] leading-none whitespace-nowrap ${
          active
            ? 'font-bold text-[#23211E] dark:text-[#F4F1E8]'
            : 'font-medium text-[#6E695E] dark:text-[#A39D90]'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
