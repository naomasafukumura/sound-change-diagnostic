import { CategoryIntro } from './types';

export const categories: CategoryIntro[] = [
  {
    category: 'linking',
    title: '連結（くっつく）',
    subtitle: '単語と単語の音がつながる',
    description:
      '英語では、前の単語の最後の子音と、次の単語の最初の母音がくっついて、1つの音のように聞こえることがあります。',
    demoAudioUrl: '/audio/demos/linking.mp3',
    demoSentence: 'Check it out',
    demoExplanation:
      '「チェック・イット・アウト」ではなく「チェキラウ」のように聞こえます。k+i、t+outが繋がっています。',
  },
  {
    category: 'elision',
    title: '脱落（消える）',
    subtitle: '音が消えてなくなる',
    description:
      '英語では、tやdなどの音が、次の子音の前で消えてしまうことがあります。特にt音の脱落は日常会話で頻繁に起こります。',
    demoAudioUrl: '/audio/demos/elision.mp3',
    demoSentence: 'Good morning',
    demoExplanation:
      '「グッド・モーニング」ではなく「グッモーニン」のように聞こえます。dの音が消えています。',
  },
  {
    category: 'weakForm',
    title: '弱形（弱くなる）',
    subtitle: '機能語の音が弱くなる',
    description:
      '英語では、can, to, for, ofなどの機能語が、文の中で弱く短く発音されます。辞書の発音とは全く違う音になることがあります。',
    demoAudioUrl: '/audio/demos/weak-form.mp3',
    demoSentence: 'I want to go',
    demoExplanation:
      '「アイ・ウォント・トゥー・ゴー」ではなく「アイワナゴー」のように聞こえます。toが弱くなりwantと繋がっています。',
  },
];
