import { Lesson, Quiz } from "../types";

export const KANA_DATA = {
  hiragana: [
    { kana: "あ", romaji: "a", bangla: "আ" }, { kana: "い", romaji: "i", bangla: "ই" }, { kana: "う", romaji: "u", bangla: "উ" }, { kana: "え", romaji: "e", bangla: "এ" }, { kana: "お", romaji: "o", bangla: "ও" },
    { kana: "か", romaji: "ka", bangla: "কা" }, { kana: "き", romaji: "ki", bangla: "কি" }, { kana: "く", romaji: "ku", bangla: "কু" }, { kana: "け", romaji: "ke", bangla: "কে" }, { kana: "こ", romaji: "ko", bangla: "কো" },
    { kana: "さ", romaji: "sa", bangla: "সা" }, { kana: "し", romaji: "shi", bangla: "শি" }, { kana: "す", romaji: "su", bangla: "সু" }, { kana: "せ", romaji: "se", bangla: "সে" }, { kana: "そ", romaji: "so", bangla: "সো" },
    { kana: "た", romaji: "ta", bangla: "তা" }, { kana: "ち", romaji: "chi", bangla: "চি" }, { kana: "つ", romaji: "tsu", bangla: "ৎসু" }, { kana: "て", romaji: "te", bangla: "তে" }, { kana: "と", romaji: "to", bangla: "তো" },
    { kana: "な", romaji: "na", bangla: "না" }, { kana: "に", romaji: "ni", bangla: "নি" }, { kana: "ぬ", romaji: "nu", bangla: "নু" }, { kana: "ね", romaji: "ne", bangla: "নে" }, { kana: "の", romaji: "no", bangla: "নো" },
    { kana: "は", romaji: "ha", bangla: "হা" }, { kana: "ひ", romaji: "hi", bangla: "হি" }, { kana: "ふ", romaji: "fu", bangla: "ফু" }, { kana: "へ", romaji: "he", bangla: "হে" }, { kana: "ほ", romaji: "ho", bangla: "হো" },
    { kana: "ま", romaji: "ma", bangla: "মা" }, { kana: "み", romaji: "mi", bangla: "মি" }, { kana: "む", romaji: "mu", bangla: "মু" }, { kana: "め", romaji: "me", bangla: "মে" }, { kana: "も", romaji: "mo", bangla: "মো" },
    { kana: "や", romaji: "ya", bangla: "ইয়া" },                       { kana: "ゆ", romaji: "yu", bangla: "ইউ" },                       { kana: "よ", romaji: "यो", bangla: "ইও" },
    { kana: "ら", romaji: "ra", bangla: "রা" }, { kana: "り", romaji: "ri", bangla: "রি" }, { kana: "る", romaji: "ru", bangla: "রু" }, { kana: "れ", romaji: "re", bangla: "রে" }, { kana: "ろ", romaji: "ro", bangla: "রো" },
    { kana: "わ", romaji: "wa", bangla: "ওয়া" },                                                                                  { kana: "を", romaji: "wo/o", bangla: "ও" },
    { kana: "ん", romaji: "n", bangla: "ন" }
  ],
  katakana: [
    { kana: "ア", romaji: "a", bangla: "আ" }, { kana: "イ", romaji: "i", bangla: "ই" }, { kana: "ウ", romaji: "u", bangla: "উ" }, { kana: "エ", romaji: "e", bangla: "এ" }, { kana: "オ", romaji: "o", bangla: "ও" },
    { kana: "カ", romaji: "ka", bangla: "কা" }, { kana: "キ", romaji: "ki", bangla: "কি" }, { kana: "ク", romaji: "ku", bangla: "কু" }, { kana: "ケ", romaji: "ke", bangla: "কে" }, { kana: "コ", romaji: "ko", bangla: "কো" },
    { kana: "サ", romaji: "sa", bangla: "সা" }, { kana: "シ", romaji: "shi", bangla: "শি" }, { kana: "ス", romaji: "su", bangla: "সু" }, { kana: "セ", romaji: "se", bangla: "সে" }, { kana: "ソ", romaji: "so", bangla: "সো" },
    { kana: "タ", romaji: "ta", bangla: "তা" }, { kana: "チ", romaji: "chi", bangla: "চি" }, { kana: "ツ", romaji: "tsu", bangla: "ৎসু" }, { kana: "テ", romaji: "te", bangla: "তে" }, { kana: "ト", romaji: "to", bangla: "তো" },
    { kana: "ナ", romaji: "na", bangla: "না" }, { kana: "ニ", romaji: "ni", bangla: "নি" }, { kana: "ヌ", romaji: "nu", bangla: "নু" }, { kana: "ネ", romaji: "ne", bangla: "নে" }, { kana: "ノ", romaji: "no", bangla: "নো" },
    { kana: "ハ", romaji: "ha", bangla: "হা" }, { kana: "ヒ", romaji: "hi", bangla: "হি" }, { kana: "フ", romaji: "fu", bangla: "ফু" }, { kana: "ヘ", romaji: "he", bangla: "হে" }, { kana: "ホ", romaji: "ho", bangla: "হো" },
    { kana: "マ", romaji: "ma", bangla: "মা" }, { kana: "ミ", romaji: "mi", bangla: "মি" }, { kana: "ム", romaji: "mu", bangla: "মু" }, { kana: "メ", romaji: "me", bangla: "মে" }, { kana: "モ", romaji: "mo", bangla: "মো" },
    { kana: "ヤ", romaji: "ya", bangla: "ইয়া" },                       { kana: "ユ", romaji: "yu", bangla: "ইউ" },                       { kana: "ヨ", romaji: "yo", bangla: "ইও" },
    { kana: "ラ", romaji: "ra", bangla: "রা" }, { kana: "リ", romaji: "ri", bangla: "রি" }, { kana: "ル", romaji: "ru", bangla: "রু" }, { kana: "レ", romaji: "re", bangla: "রে" }, { kana: "ロ", romaji: "ro", bangla: "রো" },
    { kana: "ワ", romaji: "wa", bangla: "ওয়া" },                                                                                  { kana: "ヲ", romaji: "wo/o", bangla: "ও" },
    { kana: "ン", romaji: "n", bangla: "ন" }
  ]
};

