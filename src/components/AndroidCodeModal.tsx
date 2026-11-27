import React, { useState } from 'react';
import { Check, Copy, Download, Terminal, X } from 'lucide-react';
import { ANDROID_PROJECT_FILES } from '../data/androidProjectFiles';

interface AndroidCodeModalProps {
  open: boolean;
  onClose: () => void;
}

export function AndroidCodeModal({ open, onClose }: AndroidCodeModalProps) {
  const [selectedId, setSelectedId] = useState<string>(ANDROID_PROJECT_FILES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'files' | 'guide'>('files');

  if (!open) return null;

  const activeFile =
    ANDROID_PROJECT_FILES.find((f) => f.id === selectedId) ?? ANDROID_PROJECT_FILES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopiedId(activeFile.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback copy unavailable in restricted clipboard contexts
    }
  };

  const handleDownloadFile = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.label.split('/').pop() || 'file.kt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="android-code-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[#D6D2C4] bg-[#FBFAF6] shadow-2xl dark:border-[#38342D] dark:bg-[#1C1A17]">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#D6D2C4] px-5 py-4 dark:border-[#38342D]">
          <div className="min-w-0">
            <h2
              id="android-code-modal-title"
              className="truncate text-base font-bold text-[#23211E] dark:text-[#F4F1E8]"
            >
              Android Studio Project — Kotlin &amp; Jetpack Compose (Material 3)
            </h2>
            <p className="text-xs text-[#6E695E] dark:text-[#A39D90]">
              minSdk 24 · ViewModel + StateFlow · Zero database or network dependencies
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex rounded-[10px] bg-[#E8E5DC] p-1 dark:bg-[#2B2822]">
              <button
                type="button"
                onClick={() => setViewMode('files')}
                className={`rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  viewMode === 'files'
                    ? 'bg-[#23211E] text-[#E0A526]'
                    : 'text-[#6E695E] hover:text-[#23211E] dark:text-[#A39D90] dark:hover:text-[#F4F1E8]'
                }`}
              >
                Source Files ({ANDROID_PROJECT_FILES.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('guide')}
                className={`rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  viewMode === 'guide'
                    ? 'bg-[#23211E] text-[#E0A526]'
                    : 'text-[#6E695E] hover:text-[#23211E] dark:text-[#A39D90] dark:hover:text-[#F4F1E8]'
                }`}
              >
                How to Run
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close code viewer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6E695E] hover:bg-[#E8E5DC] dark:text-[#A39D90] dark:hover:bg-[#2B2822]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        {viewMode === 'files' ? (
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            {/* File Sidebar */}
            <aside className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#D6D2C4] bg-[#F2EFE7] p-2.5 md:w-64 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r dark:border-[#38342D] dark:bg-[#161512]">
              {ANDROID_PROJECT_FILES.map((file) => {
                const active = file.id === activeFile.id;
                return (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => setSelectedId(file.id)}
                    className={`shrink-0 rounded-[10px] px-3 py-2 text-left text-xs font-medium transition-colors md:w-full ${
                      active
                        ? 'bg-[#23211E] font-bold text-[#E0A526]'
                        : 'text-[#23211E] hover:bg-[#E4E0D4] dark:text-[#D6D2C4] dark:hover:bg-[#25231E]'
                    }`}
                  >
                    <div className="truncate">{file.label}</div>
                  </button>
                );
              })}
            </aside>

            {/* Code Pane */}
            <div className="flex min-h-0 flex-1 flex-col bg-[#1A1916] text-[#F4F1E8]">
              <div className="flex items-center justify-between gap-2 border-b border-[#2F2D27] px-4 py-2.5">
                <span className="font-mono-num truncate text-xs text-[#A39D90]">
                  android/{activeFile.path}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleDownloadFile}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#3A3730] px-2.5 py-1.5 text-xs font-medium text-[#D6D2C4] hover:border-[#E0A526] hover:text-[#E0A526]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#E0A526] px-3 py-1.5 text-xs font-bold text-[#23211E] hover:bg-[#ECA820]"
                  >
                    {copiedId === activeFile.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <pre className="font-mono-num flex-1 overflow-auto p-4 text-[12.5px] leading-relaxed text-[#EFECE3]">
                <code>{activeFile.content}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed text-[#23211E] dark:text-[#F4F1E8]">
            <div className="mx-auto max-w-2xl space-y-5">
              <div className="flex items-center gap-2 text-base font-bold">
                <Terminal className="h-5 w-5 text-[#E0A526]" />
                <span>Running DIE LOG in Android Studio</span>
              </div>

              <ol className="list-decimal space-y-3 pl-5 text-[#3B3832] dark:text-[#D6D2C4]">
                <li>
                  <strong className="text-[#23211E] dark:text-[#F4F1E8]">
                    Create or open the project:
                  </strong>{' '}
                  In Android Studio (Ladybug / 2024.2+), choose{' '}
                  <span className="font-mono-num">New Project → Empty Activity</span>{' '}
                  with package name <span className="font-mono-num">com.dielog.app</span>{' '}
                  and Minimum SDK <span className="font-mono-num">API 24 (Android 7.0)</span>, or
                  open the included <span className="font-mono-num">android/</span> folder directly.
                </li>
                <li>
                  <strong className="text-[#23211E] dark:text-[#F4F1E8]">
                    Sync Gradle dependencies:
                  </strong>{' '}
                  Replace <span className="font-mono-num">app/build.gradle.kts</span> with the
                  provided file (includes Compose BOM <span className="font-mono-num">2024.12.01</span>,{' '}
                  Material 3, <span className="font-mono-num">material-icons-extended</span>, and{' '}
                  <span className="font-mono-num">lifecycle-viewmodel-compose</span>) and click{' '}
                  <strong>Sync Now</strong>.
                </li>
                <li>
                  <strong className="text-[#23211E] dark:text-[#F4F1E8]">
                    Add the Kotlin source files:
                  </strong>{' '}
                  Place <span className="font-mono-num">MainActivity.kt</span>,{' '}
                  <span className="font-mono-num">model/DieModel.kt</span>,{' '}
                  <span className="font-mono-num">viewmodel/DieLogViewModel.kt</span>,{' '}
                  <span className="font-mono-num">ui/theme/Theme.kt</span>,{' '}
                  <span className="font-mono-num">ui/screens/DatabaseScreen.kt</span>, and{' '}
                  <span className="font-mono-num">ui/screens/CalculatorScreen.kt</span> inside{' '}
                  <span className="font-mono-num">app/src/main/java/com/dielog/app/</span>.
                </li>
                <li>
                  <strong className="text-[#23211E] dark:text-[#F4F1E8]">
                    Run on an Emulator:
                  </strong>{' '}
                  Open <strong>Device Manager</strong>, launch any virtual phone running API 24+,
                  then click the green <strong>Run (▶)</strong> button.
                </li>
                <li>
                  <strong className="text-[#23211E] dark:text-[#F4F1E8]">
                    Run on a Physical Phone:
                  </strong>{' '}
                  Enable <strong>Developer options → USB debugging</strong> (or Wireless debugging)
                  on your Android device, connect via USB, select your phone in the toolbar device
                  picker, and press <strong>Run (▶)</strong>.
                </li>
              </ol>

              <div className="rounded-[14px] border border-[#D6D2C4] bg-[#F2EFE7] p-4 text-xs dark:border-[#38342D] dark:bg-[#22201C]">
                <div className="font-bold text-[#23211E] dark:text-[#F4F1E8]">
                  Default state verification
                </div>
                <p className="mt-1 text-[#6E695E] dark:text-[#A39D90]">
                  On first launch, Slot 1 = DX-9055 (920g), Slot 3 = TA-012 (1572g), Count = 20 →{' '}
                  <span className="font-mono-num font-bold text-[#23211E] dark:text-[#F4F1E8]">
                    49.840 kg
                  </span>
                  ; Slot 2 = TA-401 (2353g), Slot 4 = TA-030 (1791g), Count = 110 →{' '}
                  <span className="font-mono-num font-bold text-[#23211E] dark:text-[#F4F1E8]">
                    455.840 kg
                  </span>
                  ; GRAND TOTAL ={' '}
                  <span className="font-mono-num font-bold text-[#E0A526]">505.680 kg</span>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
