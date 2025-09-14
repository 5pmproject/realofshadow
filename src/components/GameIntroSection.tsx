import React from 'react';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';

export const GameIntroSection: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      title: language === 'ko' ? '몰입감 있는 스토리' : 
            language === 'ja' ? '没入感のあるストーリー' : 'Immersive Storyline',
      description: language === 'ko' ? '플레이어의 선택에 따라 달라지는 복잡하고 깊이 있는 서사' :
                  language === 'ja' ? 'プレイヤーの選択によって変わる複雑で奥深い物語' :
                  'Complex and deep narrative that changes based on player choices'
    },
    {
      title: language === 'ko' ? '전략적 전투' : 
            language === 'ja' ? '戦略的戦闘' : 'Strategic Combat',
      description: language === 'ko' ? '실시간 액션과 전략적 사고가 결합된 독창적인 전투 시스템' :
                  language === 'ja' ? 'リアルタイムアクションと戦略的思考が融合した独창的な戦闘システム' :
                  'Unique combat system combining real-time action with strategic thinking'
    },
    {
      title: t('language') === 'ko' ? '길드 시스템' : 
            t('language') === 'ja' ? 'ギルドシステム' : 'Guild System',
      description: t('language') === 'ko' ? '동료들과 함께 거대한 보스를 물리치고 영역을 정복하세요' :
                  t('language') === 'ja' ? '仲間と共に巨大なボスを倒し、領域を征服しよう' :
                  'Defeat massive bosses and conquer territories with your allies'
    }
  ];

  return (
    <section id="game-intro" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-cinzel text-fantasy-gold mb-6 text-glow">
                {t('gameIntroTitle')}
              </h2>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                {t('gameIntroDesc')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-stone-gray/80 border-fantasy-gold/30 hover:border-fantasy-gold/60 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-cinzel text-fantasy-gold mb-3 group-hover:text-glow transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border-2 border-fantasy-gold/30">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1501137611759-f29dc6f8b33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMGZvcmVzdCUyMGRhcmslMjBmYW50YXN5fGVufDF8fHx8MTc1NzgxOTQxOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mystical Fantasy World"
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-black/60 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl md:text-2xl font-cinzel text-fantasy-gold mb-2">
                  {t('language') === 'ko' ? '어둠의 대륙 탐험' : 
                   t('language') === 'ja' ? '闇の大陸探検' : 'Explore the Dark Continent'}
                </h3>
                <p className="text-foreground">
                  {t('language') === 'ko' ? '신비로운 던전과 고대 유적을 발견하세요' :
                   t('language') === 'ja' ? '神秘的なダンジョンと古代遺跡を発見しよう' :
                   'Discover mysterious dungeons and ancient ruins'}
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-ancient-bronze rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-fantasy-gold rounded-full opacity-60 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};