export const LESSONS: Lesson[] = [
  {
    id: "basics-counting",
    title: "Counting & Numbers",
    japaneseTitle: "数と数え方",
    level: "Basics",
    description: "Learn Japanese numbers from 1 to 10,000 and how to form larger counts.",
    vocab: [
      { id: "num-1", japanese: "いち", kanji: "一", romaji: "ichi", english: "1 (One)", bangla: "১ (এক)" },
      { id: "num-2", japanese: "に", kanji: "二", romaji: "ni", english: "2 (Two)", bangla: "২ (দুই)" },
      { id: "num-3", japanese: "さん", kanji: "三", romaji: "san", english: "3 (Three)", bangla: "৩ (তিন)" },
      { id: "num-4", japanese: "よん", kanji: "四", romaji: "yon / shi", english: "4 (Four)", bangla: "৪ (চার)" },
      { id: "num-5", japanese: "ご", kanji: "五", romaji: "go", english: "5 (Five)", bangla: "৫ (পাঁচ)" },
      { id: "num-6", japanese: "ろく", kanji: "六", romaji: "roku", english: "6 (Six)", bangla: "৬ (ছয়)" },
      { id: "num-7", japanese: "なな", kanji: "七", romaji: "nana / shichi", english: "7 (Seven)", bangla: "৭ (সাত)" },
      { id: "num-8", japanese: "はち", kanji: "八", romaji: "hachi", english: "8 (Eight)", bangla: "৮ (আট)" },
      { id: "num-9", japanese: "きゅう", kanji: "九", romaji: "kyuu / ku", english: "9 (Nine)", bangla: "৯ (নয়)" },
      { id: "num-10", japanese: "じゅう", kanji: "十", romaji: "juu", english: "10 (Ten)", bangla: "১০ (দশ)" },
      { id: "num-100", japanese: "ひゃく", kanji: "百", romaji: "hyaku", english: "100 (Hundred)", bangla: "১০০ (একশত)" },
      { id: "num-1000", japanese: "せん", kanji: "千", romaji: "sen", english: "1000 (Thousand)", bangla: "১০০০ (এক হাজার)" },
      { id: "num-10000", japanese: "まん", kanji: "万", romaji: "man", english: "10,000 (Ten thousand)", bangla: "১০,০০০ (দশ হাজার)" }
    ],
    grammar: [
      {
        title: "Building Numbers 11-99",
        formula: "[Tens] + 十 + [Ones]",
        explanation: "To say 11, say 10 (じゅう) + 1 (いち) -> じゅういち. To say 20, say 2 (に) + 10 (じゅう) -> にじゅう. To say 25, say 2 (に) + 10 (じゅう) + 5 (ご) -> にじゅうご.",
        examples: [
          { japanese: "じゅうご (十五)", english: "15", bangla: "১৫" },
          { japanese: "にじゅう (二十)", english: "20", bangla: "২০" },
          { japanese: "さんじゅうご (三十五)", english: "35", bangla: "৩৫" }
        ]
      }
    ]
  },
  {
    id: "basics-datetime",
    title: "Calendar, Time & Dates",
    japaneseTitle: "カレンダー・時間",
    level: "Basics",
    description: "Learn months, hours, minutes, days of the week, and calendar date expressions.",
    vocab: [
      { id: "day-mon", japanese: "げつようび", kanji: "月曜日", romaji: "getsu-youbi", english: "Monday", bangla: "সোমবার" },
      { id: "day-tue", japanese: "かようび", kanji: "火曜日", romaji: "ka-youbi", english: "Tuesday", bangla: "মঙ্গলবার" },
      { id: "day-wed", japanese: "すいようび", kanji: "水曜日", romaji: "sui-youbi", english: "Wednesday", bangla: "বুধবার" },
      { id: "day-thu", japanese: "もくようび", kanji: "木曜日", romaji: "moku-youbi", english: "Thursday", bangla: "বৃহস্পতিবার" },
      { id: "day-fri", japanese: "きんようび", kanji: "金曜日", romaji: "kin-youbi", english: "Friday", bangla: "শুক্রবার" },
      { id: "day-sat", japanese: "どようび", kanji: "土曜日", romaji: "do-youbi", english: "Saturday", bangla: "শনিবার" },
      { id: "day-sun", japanese: "にちようび", kanji: "日曜日", romaji: "nichi-youbi", english: "Sunday", bangla: "রবিবার" },
      { id: "time-now", japanese: "いま", kanji: "今", romaji: "ima", english: "Now", bangla: "এখন" },
      { id: "time-hr", japanese: "なんじ", kanji: "何時", romaji: "nan-ji", english: "What time?", bangla: "কয়টা বাজে?" },
      { id: "time-min", japanese: "なんぷん", kanji: "何分", romaji: "nan-fun / nan-pun", english: "What minute?", bangla: "কত মিনিট?" }
    ],
    grammar: [
      {
        title: "Telling Time (Hours: ~じ)",
        formula: "[Number] + 時 (じ)",
        explanation: "Append 'ji' to a number to say 'o'clock'. Note some irregular pronunciations: 4 o'clock is よじ (yo-ji, not yon-ji), 7 is しちじ (shichi-ji), 9 is くじ (ku-ji, not kyuu-ji).",
        examples: [
          { japanese: "さんじ (三時)", english: "3 o'clock", bangla: "৩ টা বাজে" },
          { japanese: "よじ (四時)", english: "4 o'clock (Irregular)", bangla: "৪ টা বাজে" },
          { japanese: "くじ (九時)", english: "9 o'clock (Irregular)", bangla: "৯ টা বাজে" }
        ]
      },
      {
        title: "Telling Minutes (~ふん / ~ぷん)",
        formula: "[Number] + 分 (ふん / ぷん)",
        explanation: "Minutes end in 'fun' or 'pun' depending on the preceding number. Correct pronunciations include: 1 minute is いっぷん (ippun), 3 is さんぷん (sanpun), 5 is ごふん (gofun), 10 is じゅっぷん (juppun).",
        examples: [
          { japanese: "ごふん (五分)", english: "5 minutes", bangla: "৫ মিনিট" },
          { japanese: "じゅっぷん (十分)", english: "10 minutes", bangla: "১০ মিনিট" }
        ]
      }
    ]
  },
  {
    id: "lesson-1",
    title: "Lesson 1: Introductions",
    japaneseTitle: "第1課: 自己紹介",
    level: "N5",
    description: "Learn how to introduce yourself, state your profession, nationality, and use basic sentence endings.",
    vocab: [
      { id: "l1-1", japanese: "わたし", kanji: "私", romaji: "watashi", english: "I", bangla: "আমি" },
      { id: "l1-2", japanese: "わたしたち", kanji: "私たち", romaji: "watashitachi", english: "We", bangla: "আমরা" },
      { id: "l1-3", japanese: "あなた", romaji: "anata", english: "You", bangla: "তুমি / আপনি" },
      { id: "l1-4", japanese: "あのひと", kanji: "あの人", romaji: "anohito", english: "That person (He / She)", bangla: "ঐ ব্যক্তি (সে / তিনি)" },
      { id: "l1-5", japanese: "みなさん", kanji: "皆さん", romaji: "minasan", english: "Everyone / Ladies & Gentlemen", bangla: "সবাই / আপনারা সকলে" },
      { id: "l1-6", japanese: "せんせい", kanji: "先生", romaji: "sensei", english: "Teacher / Instructor (referring to others)", bangla: "শিক্ষক (অন্যকে সম্বোধন করতে)" },
      { id: "l1-7", japanese: "きょうし", kanji: "教師", romaji: "kyoushi", english: "Teacher (referring to self's job)", bangla: "শিক্ষক (নিজের পেশা বলতে)" },
      { id: "l1-8", japanese: "がくせい", kanji: "学生", romaji: "gakusei", english: "Student", bangla: "ছাত্র / ছাত্রী" },
      { id: "l1-9", japanese: "かいしゃいん", kanji: "会社員", romaji: "kaishain", english: "Company employee", bangla: "কোম্পানি কর্মচারী" },
      { id: "l1-10", japanese: "いしゃ", kanji: "医者", romaji: "isha", english: "Doctor / Medical physician", bangla: "ডাক্তার" },
      { id: "l1-11", japanese: "ぎんこういん", kanji: "銀行員", romaji: "ginkouin", english: "Bank employee", bangla: "ব্যাংক কর্মকর্তা" },
      { id: "l1-12", japanese: "だいがく", kanji: "大学", romaji: "daigaku", english: "University", bangla: "বিশ্ববিদ্যালয়" },
      { id: "l1-13", japanese: "びょういん", kanji: "病院", romaji: "byouin", english: "Hospital", bangla: "হাসপাতাল" },
      { id: "l1-14", japanese: "はじめまして", romaji: "hajimemashite", english: "Nice to meet you (How do you do)", bangla: "আপনার সাথে প্রথম দেখা হয়ে ভালো লাগলো" },
      { id: "l1-15", japanese: "にほん", kanji: "日本", romaji: "nihon", english: "Japan", bangla: "জাপান" }
    ],
    grammar: [
      {
        title: "Noun1 は Noun2 です",
        formula: "N1 は N2 です",
        explanation: "This is the basic sentence pattern 'Noun1 is Noun2'. The particle 'は' (pronounced 'wa') marks the topic N1, and 'です' (desu) is the polite ending copula.",
        examples: [
          { japanese: "わたし は がくせい です。", english: "I am a student.", bangla: "আমি একজন ছাত্র।" },
          { japanese: "ミラさん は かいしゃいん です。", english: "Mr. Miller is a company employee.", bangla: "মিরা সাহেব কোম্পানির কর্মচারী।" }
        ]
      },
      {
        title: "Noun1 は Noun2 じゃありません",
        formula: "N1 は N2 じゃありません",
        explanation: "This is the negative form of N1 は N2 です, meaning 'Noun1 is NOT Noun2'. 'じゃありません' (ja arimasen) is the polite negative.",
        examples: [
          { japanese: "わたし は いしゃ じゃありません。", english: "I am not a doctor.", bangla: "আমি ডাক্তার নই।" },
          { japanese: "あのひと は せんせい じゃありません。", english: "That person is not a teacher.", bangla: "ঐ ব্যক্তি শিক্ষক নন।" }
        ]
      },
      {
        title: "Question Particle: ~か",
        formula: "Sentence + か",
        explanation: "The particle 'か' (ka) placed at the end of a sentence turns it into a question. No question mark is needed in written Japanese.",
        examples: [
          { japanese: "あなた は がくせい ですか。", english: "Are you a student?", bangla: "আপনি কি ছাত্র?" }
        ]
      },
      {
        title: "Also Particle: ~も",
        formula: "N + も",
        explanation: "The particle 'も' (mo) replaces 'は' when a statement about a new topic is the same as the previous statement. Means 'also' or 'too'.",
        examples: [
          { japanese: "わたし も がくせい です。", english: "I am also a student.", bangla: "আমিও একজন ছাত্র।" }
        ]
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Demonstratives",
    japaneseTitle: "第2課: これ・それ・あれ",
    level: "N5",
    description: "Learn how to refer to objects near you, near the listener, or far away from both, and indicate ownership.",
    vocab: [
      { id: "l2-1", japanese: "これ", romaji: "kore", english: "This (thing here near me)", bangla: "এটি (বক্তার কাছের বস্তু)" },
      { id: "l2-2", japanese: "それ", romaji: "sore", english: "That (thing near you)", bangla: "ওটি (শ্রোতার কাছের বস্তু)" },
      { id: "l2-3", japanese: "あれ", romaji: "are", english: "That (thing far away over there)", bangla: "ঐটি (উভয়ের দূরের বস্তু)" },
      { id: "l2-4", japanese: "この", romaji: "kono", english: "This ~ [Noun]", bangla: "এই ~ [বিশেষ্য]" },
      { id: "l2-5", japanese: "その", romaji: "sono", english: "That ~ [Noun]", bangla: "ঐ ~ [বিশেষ্য]" },
      { id: "l2-6", japanese: "あの", romaji: "ano", english: "That ~ [Noun] over there", bangla: "ঐ দূরের ~ [বিশেষ্য]" },
      { id: "l2-7", japanese: "ほん", kanji: "本", romaji: "hon", english: "Book", bangla: "বই" },
      { id: "l2-8", japanese: "じしょ", kanji: "辞書", romaji: "jisho", english: "Dictionary", bangla: "অভিধান" },
      { id: "l2-9", japanese: "ざっし", kanji: "雑誌", romaji: "zasshi", english: "Magazine", bangla: "পত্রিকা / ম্যাগাজিন" },
      { id: "l2-10", japanese: "しんぶん", kanji: "新聞", romaji: "shinbun", english: "Newspaper", bangla: "খবরের কাগজ" },
      { id: "l2-11", japanese: "ノート", romaji: "no-to", english: "Notebook", bangla: "নোটবুক" },
      { id: "l2-12", japanese: "かぎ", romaji: "kagi", english: "Key", bangla: "চাবি" },
      { id: "l2-13", japanese: "とけい", kanji: "時計", romaji: "tokei", english: "Watch / Clock", bangla: "ঘড়ি" },
      { id: "l2-14", japanese: "かさ", kanji: "傘", romaji: "kasa", english: "Umbrella", bangla: "ছাতা" },
      { id: "l2-15", japanese: "かばん", romaji: "kaban", english: "Bag / Briefcase", bangla: "ব্যাগ" }
    ],
    grammar: [
      {
        title: "これ / それ / あれ は N です",
        formula: "[これ / それ / あれ] は N です",
        explanation: "These are demonstrative pronouns. They stand on their own as the subject of the sentence. 'これ' is near speaker, 'それ' is near listener, and 'あれ' is far from both.",
        examples: [
          { japanese: "これ は わたし の かさ です。", english: "This is my umbrella.", bangla: "এটি আমার ছাতা।" },
          { japanese: "それ は なん ですか。", english: "What is that?", bangla: "ওটা কি?" }
        ]
      },
      {
        title: "この / その / あの N",
        formula: "[この / その / あの] + Noun",
        explanation: "These determiners must always be directly followed by a Noun. They modify the noun to specify 'this book', 'that dictionary', etc.",
        examples: [
          { japanese: "この ほん は わたし の です。", english: "This book is mine.", bangla: "এই বইটি আমার।" }
        ]
      },
      {
        title: "Noun1 の Noun2 (Possession)",
        formula: "N1 の N2",
        explanation: "The particle 'の' (no) connects two nouns. Here, N1 owns or is associated with N2. It behaves like 's in English or 'এর' in Bengali.",
        examples: [
          { japanese: "これ は わたし の じしょ です。", english: "This is my dictionary.", bangla: "এটি আমার অভিধান।" }
        ]
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Lesson 3: Places & Location",
    japaneseTitle: "第3課: ここ・そこ・あそこ",
    level: "N5",
    description: "Learn how to ask for and describe directions, specify locations, offices, classrooms, and countries.",
    vocab: [
      { id: "l3-1", japanese: "ここ", romaji: "koko", english: "Here (this place near me)", bangla: "এখানে (বক্তার স্থান)" },
      { id: "l3-2", japanese: "そこ", romaji: "soko", english: "There (that place near you)", bangla: "ওখানে (শ্রোতার স্থান)" },
      { id: "l3-3", japanese: "あそこ", romaji: "asoko", english: "Over there (place far from both)", bangla: "ঐখানে (দূরের স্থান)" },
      { id: "l3-4", japanese: "どこ", romaji: "doko", english: "Where?", bangla: "কোথায়?" },
      { id: "l3-5", japanese: "こちら", romaji: "kochira", english: "This direction / here (polite)", bangla: "এই দিকে (এখানে - মার্জিত)" },
      { id: "l3-6", japanese: "そちら", romaji: "sochira", english: "That direction / there (polite)", bangla: "ঐ দিকে (ওখানে - মার্জিত)" },
      { id: "l3-7", japanese: "あちら", romaji: "achira", english: "That direction over there (polite)", bangla: "ঐ দূরের দিকে (মার্জিত)" },
      { id: "l3-8", japanese: "どちら", romaji: "dochira", english: "Which direction? / Where? (polite)", bangla: "কোন দিকে? (কোথায় - মার্জিত)" },
      { id: "l3-9", japanese: "きょうしつ", kanji: "教室", romaji: "kyoushitsu", english: "Classroom", bangla: "শ্রেণীকক্ষ" },
      { id: "l3-10", japanese: "しょくどう", kanji: "食堂", romaji: "shokudou", english: "Dining hall / Canteen", bangla: "খাবার ঘর / ক্যাফেটেরিয়া" },
      { id: "l3-11", japanese: "じむしょ", kanji: "事務所", romaji: "jimusho", english: "Office", bangla: "অফিস" },
      { id: "l3-12", japanese: "おてあらい", kanji: "お手洗い", romaji: "otearai", english: "Restroom / Toilet", bangla: "টয়লেট / বাথরুম" },
      { id: "l3-13", japanese: "でんわ", kanji: "電話", romaji: "denwa", english: "Telephone / Phone call", bangla: "টেলিফোন" },
      { id: "l3-14", japanese: "うち", kanji: "家", romaji: "uchi", english: "House / Home", bangla: "বাড়ি / বাসা" },
      { id: "l3-15", japanese: "かいしゃ", kanji: "会社", romaji: "kaisha", english: "Company / Office", bangla: "কোম্পানি" }
    ],
    grammar: [
      {
        title: "Noun は Place です",
        formula: "N は [Place] です",
        explanation: "This pattern states that Noun is located at [Place].",
        examples: [
          { japanese: "おてあらい は あそこ です。", english: "The restroom is over there.", bangla: "টয়লেটটি ঐখানে।" },
          { japanese: "じむしょ は ２かい です。", english: "The office is on the 2nd floor.", bangla: "অফিসটি দ্বিতীয় তলায়।" }
        ]
      },
      {
        title: "Asking Location: ~はどこですか",
        formula: "N は どこですか",
        explanation: "Used to ask where N is located. Replace 'どこ' (where) with 'どちら' (which direction) for more polite inquiries.",
        examples: [
          { japanese: "でんわ は どこ ですか。", english: "Where is the telephone?", bangla: "টেলিফোনটি কোথায়?" },
          { japanese: "エレベーター は どちら ですか。", english: "Where is the elevator, please? (polite)", bangla: "লিফটটি কোন দিকে?" }
        ]
      }
    ]
  },
  {
    id: "lesson-4",
    title: "Lesson 4: Time, Verbs, Days",
    japaneseTitle: "第4課: おきます・ねます",
    level: "N5",
    description: "Learn how to use Japanese verbs in their polite ます-form, state your daily routine, and express limits with 'from' and 'until'.",
    vocab: [
      { id: "l4-1", japanese: "おきます", kanji: "起きます", romaji: "okimasu", english: "Get up / Wake up", bangla: "ঘুম থেকে উঠা" },
      { id: "l4-2", japanese: "ねます", kanji: "寝ます", romaji: "nemasu", english: "Go to bed / Sleep", bangla: "ঘুমানো" },
      { id: "l4-3", japanese: "はたらきます", kanji: "働きます", romaji: "hatarakimasu", english: "Work", bangla: "কাজ করা" },
      { id: "l4-4", japanese: "やすみます", kanji: "休みます", romaji: "yasumimasu", english: "Take a rest / Take holiday", bangla: "ছুটি নেওয়া / বিশ্রাম নেওয়া" },
      { id: "l4-5", japanese: "べんきょうします", kanji: "勉強します", romaji: "benkyoushimasu", english: "Study", bangla: "পড়াশোনা করা" },
      { id: "l4-6", japanese: "おわります", kanji: "終わります", romaji: "owarimasu", english: "Finish / End", bangla: "শেষ হওয়া" },
      { id: "l4-7", japanese: "びじゅつかん", kanji: "美術館", romaji: "bijutsukan", english: "Art museum", bangla: "চিত্রশালা" },
      { id: "l4-8", japanese: "としょかん", kanji: "図書館", romaji: "toshokan", english: "Library", bangla: "গ্রন্থাগার" },
      { id: "l4-9", japanese: "ゆうびんきょく", kanji: "郵便局", romaji: "yuubinkyoku", english: "Post office", bangla: "ডাকঘর" },
      { id: "l4-10", japanese: "ぎんこう", kanji: "銀行", romaji: "ginkou", english: "Bank", bangla: "ব্যাংক" },
      { id: "l4-11", japanese: "おととい", romaji: "ototoi", english: "Day before yesterday", bangla: "গতপরশু" },
      { id: "l4-12", japanese: "きのう", kanji: "昨日", romaji: "kinou", english: "Yesterday", bangla: "গতকাল" },
      { id: "l4-13", japanese: "きょう", kanji: "今日", romaji: "kyou", english: "Today", bangla: "আজ" },
      { id: "l4-14", japanese: "あした", kanji: "明日", romaji: "ashita", english: "Tomorrow", bangla: "আগামীকাল" },
      { id: "l4-15", japanese: "あさって", romaji: "asatte", english: "Day after tomorrow", bangla: "আগামী পরশু" }
    ],
    grammar: [
      {
        title: "Polite Verb Tenses (ます / ません)",
        formula: "Verb Formulations",
        explanation: "Japanese verbs end in 'ます' (masu) in positive present/future tense. Change 'ます' to 'ません' (masen) for negative, 'ました' (mashita) for past positive, and 'ませんでした' (masendeshita) for past negative.",
        examples: [
          { japanese: "わたし は べんきょうします。", english: "I study / I will study.", bangla: "আমি পড়াশোনা করি।" },
          { japanese: "きのう べんきょうしました。", english: "I studied yesterday.", bangla: "গতকাল পড়াশোনা করেছিলাম।" },
          { japanese: "あした は はたらきません。", english: "I will not work tomorrow.", bangla: "আগামীকাল কাজ করবো না।" }
        ]
      },
      {
        title: "Noun (Time) に Verb",
        formula: "[Time] に + Verb",
        explanation: "The particle 'に' (ni) indicates the specific point in time at which an action occurs. Use with specific numerical times, days of the week, but NOT relative terms like 'today' or 'tomorrow'.",
        examples: [
          { japanese: "６じはん に おきます。", english: "I wake up at 6:30.", bangla: "আমি সাড়ে ৬ টায় ঘুম থেকে উঠি।" }
        ]
      },
      {
        title: "Noun から Noun まで",
        formula: "N1 から N2 まで",
        explanation: "'から' (kara) means 'from' (starting point) and 'まで' (made) means 'until/to' (limit). This can be used for both time and space.",
        examples: [
          { japanese: "９じ から ５じ まで はたらきます。", english: "I work from 9 to 5.", bangla: "আমি ৯ টা থেকে ৫ টা পর্যন্ত কাজ করি।" }
        ]
      }
    ]
  },
  {
    id: "lesson-5",
    title: "Lesson 5: Direction & Transit",
    japaneseTitle: "第5課: いきます・きます",
    level: "N5",
    description: "Learn how to state directions of travel, indicate means of transit, and specify companions.",
    vocab: [
      { id: "l5-1", japanese: "いきます", kanji: "行きます", romaji: "ikimasu", english: "Go", bangla: "যাওয়া" },
      { id: "l5-2", japanese: "きます", kanji: "来ます", romaji: "kimasu", english: "Come", bangla: "আসা" },
      { id: "l5-3", japanese: "かえります", kanji: "帰ります", romaji: "kaerimasu", english: "Return home", bangla: "ফিরে যাওয়া / বাড়িতে ফেরা" },
      { id: "l5-4", japanese: "がっこう", kanji: "学校", romaji: "gakkou", english: "School", bangla: "বিদ্যালয়" },
      { id: "l5-5", japanese: "スーパー", romaji: "su-pa-", english: "Supermarket", bangla: "সুপারমার্কেট" },
      { id: "l5-6", japanese: "えき", kanji: "駅", romaji: "eki", english: "Station", bangla: "স্টেশন" },
      { id: "l5-7", japanese: "ひこうき", kanji: "飛行機", romaji: "hikouki", english: "Airplane", bangla: "উড়োজাহাজ" },
      { id: "l5-8", japanese: "ふね", kanji: "船", romaji: "fune", english: "Ship", bangla: "জাহাজ" },
      { id: "l5-9", japanese: "でんしゃ", kanji: "電車", romaji: "densha", english: "Train / Electric train", bangla: "বৈদ্যুতিক ট্রেন" },
      { id: "l5-10", japanese: "ちかてつ", kanji: "地下鉄", romaji: "chikatetsu", english: "Subway / Underground transit", bangla: "পাতাল রেল" },
      { id: "l5-11", japanese: "じてんしゃ", kanji: "自転車", romaji: "jitensha", english: "Bicycle", bangla: "সাইকেল" },
      { id: "l5-12", japanese: "あるいて", kanji: "歩いて", romaji: "aruite", english: "On foot / Walking", bangla: "পায়ে হেঁটে" },
      { id: "l5-13", japanese: "ともだち", kanji: "友達", romaji: "tomodachi", english: "Friend", bangla: "বন্ধু" },
      { id: "l5-14", japanese: "ひとりで", kanji: "一人で", romaji: "hitoride", english: "Alone / By oneself", bangla: "একা একা" },
      { id: "l5-15", japanese: "たんじょうび", kanji: "誕生日", romaji: "tanjoubi", english: "Birthday", bangla: "জন্মদিন" }
    ],
    grammar: [
      {
        title: "Place へ いきます / きます / かえります",
        formula: "[Place] へ + [Verb of Movement]",
        explanation: "The particle 'へ' (pronounced 'e') indicates the direction of travel toward a destination.",
        examples: [
          { japanese: "にほん へ いきます。", english: "I am going to Japan.", bangla: "আমি জাপানে যাচ্ছি।" },
          { japanese: "うち へ かえります。", english: "I am returning home.", bangla: "আমি বাসায় ফিরে যাচ্ছি।" }
        ]
      },
      {
        title: "Vehicle で いきます",
        formula: "[Vehicle] で + [Movement Verb]",
        explanation: "The particle 'で' (de) indicates the means or tool of action—here, the transit vehicle used. Do not use with 'あるいて' (on foot) which is already an adverbial phrase.",
        examples: [
          { japanese: "でんしゃ で いきます。", english: "I will go by train.", bangla: "আমি ট্রেনে করে যাব।" },
          { japanese: "あるいて がっこう へ いきます。", english: "I walk to school (no 'de').", bangla: "আমি পায়ে হেঁটে স্কুলে যাই।" }
        ]
      },
      {
        title: "Companion と いきます",
        formula: "[Person / Animal] と + [Movement Verb]",
        explanation: "The particle 'と' (to) indicates companionship, translating to 'with'.",
        examples: [
          { japanese: "ともだち と にほん へ きました。", english: "I came to Japan with a friend.", bangla: "আমি বন্ধুর সাথে জাপানে এসেছি।" }
        ]
      }
    ]
  },
  {
    id: "lesson-6",
    title: "Lesson 6: Direct Objects & Activities",
    japaneseTitle: "第6課: ごはんをたべます",
    level: "N5",
    description: "Learn how to state what you eat, drink, read, buy, or do, specify locations of actions, and make invitations.",
    vocab: [
      { id: "l6-1", japanese: "たべます", kanji: "食べます", romaji: "tabemasu", english: "Eat", bangla: "খাওয়া" },
      { id: "l6-2", japanese: "のみます", kanji: "飲みます", romaji: "nomimasu", english: "Drink / Take medicine", bangla: "পান করা" },
      { id: "l6-3", japanese: "すいます", kanji: "吸います", romaji: "suimasu", english: "Smoke [a cigarette]", bangla: "ধূমপান করা" },
      { id: "l6-4", japanese: "みます", kanji: "見ます", romaji: "mimasu", english: "See / Watch / Look at", bangla: "দেখা" },
      { id: "l6-5", japanese: "ききます", kanji: "聞きます", romaji: "kikimasu", english: "Hear / Listen to", bangla: "শোনা" },
      { id: "l6-6", japanese: "よみます", kanji: "読みます", romaji: "yomimasu", english: "Read", bangla: "পড়া" },
      { id: "l6-7", japanese: "かきます", kanji: "書きます", romaji: "kakimasu", english: "Write / Draw", bangla: "লেখা" },
      { id: "l6-8", japanese: "かいます", kanji: "買います", romaji: "kaimasu", english: "Buy", bangla: "ক্রয় করা" },
      { id: "l6-9", japanese: "とります", kanji: "取ります", romaji: "torimasu", english: "Take [a photograph]", bangla: "তোলা [ছবি]" },
      { id: "l6-10", japanese: "します", romaji: "shimasu", english: "Do / Play [sports / games]", bangla: "করা / খেলা" },
      { id: "l6-11", japanese: "あいます", kanji: "会います", romaji: "aimasu", english: "Meet [a friend]", bangla: "দেখা করা / সাক্ষাৎ করা" },
      { id: "l6-12", japanese: "ごはん", romaji: "gohan", english: "Meal / Cooked rice", bangla: "ভাত / খাবার" },
      { id: "l6-13", japanese: "みず", kanji: "水", romaji: "mizu", english: "Water", bangla: "পানি" },
      { id: "l6-14", japanese: "おちゃ", kanji: "お茶", romaji: "ocha", english: "Green tea / Tea", bangla: "চা / সবুজ চা" },
      { id: "l6-15", japanese: "えいが", kanji: "映画", romaji: "eiga", english: "Movie / Film", bangla: "চলচ্চিত্র" }
    ],
    grammar: [
      {
        title: "Noun を Verb (Direct Object)",
        formula: "N を + [Transitive Verb]",
        explanation: "The particle 'を' (pronounced 'o') marks the direct object of a transitive action.",
        examples: [
          { japanese: "ごはん を たべます。", english: "I eat rice / a meal.", bangla: "আমি ভাত খাই।" },
          { japanese: "みず を のみます。", english: "I drink water.", bangla: "আমি পানি পান করি।" }
        ]
      },
      {
        title: "Noun を します",
        formula: "N を します",
        explanation: "Used to mean 'play' sports/games, or 'do' actions like homework or business.",
        examples: [
          { japanese: "サッカー を します。", english: "I play soccer.", bangla: "আমি ফুটবল খেলি।" },
          { japanese: "しゅくだい を します。", english: "I do my homework.", bangla: "আমি বাড়ির কাজ করি।" }
        ]
      },
      {
        title: "Place で Verb",
        formula: "[Place] で + [Verb]",
        explanation: "The particle 'で' (de) marks the physical location where an active event or action takes place.",
        examples: [
          { japanese: "えき で しんぶん を かいました。", english: "I bought a newspaper at the station.", bangla: "আমি স্টেশনে খবরের কাগজ কিনেছিলাম।" }
        ]
      },
      {
        title: "Inviting: ~ませんか / ~ましょう",
        formula: "V ませんか / V ましょう",
        explanation: "'~ませんか' (masenka) invites someone politely ('Won't you do...?'). '~ましょう' (mashou) suggests 'Let's do...!' in response.",
        examples: [
          { japanese: "いっしょに にほんご を べんきょうしませんか。", english: "Won't you study Japanese with me?", bangla: "একত্রে জাপানি ভাষা শিখবেন নাকি?" },
          { japanese: "ええ、べんきょうしましょう。", english: "Yes, let's study!", bangla: "হ্যাঁ, চলুন শিখি।" }
        ]
      }
    ]
  }
];

export const QUIZZES: Quiz[] = [
  {
    id: "n5-quiz-1",
    title: "JLPT N5 Model Test: Vocabulary",
    level: "N5",
    questions: [
      {
        id: "q1",
        question: "くつに 石 が 入っていました。 Underlined word: 石",
        choices: ["いし", "すな", "くさ", "えだ"],
        correctIndex: 0,
        explanation: "石 represents 'stone' which is read as 'いし' (ishi) in Hiragana."
      },
      {
        id: "q2",
        question: "きょうは 土曜日 です。 Underlined word: 土曜日",
        choices: ["にちようび", "どようび", "かようび", "きんようび"],
        correctIndex: 1,
        explanation: "土曜日 corresponds to Saturday and is read as 'どようび' (doyoubi)."
      },
      {
        id: "q3",
        question: "あした どこへ いきますか。 Underlined word: あした",
        choices: ["まいにち", "きょう", "きのう", "あした"],
        correctIndex: 3,
        explanation: "あした corresponds to 'tomorrow' which is written in Kanji as '明日'."
      },
      {
        id: "q4",
        question: "ごはんを 食べ のあとで こうえんへ さんぽに いきます。 Underlined word: 食べ",
        choices: ["たべ", "のみ", "すい", "よみ"],
        correctIndex: 0,
        explanation: "食べ represents 'eating' which is written as 'たべ' (tabe)."
      },
      {
        id: "q5",
        question: "2020の 七月 ににほんへいきたいです。 Underlined word: 七月",
        choices: ["しちがつ", "らいげつ", "こんげつ", "しちかげつ"],
        correctIndex: 0,
        explanation: "七月 is the month of July, pronounced as 'しちがつ' (shichigatsu)."
      }
    ]
  }
];
