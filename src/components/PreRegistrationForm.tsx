import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { Loader2, CheckCircle } from 'lucide-react';

interface FormData {
  email: string;
  nickname: string;
  preferredCharacter: string;
}

interface FormErrors {
  email?: string;
  nickname?: string;
  preferredCharacter?: string;
}

export const PreRegistrationForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickname: '',
    preferredCharacter: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const characters = [
    { id: 'dark-knight', name: t('darkKnight') },
    { id: 'blood-mage', name: t('bloodMage') },
    { id: 'shadow-archer', name: t('shadowArcher') }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = t('language') === 'ko' ? '이메일을 입력해주세요.' :
                        t('language') === 'ja' ? 'メールアドレスを入力してください。' :
                        'Please enter your email.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    // Nickname validation
    if (!formData.nickname) {
      newErrors.nickname = t('language') === 'ko' ? '닉네임을 입력해주세요.' :
                           t('language') === 'ja' ? 'ニックネームを入力してください。' :
                           'Please enter your nickname.';
    } else if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      newErrors.nickname = t('invalidNickname');
    }

    // Character selection validation
    if (!formData.preferredCharacter) {
      newErrors.preferredCharacter = t('language') === 'ko' ? '캐릭터를 선택해주세요.' :
                                    t('language') === 'ja' ? 'キャラクターを選択してください。' :
                                    'Please select a character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      setIsSubmitted(true);
      toast.success(t('registrationSuccess'));
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ email: '', nickname: '', preferredCharacter: '' });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      toast.error(t('registrationError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="pre-register" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-stone-gray/90 border-fantasy-gold border-2 glow-gold">
            <CardContent className="p-8 text-center">
              <CheckCircle size={64} className="text-fantasy-gold mx-auto mb-6" />
              <h3 className="text-2xl font-cinzel text-fantasy-gold mb-4 text-glow">
                {t('registrationSuccess')}
              </h3>
              <p className="text-foreground mb-6">
                {t('language') === 'ko' ? '게임 출시 소식을 이메일로 알려드리겠습니다!' :
                 t('language') === 'ja' ? 'ゲームリリースのお知らせをメールでお送りします！' :
                 'We will notify you about the game release via email!'}
              </p>
              <div className="w-16 h-1 bg-fantasy-gold mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="pre-register" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="bg-stone-gray/90 border-fantasy-gold/30 hover:border-fantasy-gold/60 transition-all duration-300">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl md:text-4xl font-cinzel text-fantasy-gold text-glow">
              {t('preRegFormTitle')}
            </CardTitle>
            <p className="text-lg text-foreground mt-4">
              {t('preRegFormDesc')}
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-fantasy-gold">
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('language') === 'ko' ? '이메일 주소를 입력하세요' :
                              t('language') === 'ja' ? 'メールアドレスを入力' :
                              'Enter your email address'}
                  className={`bg-dark-black/80 border-fantasy-gold/30 text-foreground placeholder-muted-foreground focus:border-fantasy-gold ${
                    errors.email ? 'border-blood-red' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-blood-red text-sm">{errors.email}</p>
                )}
              </div>

              {/* Nickname Field */}
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-fantasy-gold">
                  {t('nickname')}
                </Label>
                <Input
                  id="nickname"
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  placeholder={t('language') === 'ko' ? '게임 내 사용할 닉네임' :
                              t('language') === 'ja' ? 'ゲーム内で使用するニックネーム' :
                              'Nickname to use in game'}
                  className={`bg-dark-black/80 border-fantasy-gold/30 text-foreground placeholder-muted-foreground focus:border-fantasy-gold ${
                    errors.nickname ? 'border-blood-red' : ''
                  }`}
                />
                {errors.nickname && (
                  <p className="text-blood-red text-sm">{errors.nickname}</p>
                )}
              </div>

              {/* Character Selection */}
              <div className="space-y-2">
                <Label className="text-fantasy-gold">
                  {t('preferredCharacter')}
                </Label>
                <Select 
                  value={formData.preferredCharacter} 
                  onValueChange={(value) => handleInputChange('preferredCharacter', value)}
                >
                  <SelectTrigger className={`bg-dark-black/80 border-fantasy-gold/30 text-foreground focus:border-fantasy-gold ${
                    errors.preferredCharacter ? 'border-blood-red' : ''
                  }`}>
                    <SelectValue placeholder={t('selectCharacter')} />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-gray border-fantasy-gold/30">
                    {characters.map((character) => (
                      <SelectItem 
                        key={character.id} 
                        value={character.id}
                        className="text-fantasy-gold hover:bg-fantasy-gold/20"
                      >
                        {character.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.preferredCharacter && (
                  <p className="text-blood-red text-sm">{errors.preferredCharacter}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-fantasy-gold hover:bg-ancient-bronze text-dark-black text-lg py-3 glow-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('language') === 'ko' ? '등록 중...' :
                     t('language') === 'ja' ? '登録中...' :
                     'Registering...'}
                  </>
                ) : (
                  t('submitRegistration')
                )}
              </Button>

              {/* Additional Info */}
              <p className="text-center text-sm text-muted-foreground">
                {t('language') === 'ko' ? 
                  '등록하시면 게임 출시 소식과 특별 혜택을 받아보실 수 있습니다.' :
                 t('language') === 'ja' ? 
                  '登録すると、ゲームリリースのお知らせや特別特典を受け取ることができます。' :
                  'By registering, you will receive game release news and special benefits.'}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};