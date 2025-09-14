import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Image } from './ui/Image';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Section, Container, Grid, Flex } from './layout';

interface Character {
  id: string;
  name: string;
  description: string;
  role: string;
  imageUrl: string;
  skills: string[];
  stats: {
    attack: number;
    defense: number;
    magic: number;
    speed: number;
  };
}

export const CharacterSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCharacter, setSelectedCharacter] = useState<string>('dark-knight');

  const characters: Character[] = [
    {
      id: 'dark-knight',
      name: t('darkKnight'),
      description: t('darkKnightDesc'),
      role: language === 'ko' ? '탱커' : language === 'ja' ? 'タンク' : 'Tank',
      imageUrl: "https://images.unsplash.com/photo-1570470089019-2dadc929b005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwa25pZ2h0JTIwYXJtb3IlMjB3YXJyaW9yfGVufDF8fHx8MTc1NzgyMDAwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      skills: language === 'ko' ? ['어둠의 방패', '도발', '생명력 흡수'] :
              language === 'ja' ? ['闇の盾', '挑発', '生命力吸収'] :
              ['Dark Shield', 'Taunt', 'Life Drain'],
      stats: { attack: 70, defense: 95, magic: 40, speed: 60 }
    },
    {
      id: 'blood-mage',
      name: t('bloodMage'),
      description: t('bloodMageDesc'),
      role: language === 'ko' ? '딜러' : language === 'ja' ? 'ディーラー' : 'DPS',
      imageUrl: "https://images.unsplash.com/photo-1586796676977-d23a9217a24a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXphcmQlMjBtYWdpYyUyMHNwZWxscyUyMGRhcmt8ZW58MXx8fHwxNzU3ODIwMDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      skills: language === 'ko' ? ['혈마법', '생명력 조작', '마나 폭발'] :
              language === 'ja' ? ['血魔法', '生命力操作', 'マナ爆発'] :
              ['Blood Magic', 'Life Manipulation', 'Mana Explosion'],
      stats: { attack: 90, defense: 45, magic: 95, speed: 75 }
    },
    {
      id: 'shadow-archer',
      name: t('shadowArcher'),
      description: t('shadowArcherDesc'),
      role: language === 'ko' ? '원거리 딜러' : language === 'ja' ? '遠距離ディーラー' : 'Ranged DPS',
      imageUrl: "https://images.unsplash.com/photo-1654714685970-06386068b3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGFyY2hlciUyMGJvdyUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3ODE5NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      skills: language === 'ko' ? ['그림자 화살', '은신', '관통 사격'] :
              language === 'ja' ? ['影の矢', '隠密', '貫通射撃'] :
              ['Shadow Arrow', 'Stealth', 'Piercing Shot'],
      stats: { attack: 85, defense: 55, magic: 60, speed: 90 }
    }
  ];

  const selectedChar = characters.find(char => char.id === selectedCharacter) || characters[0];

  const StatBar = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex-1 mx-3 bg-stone-gray rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-fantasy-gold to-ancient-bronze h-2 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-sm text-fantasy-gold w-8 text-right">{value}</span>
    </div>
  );

  return (
    <Section
      id="characters"
      spacing="xl"
      aria-labelledby="characters-title"
    >
      <Container size="xl">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 
            id="characters-title"
            className="text-3xl md:text-4xl lg:text-5xl font-cinzel text-fantasy-gold mb-6 text-glow"
          >
            {t('charactersTitle')}
          </h2>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            {language === 'ko' ? '각기 다른 능력과 플레이 스타일을 가진 세 명의 전사 중 하나를 선택하세요' :
             language === 'ja' ? 'それぞれ異なる能力とプレイスタイルを持つ3人の戦士から1人を選択してください' :
             'Choose one of three warriors, each with different abilities and play styles'}
          </p>
        </header>

        <Grid
          columns={{ mobile: 1, tablet: 1, desktop: 3 }}
          gap="lg"
        >
          {/* Character Selection */}
          <div className="lg:col-span-1">
            <Flex direction="col" gap="md">
              {characters.map((character) => (
                <Card 
                  key={character.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedCharacter === character.id 
                      ? 'bg-fantasy-gold/20 border-fantasy-gold glow-gold' 
                      : 'bg-stone-gray/80 border-fantasy-gold/30 hover:border-fantasy-gold/60'
                  }`}
                  onClick={() => setSelectedCharacter(character.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedCharacter === character.id}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCharacter(character.id);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <Flex align="center" gap="md">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-fantasy-gold/50 flex-shrink-0">
                        <Image
                          src={character.imageUrl}
                          alt={`${character.name} portrait`}
                          aspectRatio="square"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-cinzel text-fantasy-gold mb-1 truncate">
                          {character.name}
                        </h3>
                        <Badge variant="secondary" className="bg-ancient-bronze/20 text-ancient-bronze">
                          {character.role}
                        </Badge>
                      </div>
                    </Flex>
                  </CardContent>
                </Card>
              ))}
            </Flex>
          </div>

          {/* Character Details */}
          <div className="lg:col-span-2">
            <Card className="bg-stone-gray/80 border-fantasy-gold/30 overflow-hidden">
              <Grid
                columns={{ mobile: 1, tablet: 2, desktop: 2 }}
                gap="none"
              >
                {/* Character Image */}
                <div className="relative h-80 md:h-full">
                  <Image
                    src={selectedChar.imageUrl}
                    alt={`${selectedChar.name} - ${selectedChar.role}`}
                    aspectRatio="auto"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-cinzel text-fantasy-gold mb-2 text-glow">
                      {selectedChar.name}
                    </h3>
                    <Badge className="bg-ancient-bronze text-dark-black">
                      {selectedChar.role}
                    </Badge>
                  </div>
                </div>

                {/* Character Info */}
                <CardContent className="p-6">
                  <Flex direction="col" gap="lg">
                    {/* Description */}
                    <p className="text-foreground leading-relaxed">
                      {selectedChar.description}
                    </p>

                    {/* Skills */}
                    <div>
                      <h4 className="font-cinzel text-fantasy-gold mb-3">
                        {language === 'ko' ? '핵심 스킬' : 
                         language === 'ja' ? 'コアスキル' : 'Core Skills'}
                      </h4>
                      <Flex wrap gap="sm">
                        {selectedChar.skills.map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="border-fantasy-gold/50 text-fantasy-gold hover:bg-fantasy-gold/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </Flex>
                    </div>

                    {/* Stats */}
                    <div>
                      <h4 className="font-cinzel text-fantasy-gold mb-3">
                        {language === 'ko' ? '스탯' : 
                         language === 'ja' ? 'ステータス' : 'Stats'}
                      </h4>
                      <Flex direction="col" gap="sm">
                        <StatBar 
                          label={language === 'ko' ? '공격력' : language === 'ja' ? '攻撃力' : 'Attack'} 
                          value={selectedChar.stats.attack} 
                        />
                        <StatBar 
                          label={language === 'ko' ? '방어력' : language === 'ja' ? '防御力' : 'Defense'} 
                          value={selectedChar.stats.defense} 
                        />
                        <StatBar 
                          label={language === 'ko' ? '마법력' : language === 'ja' ? '魔法力' : 'Magic'} 
                          value={selectedChar.stats.magic} 
                        />
                        <StatBar 
                          label={language === 'ko' ? '속도' : language === 'ja' ? '速度' : 'Speed'} 
                          value={selectedChar.stats.speed} 
                        />
                      </Flex>
                    </div>
                  </Flex>
                </CardContent>
              </Grid>
            </Card>
          </div>
        </Grid>
      </Container>
    </Section>
  );
};