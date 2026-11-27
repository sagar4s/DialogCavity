import mainActivityKt from '../../android/app/src/main/java/com/dielog/app/MainActivity.kt?raw';
import viewModelKt from '../../android/app/src/main/java/com/dielog/app/viewmodel/DieLogViewModel.kt?raw';
import dieModelKt from '../../android/app/src/main/java/com/dielog/app/model/DieModel.kt?raw';
import databaseScreenKt from '../../android/app/src/main/java/com/dielog/app/ui/screens/DatabaseScreen.kt?raw';
import calculatorScreenKt from '../../android/app/src/main/java/com/dielog/app/ui/screens/CalculatorScreen.kt?raw';
import themeKt from '../../android/app/src/main/java/com/dielog/app/ui/theme/Theme.kt?raw';
import appBuildGradle from '../../android/app/build.gradle.kts?raw';
import rootBuildGradle from '../../android/build.gradle.kts?raw';
import settingsGradle from '../../android/settings.gradle.kts?raw';
import manifestXml from '../../android/app/src/main/AndroidManifest.xml?raw';

export interface AndroidProjectFile {
  id: string;
  label: string;
  path: string;
  language: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidProjectFile[] = [
  {
    id: 'main-activity',
    label: 'MainActivity.kt',
    path: 'app/src/main/java/com/dielog/app/MainActivity.kt',
    language: 'kotlin',
    content: mainActivityKt,
  },
  {
    id: 'viewmodel',
    label: 'DieLogViewModel.kt',
    path: 'app/src/main/java/com/dielog/app/viewmodel/DieLogViewModel.kt',
    language: 'kotlin',
    content: viewModelKt,
  },
  {
    id: 'model',
    label: 'DieModel.kt',
    path: 'app/src/main/java/com/dielog/app/model/DieModel.kt',
    language: 'kotlin',
    content: dieModelKt,
  },
  {
    id: 'database-screen',
    label: 'DatabaseScreen.kt',
    path: 'app/src/main/java/com/dielog/app/ui/screens/DatabaseScreen.kt',
    language: 'kotlin',
    content: databaseScreenKt,
  },
  {
    id: 'calculator-screen',
    label: 'CalculatorScreen.kt',
    path: 'app/src/main/java/com/dielog/app/ui/screens/CalculatorScreen.kt',
    language: 'kotlin',
    content: calculatorScreenKt,
  },
  {
    id: 'theme',
    label: 'Theme.kt',
    path: 'app/src/main/java/com/dielog/app/ui/theme/Theme.kt',
    language: 'kotlin',
    content: themeKt,
  },
  {
    id: 'app-gradle',
    label: 'app/build.gradle.kts',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    content: appBuildGradle,
  },
  {
    id: 'root-gradle',
    label: 'build.gradle.kts',
    path: 'build.gradle.kts',
    language: 'kotlin',
    content: rootBuildGradle,
  },
  {
    id: 'settings-gradle',
    label: 'settings.gradle.kts',
    path: 'settings.gradle.kts',
    language: 'kotlin',
    content: settingsGradle,
  },
  {
    id: 'manifest',
    label: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    content: manifestXml,
  },
];
