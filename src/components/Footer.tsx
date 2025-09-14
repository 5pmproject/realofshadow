import React from 'react';
import { useLanguage } from './LanguageContext';
import { Separator } from './ui/separator';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' }
  ];

  const footerLinks = [
    {
      title: t('aboutGame'),
      links: [
        { text: t('language') === 'ko' ? '게임 소개' : t('language') === 'ja' ? 'ゲーム紹介' : 'Game Overview', href: '#' },
        { text: t('language') === 'ko' ? '시스템 요구사항' : t('language') === 'ja' ? 'システム要件' : 'System Requirements', href: '#' },
        { text: t('language') === 'ko' ? '개발진' : t('language') === 'ja' ? '開発チーム' : 'Development Team', href: '#' }
      ]
    },
    {
      title: t('support'),
      links: [
        { text: t('language') === 'ko' ? 'FAQ' : t('language') === 'ja' ? 'よくある質問' : 'FAQ', href: '#' },
        { text: t('language') === 'ko' ? '문의하기' : t('language') === 'ja' ? 'お問い合わせ' : 'Contact Us', href: '#' },
        { text: t('language') === 'ko' ? '버그 신고' : t('language') === 'ja' ? 'バグ報告' : 'Bug Report', href: '#' }
      ]
    },
    {
      title: t('language') === 'ko' ? '법적 정보' : t('language') === 'ja' ? '法的情報' : 'Legal',
      links: [
        { text: t('privacy'), href: '#' },
        { text: t('terms'), href: '#' },
        { text: t('language') === 'ko' ? '쿠키 정책' : t('language') === 'ja' ? 'クッキーポリシー' : 'Cookie Policy', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-dark-black border-t border-fantasy-gold/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-fantasy-gold rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-dark-black rounded-full"></div>
              </div>
              <span className="text-2xl font-cinzel text-fantasy-gold text-glow">
                {t('gameTitle')}
              </span>
            </div>
            <p className="text-foreground mb-6 leading-relaxed">
              {t('language') === 'ko' ? 
                '어둠의 영역에서 펼쳐지는 장대한 모험. 당신의 선택이 세상을 바꿉니다.' :
               t('language') === 'ja' ? 
                '闇の領域で繰り広げられる壮大な冒険。あなたの選択が世界を変えます。' :
                'Epic adventures unfold in the realm of shadows. Your choices will change the world.'}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-stone-gray hover:bg-fantasy-gold/20 border border-fantasy-gold/30 hover:border-fantasy-gold rounded-full flex items-center justify-center text-fantasy-gold hover:text-fantasy-gold transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-cinzel text-fantasy-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-foreground hover:text-fantasy-gold transition-colors duration-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-fantasy-gold/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              {t('copyright')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>contact@realmofshadows.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>
                {t('language') === 'ko' ? '서울, 대한민국' :
                 t('language') === 'ja' ? '東京、日本' :
                 'Global Studio'}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-fantasy-gold/20">
          <div className="text-center">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {t('language') === 'ko' ? 
                '이 게임은 만 18세 이상 이용가능하며, 가상의 폭력과 판타지 요소를 포함하고 있습니다. 게임 내 아이템은 실제 현금 가치가 없으며, 모든 결제는 성인의 동의 하에 이루어져야 합니다.' :
               t('language') === 'ja' ? 
                'このゲームは18歳以上が対象で、仮想の暴力とファンタジー要素を含んでいます。ゲーム内アイテムには実際の現金価値はなく、すべての決済は成人の同意の下で行われる必要があります。' :
                'This game is rated for ages 18+ and contains virtual violence and fantasy elements. In-game items have no real-world monetary value, and all transactions must be made with adult consent.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};