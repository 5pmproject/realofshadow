import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Gift, Star, Users } from 'lucide-react';

interface Milestone {
  target: number;
  title: string;
  reward: string;
  icon: React.ReactNode;
  completed: boolean;
}

export const RewardsSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentRegistrations, setCurrentRegistrations] = useState(127500);

  const milestones: Milestone[] = [
    {
      target: 100000,
      title: t('milestone1'),
      reward: t('reward1'),
      icon: <Gift className="w-8 h-8" />,
      completed: currentRegistrations >= 100000
    },
    {
      target: 250000,
      title: t('milestone2'),
      reward: t('reward2'),
      icon: <Star className="w-8 h-8" />,
      completed: currentRegistrations >= 250000
    },
    {
      target: 500000,
      title: t('milestone3'),
      reward: t('reward3'),
      icon: <Trophy className="w-8 h-8" />,
      completed: currentRegistrations >= 500000
    }
  ];

  // Simulate real-time registration updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRegistrations(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, 500000);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getProgressPercentage = (target: number) => {
    return Math.min((currentRegistrations / target) * 100, 100);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section id="rewards" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cinzel text-fantasy-gold mb-6 text-glow">
            {t('rewardsTitle')}
          </h2>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8">
            {t('rewardsDesc')}
          </p>

          {/* Current Registration Count */}
          <Card className="bg-stone-gray/90 border-fantasy-gold/30 max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-fantasy-gold mr-3" />
                <h3 className="text-xl font-cinzel text-fantasy-gold">
                  {t('currentRegistrations')}
                </h3>
              </div>
              <div className="text-3xl md:text-4xl font-cinzel text-fantasy-gold text-glow mb-2">
                {formatNumber(currentRegistrations)}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('language') === 'ko' ? '명이 사전등록했습니다' :
                 t('language') === 'ja' ? '人が事前登録しました' :
                 'players have pre-registered'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <div className="grid gap-8 md:gap-6">
          {milestones.map((milestone, index) => {
            const progress = getProgressPercentage(milestone.target);
            const isActive = currentRegistrations < milestone.target && 
                            (index === 0 || currentRegistrations >= milestones[index - 1].target);

            return (
              <Card 
                key={index}
                className={`relative overflow-hidden transition-all duration-500 ${
                  milestone.completed 
                    ? 'bg-fantasy-gold/20 border-fantasy-gold glow-gold' 
                    : isActive 
                      ? 'bg-stone-gray/90 border-fantasy-gold/60 hover:border-fantasy-gold' 
                      : 'bg-stone-gray/60 border-fantasy-gold/20'
                }`}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="grid md:grid-cols-12 gap-6 items-center">
                    {/* Icon & Status */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className={`p-4 rounded-full transition-all duration-300 ${
                        milestone.completed 
                          ? 'bg-fantasy-gold text-dark-black' 
                          : 'bg-fantasy-gold/20 text-fantasy-gold'
                      }`}>
                        {milestone.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-6 text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-cinzel text-fantasy-gold">
                          {milestone.title}
                        </h3>
                        {milestone.completed && (
                          <Badge className="bg-fantasy-gold text-dark-black">
                            {t('language') === 'ko' ? '달성!' :
                             t('language') === 'ja' ? '達成！' :
                             'Achieved!'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground mb-4">{milestone.reward}</p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {formatNumber(Math.min(currentRegistrations, milestone.target))}
                          </span>
                          <span className="text-fantasy-gold">
                            {formatNumber(milestone.target)}
                          </span>
                        </div>
                        <Progress 
                          value={progress} 
                          className="h-3 bg-stone-gray"
                        />
                        <div className="text-right text-sm text-fantasy-gold">
                          {progress.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Target Info */}
                    <div className="md:col-span-4 text-center">
                      <div className="text-2xl md:text-3xl font-cinzel text-fantasy-gold mb-2">
                        {formatNumber(milestone.target)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('language') === 'ko' ? '목표 등록자 수' :
                         t('language') === 'ja' ? '目標登録者数' :
                         'Target registrations'}
                      </p>
                    </div>
                  </div>

                  {/* Completed Overlay */}
                  {milestone.completed && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-fantasy-gold rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 border-r-2 border-b-2 border-dark-black rotate-45 transform -translate-y-0.5"></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-stone-gray/60 border-fantasy-gold/30 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-cinzel text-fantasy-gold mb-4">
                {t('language') === 'ko' ? '보상 수령 안내' :
                 t('language') === 'ja' ? '報酬受け取りガイド' :
                 'Reward Collection Guide'}
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                {t('language') === 'ko' ? 
                  '목표 달성 시 모든 사전등록 플레이어에게 게임 출시와 함께 보상이 지급됩니다. 추가 혜택은 출시 전까지 계속 추가될 예정입니다.' :
                 t('language') === 'ja' ? 
                  '目標達成時、すべての事前登録プレイヤーにゲームリリースと共に報酬が支給されます。追加特典はリリース前まで継続して追加される予定です。' :
                  'When goals are achieved, rewards will be distributed to all pre-registered players upon game release. Additional benefits will continue to be added until launch.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};