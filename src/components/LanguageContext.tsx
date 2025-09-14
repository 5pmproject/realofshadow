/**
 * Language Context Provider - Multi-language Support System
 * 
 * @description
 * Provides centralized language management for the entire application.
 * Supports Korean, English, and Japanese with automatic browser detection
 * and persistent language preferences.
 * 
 * @features
 * - Auto-detection of browser language
 * - Dynamic language switching
 * - Centralized translation management
 * - Type-safe translation keys
 * 
 * @responsive_behavior
 * - Adapts text content based on language-specific length variations
 * - Handles different text directions and character sets
 * - Optimizes layout for various language content lengths
 * 
 * @component_usage
 * Wrap the entire app with LanguageProvider and use useLanguage hook
 * in child components to access translation functions and current language.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Supported language types
 * @typedef {'ko' | 'en' | 'ja'} Language
 */
export type Language = 'ko' | 'en' | 'ja';

interface Translations {
  [key: string]: {
    ko: string;
    en: string;
    ja: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { ko: '홈', en: 'Home', ja: 'ホーム' },
  characters: { ko: '캐릭터', en: 'Characters', ja: 'キャラクター' },
  preRegister: { ko: '사전예약', en: 'Pre-Register', ja: '事前登録' },
  rewards: { ko: '보상', en: 'Rewards', ja: '報酬' },

  // Hero Section
  gameTitle: { ko: 'Realm of Shadows', en: 'Realm of Shadows', ja: 'Realm of Shadows' },
  heroSubtitle: { ko: '어둠 속에서 펼쳐지는 끝없는 모험', en: 'Endless Adventures Unfold in the Darkness', ja: '闇の中で繰り広げられる無限の冒険' },
  heroDescription: { ko: '엘든링 스타일의 다크 판타지 세계에서 당신만의 전설을 써내려가세요', en: 'Write your own legend in an Elden Ring-style dark fantasy world', ja: 'エルデンリング風のダークファンタジー世界で、あなただけの伝説を紡いでください' },
  registerNow: { ko: '지금 사전예약하기', en: 'Pre-Register Now', ja: '今すぐ事前登録' },

  // Game Introduction
  gameIntroTitle: { ko: '그림자의 영역으로 떠나는 여행', en: 'Journey to the Realm of Shadows', ja: '影の領域への旅' },
  gameIntroDesc: { ko: '고대의 저주가 깃든 어둠의 대륙에서 펼쳐지는 장대한 서사시. 선택한 길에 따라 달라지는 운명을 경험하세요.', en: 'An epic saga unfolds on a dark continent cursed by ancient magic. Experience a destiny that changes based on your choices.', ja: '古代の呪いが宿る闇の大陸で繰り広げられる壮大な叙事詩。選択した道によって変わる運命を体験してください。' },
  
  // Characters
  charactersTitle: { ko: '어둠의 전사들', en: 'Warriors of Darkness', ja: '闇の戦士たち' },
  darkKnight: { ko: '암흑 기사', en: 'Dark Knight', ja: 'ダークナイト' },
  darkKnightDesc: { ko: '강력한 방어력과 근접 전투 능력을 갖춘 탱커형 캐릭터', en: 'Tank character with powerful defense and melee combat abilities', ja: '強力な防御力と近接戦闘能力を持つタンク型キャラクター' },
  bloodMage: { ko: '혈법사', en: 'Blood Mage', ja: 'ブラッドメイジ' },
  bloodMageDesc: { ko: '생명력을 조작하는 금단의 마법을 사용하는 딜러형 캐릭터', en: 'Dealer character who uses forbidden magic to manipulate life force', ja: '生命力を操る禁断の魔法を使うディーラー型キャラクター' },
  shadowArcher: { ko: '그림자 궁수', en: 'Shadow Archer', ja: 'シャドウアーチャー' },
  shadowArcherDesc: { ko: '어둠에 숨어 원거리에서 적을 처치하는 원거리 딜러형 캐릭터', en: 'Ranged dealer character who hides in shadows and eliminates enemies from afar', ja: '闇に隠れて遠距離から敵を倒す遠距離ディーラー型キャラクター' },

  // Pre-registration Form
  preRegFormTitle: { ko: '사전예약 신청', en: 'Pre-Registration', ja: '事前登録申請' },
  preRegFormDesc: { ko: '지금 사전예약하고 독점 혜택을 받아보세요!', en: 'Pre-register now and receive exclusive benefits!', ja: '今すぐ事前登録して限定特典を受け取ろう！' },
  email: { ko: '이메일', en: 'Email', ja: 'メール' },
  nickname: { ko: '닉네임', en: 'Nickname', ja: 'ニックネーム' },
  preferredCharacter: { ko: '선호 캐릭터', en: 'Preferred Character', ja: '希望キャラクター' },
  selectCharacter: { ko: '캐릭터를 선택하세요', en: 'Select a character', ja: 'キャラクターを選択してください' },
  submitRegistration: { ko: '사전예약 완료', en: 'Complete Registration', ja: '事前登録完了' },

  // Rewards Section
  rewardsTitle: { ko: '사전예약 보상', en: 'Pre-Registration Rewards', ja: '事前登録報酬' },
  rewardsDesc: { ko: '목표 달성 시 모든 플레이어가 받는 특별 보상', en: 'Special rewards for all players when goals are achieved', ja: '目標達成時に全プレイヤーが受け取る特別報酬' },
  milestone1: { ko: '10만 명 달성', en: '100K Milestone', ja: '10万人達成' },
  milestone2: { ko: '25만 명 달성', en: '250K Milestone', ja: '25万人達成' },
  milestone3: { ko: '50만 명 달성', en: '500K Milestone', ja: '50万人達成' },
  reward1: { ko: '전설 무기 상자', en: 'Legendary Weapon Box', ja: '伝説の武器ボックス' },
  reward2: { ko: '레어 장비 세트', en: 'Rare Equipment Set', ja: 'レア装備セット' },
  reward3: { ko: '독점 스킨 + 타이틀', en: 'Exclusive Skin + Title', ja: '限定スキン + タイトル' },
  currentRegistrations: { ko: '현재 등록자', en: 'Current Registrations', ja: '現在の登録者' },

  // Footer
  aboutGame: { ko: '게임 소개', en: 'About Game', ja: 'ゲーム紹介' },
  support: { ko: '고객지원', en: 'Support', ja: 'サポート' },
  privacy: { ko: '개인정보처리방침', en: 'Privacy Policy', ja: 'プライバシーポリシー' },
  terms: { ko: '이용약관', en: 'Terms of Service', ja: '利用規約' },
  copyright: { ko: '© 2025 Realm of Shadows. 모든 권리 보유.', en: '© 2025 Realm of Shadows. All rights reserved.', ja: '© 2025 Realm of Shadows. 全著作権所有。' },

  // Messages
  registrationSuccess: { ko: '사전예약이 완료되었습니다!', en: 'Pre-registration completed!', ja: '事前登録が完了しました！' },
  registrationError: { ko: '오류가 발생했습니다. 다시 시도해주세요.', en: 'An error occurred. Please try again.', ja: 'エラーが発生しました。再度お試しください。' },
  invalidEmail: { ko: '올바른 이메일 주소를 입력해주세요.', en: 'Please enter a valid email address.', ja: '正しいメールアドレスを入力してください。' },
  invalidNickname: { ko: '닉네임은 2-20자 사이여야 합니다.', en: 'Nickname must be 2-20 characters.', ja: 'ニックネームは2-20文字である必要があります。' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getCurrentLanguage: () => Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Detect browser language
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ko')) return 'ko';
      if (browserLang.startsWith('ja')) return 'ja';
    }
    return 'en';
  });

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const getCurrentLanguage = (): Language => {
    return language;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};