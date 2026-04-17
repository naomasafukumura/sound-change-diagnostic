import { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    category: 'linking',
    sentence: 'I met him at the station.',
    translation: '駅で彼に会ったよ',
    situation: '友達との会話で',
    soundChanges: [
      { position: 'met him', explanation: 'メリム（t+hが繋がる）' },
      { position: 'at the', explanation: 'アッダ（t+thが繋がる）' },
    ],
    audioUrl: '/audio/questions/q01.mp3',
    choices: [
      'I met him at the station.',
      'I met him and the station.',
      'I met him in the station.',
    ],
    correctIndex: 0,
    explanation:
      'met himが「メリム」、at theが「アッダ」と繋がって聞こえます。前の単語の最後の子音と次の単語の最初の音がくっつく連結です。',
  },
  {
    id: 2,
    category: 'linking',
    sentence: 'Can I get a cup of coffee?',
    translation: 'コーヒーを一杯もらえますか？',
    situation: 'カフェで注文する時',
    soundChanges: [
      { position: 'Can I', explanation: 'キャナイ（n+Iが繋がる）' },
      { position: 'cup of', explanation: 'カパ（p+oが繋がる）' },
    ],
    audioUrl: '/audio/questions/q02.mp3',
    choices: [
      'Can I get a cup of coffee?',
      'Can I get a couple of coffee?',
      'Can I get a cap of coffee?',
    ],
    correctIndex: 0,
    explanation:
      'Can Iが「キャナイ」、cup ofが「カパ」と繋がって聞こえます。子音+母音の組み合わせで音が連結しています。',
  },
  {
    id: 3,
    category: 'linking',
    sentence: 'Turn it off before you leave.',
    translation: '出る前に消してね',
    situation: '家を出る人に',
    soundChanges: [
      { position: 'turn it', explanation: 'ターニッ（n+iが繋がる）' },
      { position: 'it off', explanation: 'トフ（t+oが繋がる）' },
    ],
    audioUrl: '/audio/questions/q03.mp3',
    choices: [
      'Turn it off before you leave.',
      'Turn it all before you leave.',
      'Turn it on before you leave.',
    ],
    correctIndex: 0,
    explanation:
      'turn itが「ターニッ」、it offが「トフ」と繋がって聞こえます。itの前後で連結が2回起きています。',
  },
  {
    id: 4,
    category: 'elision',
    sentence: 'I just got back from work.',
    translation: '仕事から帰ってきたところ',
    situation: '帰宅して家族に',
    soundChanges: [
      { position: 'just', explanation: 'justのtが消える（ジャスガッ）' },
      { position: 'got', explanation: 'gotのtが消える（ガッバック）' },
    ],
    audioUrl: '/audio/questions/q04.mp3',
    choices: [
      'I just got back from work.',
      'I just got black from work.',
      'I just go back from work.',
    ],
    correctIndex: 0,
    explanation:
      'justのtとgotのtが消えて「ジャスガッバック」のように聞こえます。tが次の子音の前で脱落しています。',
  },
  {
    id: 5,
    category: 'elision',
    sentence: "I don't want to be late.",
    translation: '遅刻したくない',
    situation: '急いでいる時に',
    soundChanges: [
      { position: "don't", explanation: "don'tのtが消える（ドンワナ）" },
      { position: 'want', explanation: 'wantのtが消える（ワナビー）' },
    ],
    audioUrl: '/audio/questions/q05.mp3',
    choices: [
      "I don't want to be late.",
      "I don't like to be late.",
      "I don't need to be late.",
    ],
    correctIndex: 0,
    explanation:
      "don'tのtとwantのtが消えて「ドンワナビーレイト」のように聞こえます。want toは特に「ワナ」に変化しやすいパターンです。",
  },
  {
    id: 6,
    category: 'elision',
    sentence: "Last night I couldn't sleep.",
    translation: '昨日の夜、眠れなかった',
    situation: '寝不足の朝に',
    soundChanges: [
      { position: 'last', explanation: 'lastのtが消える（ラスナイ）' },
      { position: "couldn't", explanation: "couldn'tのtが消える（クドゥン）" },
    ],
    audioUrl: '/audio/questions/q06.mp3',
    choices: [
      "Last night I couldn't sleep.",
      "Last night I couldn't see.",
      "Last time I couldn't sleep.",
    ],
    correctIndex: 0,
    explanation:
      "lastのtとcouldn'tのtが消えて「ラスナイ・アイクドゥンスリープ」のように聞こえます。tが子音の前で脱落するパターンです。",
  },
  {
    id: 7,
    category: 'elision',
    sentence: 'I must get back to work.',
    translation: '仕事に戻らなきゃ',
    situation: '休憩の終わりに',
    soundChanges: [
      { position: 'must', explanation: 'mustのtが消える（マスゲッ）' },
      { position: 'get', explanation: 'getのtが消える（ゲッバック）' },
    ],
    audioUrl: '/audio/questions/q07.mp3',
    choices: [
      'I must get back to work.',
      'I must go back to work.',
      'I must get back from work.',
    ],
    correctIndex: 0,
    explanation:
      'mustのtとgetのtが消えて「マスゲッバックタワーク」のように聞こえます。子音が連続する箇所でtが脱落しています。',
  },
  {
    id: 8,
    category: 'weakForm',
    sentence: 'I can do it for you.',
    translation: 'やってあげるよ',
    situation: '手伝いを申し出る時',
    soundChanges: [
      { position: 'can', explanation: 'canが「クン」に弱くなる' },
      { position: 'for', explanation: 'forが「ファ」に弱くなる' },
    ],
    audioUrl: '/audio/questions/q08.mp3',
    choices: [
      'I can do it for you.',
      "I can't do it for you.",
      'I can do it to you.',
    ],
    correctIndex: 0,
    explanation:
      'canが「クン」、forが「ファ」と弱く短くなっています。肯定のcanは弱形になるのが自然です（否定のcan\'tは強く発音されます）。',
  },
  {
    id: 9,
    category: 'weakForm',
    sentence: 'What do you want to eat?',
    translation: '何食べたい？',
    situation: '食事を決める時',
    soundChanges: [
      { position: 'do', explanation: 'doが「ダ」に弱くなる' },
      { position: 'to', explanation: 'toが「タ」に弱くなる' },
    ],
    audioUrl: '/audio/questions/q09.mp3',
    choices: [
      'What do you want to eat?',
      'What do you want to drink?',
      'What did you want to eat?',
    ],
    correctIndex: 0,
    explanation:
      'doが「ダ」、toが「タ」と弱く発音されて「ワダユワンタイート」のように聞こえます。疑問文のdoやto不定詞は弱形になりやすい代表例です。',
  },
  {
    id: 10,
    category: 'weakForm',
    sentence: 'We have to be there by noon.',
    translation: '昼までにそこに着かなきゃ',
    situation: '予定に間に合わせたい時',
    soundChanges: [
      { position: 'have', explanation: 'haveが「ハフ」に弱くなる' },
      { position: 'to', explanation: 'toが「タ」に弱くなる' },
    ],
    audioUrl: '/audio/questions/q10.mp3',
    choices: [
      'We have to be there by noon.',
      'We have to be there by nine.',
      'We had to be there by noon.',
    ],
    correctIndex: 0,
    explanation:
      'have toが「ハフタ」と弱く短くなっています。have toは日常会話でほぼ必ず「ハフタ」と発音されます。',
  },
];
