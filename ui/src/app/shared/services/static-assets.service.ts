import { Injectable } from '@angular/core';

export interface CitiesListInterface {
  name: string;
  value: string;
}
export interface CarsListInterface {
  id: number | null;
  make: string;
  models: Array<{ makeId: string; name: string }>;
}
export interface LanguagesListInterface {
  name: string;
  value: string;
  prefix: string;
}

export type CarMakeType = { name: string; makeId: string };

@Injectable({
  providedIn: 'root',
})
export class StaticAssetsService {
  static languagesList: LanguagesListInterface[] = [
    {
      name: 'English',
      value: 'English',
      prefix: 'en',
    },
    {
      name: 'Ukrainian',
      value: 'Ukrainian',
      prefix: 'ua',
    },
  ];
  static citiesList: CitiesListInterface[] = [
    {
      name: 'Avdiivka',
      value: 'Avdiivka',
    },
    {
      name: 'Almazna',
      value: 'Almazna',
    },
    {
      name: 'Alupka',
      value: 'Alupka',
    },
    {
      name: 'Alushta',
      value: 'Alushta',
    },
    {
      name: 'Alchevsk',
      value: 'Alchevsk',
    },
    {
      name: 'Amvrosiivka',
      value: 'Amvrosiivka',
    },
    {
      name: 'Ananiv',
      value: 'Ananiv',
    },
    {
      name: 'Andrushivka',
      value: 'Andrushivka',
    },
    {
      name: 'Antratsyt',
      value: 'Antratsyt',
    },
    {
      name: 'Apostolove',
      value: 'Apostolove',
    },
    {
      name: 'Armiansk',
      value: 'Armiansk',
    },
    {
      name: 'Artsyz',
      value: 'Artsyz',
    },
    {
      name: 'Balakliia',
      value: 'Balakliia',
    },
    {
      name: 'Balta',
      value: 'Balta',
    },
    {
      name: 'Bar',
      value: 'Bar',
    },
    {
      name: 'Baranivka',
      value: 'Baranivka',
    },
    {
      name: 'Barvinkove',
      value: 'Barvinkove',
    },
    {
      name: 'Baturyn',
      value: 'Baturyn',
    },
    {
      name: 'Bakhmach',
      value: 'Bakhmach',
    },
    {
      name: 'Bakhmut',
      value: 'Bakhmut',
    },
    {
      name: 'Bakhchysarai',
      value: 'Bakhchysarai',
    },
    {
      name: 'Bashtanka',
      value: 'Bashtanka',
    },
    {
      name: 'Belz',
      value: 'Belz',
    },
    {
      name: 'Berdychiv',
      value: 'Berdychiv',
    },
    {
      name: 'Berdyansk',
      value: 'Berdyansk',
    },
    {
      name: 'Berehove',
      value: 'Berehove',
    },
    {
      name: 'Berezhany',
      value: 'Berezhany',
    },
    {
      name: 'Berezan',
      value: 'Berezan',
    },
    {
      name: 'Berezivka',
      value: 'Berezivka',
    },
    {
      name: 'Berezne',
      value: 'Berezne',
    },
    {
      name: 'Berestechko',
      value: 'Berestechko',
    },
    {
      name: 'Beryslav',
      value: 'Beryslav',
    },
    {
      name: 'Bershad',
      value: 'Bershad',
    },
    {
      name: 'Bibrka',
      value: 'Bibrka',
    },
    {
      name: 'Bila Tserkva',
      value: 'Bila Tserkva',
    },
    {
      name: 'Bilhorod-Dnistrovskyi',
      value: 'Bilhorod-Dnistrovskyi',
    },
    {
      name: 'Bilytske',
      value: 'Bilytske',
    },
    {
      name: 'Bilohirsk',
      value: 'Bilohirsk',
    },
    {
      name: 'Bilozerka',
      value: 'Bilozerka',
    },
    {
      name: 'Bilopillia',
      value: 'Bilopillia',
    },
    {
      name: 'Biliaivka',
      value: 'Biliaivka',
    },
    {
      name: 'Blahovishchenske',
      value: 'Blahovishchenske',
    },
    {
      name: 'Bobrynets',
      value: 'Bobrynets',
    },
    {
      name: 'Bobrovytsia',
      value: 'Bobrovytsia',
    },
    {
      name: 'Bohodukhiv',
      value: 'Bohodukhiv',
    },
    {
      name: 'Bohuslav',
      value: 'Bohuslav',
    },
    {
      name: 'Bokovo-Khrustalne',
      value: 'Bokovo-Khrustalne',
    },
    {
      name: 'Bolhrad',
      value: 'Bolhrad',
    },
    {
      name: 'Bolekhiv',
      value: 'Bolekhiv',
    },
    {
      name: 'Borzna',
      value: 'Borzna',
    },
    {
      name: 'Boryslav',
      value: 'Boryslav',
    },
    {
      name: 'Boryspil',
      value: 'Boryspil',
    },
    {
      name: 'Borshchiv',
      value: 'Borshchiv',
    },
    {
      name: 'Boiarka',
      value: 'Boiarka',
    },
    {
      name: 'Brovary',
      value: 'Brovary',
    },
    {
      name: 'Brody',
      value: 'Brody',
    },
    {
      name: 'Brianka',
      value: 'Brianka',
    },
    {
      name: 'Bunge',
      value: 'Bunge',
    },
    {
      name: 'Buryn',
      value: 'Buryn',
    },
    {
      name: 'Burshtyn',
      value: 'Burshtyn',
    },
    {
      name: 'Busk',
      value: 'Busk',
    },
    {
      name: 'Bucha',
      value: 'Bucha',
    },
    {
      name: 'Buchach',
      value: 'Buchach',
    },
    {
      name: 'Valky',
      value: 'Valky',
    },
    {
      name: 'Varash',
      value: 'Varash',
    },
    {
      name: 'Vasylivka',
      value: 'Vasylivka',
    },
    {
      name: 'Vasylkiv',
      value: 'Vasylkiv',
    },
    {
      name: 'Vatutine',
      value: 'Vatutine',
    },
    {
      name: 'Vashkivtsi',
      value: 'Vashkivtsi',
    },
    {
      name: 'Velyki Mosty',
      value: 'Velyki Mosty',
    },
    {
      name: 'Verkhivtseve',
      value: 'Verkhivtseve',
    },
    {
      name: 'Verkhnodniprovsk',
      value: 'Verkhnodniprovsk',
    },
    {
      name: 'Vyzhnytsia',
      value: 'Vyzhnytsia',
    },
    {
      name: 'Vylkove',
      value: 'Vylkove',
    },
    {
      name: 'Vynnyky',
      value: 'Vynnyky',
    },
    {
      name: 'Vynohradiv',
      value: 'Vynohradiv',
    },
    {
      name: 'Vyshhorod',
      value: 'Vyshhorod',
    },
    {
      name: 'Vyshneve',
      value: 'Vyshneve',
    },
    {
      name: 'Vilnohirsk',
      value: 'Vilnohirsk',
    },
    {
      name: 'Vilniansk',
      value: 'Vilniansk',
    },
    {
      name: 'Vinnytsia',
      value: 'Vinnytsia',
    },
    {
      name: 'Vovchansk',
      value: 'Vovchansk',
    },
    {
      name: 'Voznesenivka',
      value: 'Voznesenivka',
    },
    {
      name: 'Voznesensk',
      value: 'Voznesensk',
    },
    {
      name: 'Volnovakha',
      value: 'Volnovakha',
    },
    {
      name: 'Volodymyr',
      value: 'Volodymyr',
    },
    {
      name: 'Volochysk',
      value: 'Volochysk',
    },
    {
      name: 'Vorozhba',
      value: 'Vorozhba',
    },
    {
      name: 'Vuhlehirsk',
      value: 'Vuhlehirsk',
    },
    {
      name: 'Vuhledar',
      value: 'Vuhledar',
    },
    {
      name: 'Hadiach',
      value: 'Hadiach',
    },
    {
      name: 'Haivoron',
      value: 'Haivoron',
    },
    {
      name: 'Haisyn',
      value: 'Haisyn',
    },
    {
      name: 'Halych',
      value: 'Halych',
    },
    {
      name: 'Henichesk',
      value: 'Henichesk',
    },
    {
      name: 'Hertsa',
      value: 'Hertsa',
    },
    {
      name: 'Hirnyk',
      value: 'Hirnyk',
    },
    {
      name: 'Hirske',
      value: 'Hirske',
    },
    {
      name: 'Hlynyany',
      value: 'Hlynyany',
    },
    {
      name: 'Hlobyne',
      value: 'Hlobyne',
    },
    {
      name: 'Hlukhiv',
      value: 'Hlukhiv',
    },
    {
      name: 'Hnivan',
      value: 'Hnivan',
    },
    {
      name: 'Hola Prystan',
      value: 'Hola Prystan',
    },
    {
      name: 'Holubivka',
      value: 'Holubivka',
    },
    {
      name: 'Horishni Plavni',
      value: 'Horishni Plavni',
    },
    {
      name: 'Horlivka',
      value: 'Horlivka',
    },
    {
      name: 'Horodenka',
      value: 'Horodenka',
    },
    {
      name: 'Horodyshche',
      value: 'Horodyshche',
    },
    {
      name: 'Horodnia',
      value: 'Horodnia',
    },
    {
      name: 'Horodok',
      value: 'Horodok',
    },
    {
      name: 'Horokhiv',
      value: 'Horokhiv',
    },
    {
      name: 'Hrebinka',
      value: 'Hrebinka',
    },
    {
      name: 'Huliaipole',
      value: 'Huliaipole',
    },
    {
      name: 'Debaltseve',
      value: 'Debaltseve',
    },
    {
      name: 'Derazhnia',
      value: 'Derazhnia',
    },
    {
      name: 'Derhachi',
      value: 'Derhachi',
    },
    {
      name: 'Dzhankoi',
      value: 'Dzhankoi',
    },
    {
      name: 'Dnipro',
      value: 'Dnipro',
    },
    {
      name: 'Dniprorudne',
      value: 'Dniprorudne',
    },
    {
      name: 'Dobromyl',
      value: 'Dobromyl',
    },
    {
      name: 'Dobropillia',
      value: 'Dobropillia',
    },
    {
      name: 'Dovzhansk',
      value: 'Dovzhansk',
    },
    {
      name: 'Dokuchaievsk',
      value: 'Dokuchaievsk',
    },
    {
      name: 'Dolyna',
      value: 'Dolyna',
    },
    {
      name: 'Dolynska',
      value: 'Dolynska',
    },
    {
      name: 'Donetsk',
      value: 'Donetsk',
    },
    {
      name: 'Drohobych',
      value: 'Drohobych',
    },
    {
      name: 'Druzhba',
      value: 'Druzhba',
    },
    {
      name: 'Druzhkivka',
      value: 'Druzhkivka',
    },
    {
      name: 'Dubliany',
      value: 'Dubliany',
    },
    {
      name: 'Dubno',
      value: 'Dubno',
    },
    {
      name: 'Dubrovitsa',
      value: 'Dubrovitsa',
    },
    {
      name: 'Dunaivtsi',
      value: 'Dunaivtsi',
    },
    {
      name: 'Enerhodar',
      value: 'Enerhodar',
    },
    {
      name: 'Yevpatoriia',
      value: 'Yevpatoriia',
    },
    {
      name: 'Yenakiieve',
      value: 'Yenakiieve',
    },
    {
      name: 'Zhashkiv',
      value: 'Zhashkiv',
    },
    {
      name: 'Zhdanivka',
      value: 'Zhdanivka',
    },
    {
      name: 'Zhydachiv',
      value: 'Zhydachiv',
    },
    {
      name: 'Zhytomyr',
      value: 'Zhytomyr',
    },
    {
      name: 'Zhmerynka',
      value: 'Zhmerynka',
    },
    {
      name: 'Zhovkva',
      value: 'Zhovkva',
    },
    {
      name: 'Zhovti Vody',
      value: 'Zhovti Vody',
    },
    {
      name: 'Zavodske',
      value: 'Zavodske',
    },
    {
      name: 'Zalizne',
      value: 'Zalizne',
    },
    {
      name: 'Zalishchyky',
      value: 'Zalishchyky',
    },
    {
      name: 'Zaporizhzhia',
      value: 'Zaporizhzhia',
    },
    {
      name: 'Zastavna',
      value: 'Zastavna',
    },
    {
      name: 'Zbarazh',
      value: 'Zbarazh',
    },
    {
      name: 'Zboriv',
      value: 'Zboriv',
    },
    {
      name: 'Zvenyhorodka',
      value: 'Zvenyhorodka',
    },
    {
      name: 'Zviahel',
      value: 'Zviahel',
    },
    {
      name: 'Zdolbuniv',
      value: 'Zdolbuniv',
    },
    {
      name: 'Zelenodolsk',
      value: 'Zelenodolsk',
    },
    {
      name: 'Zymohiria',
      value: 'Zymohiria',
    },
    {
      name: 'Zinkiv',
      value: 'Zinkiv',
    },
    {
      name: 'Zmiiv',
      value: 'Zmiiv',
    },
    {
      name: 'Znamianka',
      value: 'Znamianka',
    },
    {
      name: 'Zolote',
      value: 'Zolote',
    },
    {
      name: 'Zolotonosha',
      value: 'Zolotonosha',
    },
    {
      name: 'Zolochiv',
      value: 'Zolochiv',
    },
    {
      name: 'Zorynsk',
      value: 'Zorynsk',
    },
    {
      name: 'Zuhres',
      value: 'Zuhres',
    },
    {
      name: 'Ivano-Frankivsk',
      value: 'Ivano-Frankivsk',
    },
    {
      name: 'Izmail',
      value: 'Izmail',
    },
    {
      name: 'Izium',
      value: 'Izium',
    },
    {
      name: 'Iziaslav',
      value: 'Iziaslav',
    },
    {
      name: 'Illintsi',
      value: 'Illintsi',
    },
    {
      name: 'Ilovaisk',
      value: 'Ilovaisk',
    },
    {
      name: 'Inkerman',
      value: 'Inkerman',
    },
    {
      name: 'Irmino',
      value: 'Irmino',
    },
    {
      name: 'Irpin',
      value: 'Irpin',
    },
    {
      name: 'Irshava',
      value: 'Irshava',
    },
    {
      name: 'Ichnia',
      value: 'Ichnia',
    },
    {
      name: 'Kaharlyk',
      value: 'Kaharlyk',
    },
    {
      name: 'Kadiivka',
      value: 'Kadiivka',
    },
    {
      name: 'Kalynivka',
      value: 'Kalynivka',
    },
    {
      name: 'Kalush',
      value: 'Kalush',
    },
    {
      name: 'Kalmiuske',
      value: 'Kalmiuske',
    },
    {
      name: 'Kamin-Kashyrskyi',
      value: 'Kamin-Kashyrskyi',
    },
    {
      name: 'Kamianets-Podilskyi',
      value: 'Kamianets-Podilskyi',
    },
    {
      name: 'Kamianka',
      value: 'Kamianka',
    },
    {
      name: 'Kamianka-Buzka',
      value: 'Kamianka-Buzka',
    },
    {
      name: 'Kamianka-Dniprovska',
      value: 'Kamianka-Dniprovska',
    },
    {
      name: 'Kamianske',
      value: 'Kamianske',
    },
    {
      name: 'Kaniv',
      value: 'Kaniv',
    },
    {
      name: 'Karlivka',
      value: 'Karlivka',
    },
    {
      name: 'Kakhovka',
      value: 'Kakhovka',
    },
    {
      name: 'Kerch',
      value: 'Kerch',
    },
    {
      name: 'Kyiv',
      value: 'Kyiv',
    },
    {
      name: 'Kypuche',
      value: 'Kypuche',
    },
    {
      name: 'Kivertsi',
      value: 'Kivertsi',
    },
    {
      name: 'Kiliia',
      value: 'Kiliia',
    },
    {
      name: 'Kitsman',
      value: 'Kitsman',
    },
    {
      name: 'Kobeliaky',
      value: 'Kobeliaky',
    },
    {
      name: 'Kovel',
      value: 'Kovel',
    },
    {
      name: 'Kodyma',
      value: 'Kodyma',
    },
    {
      name: 'Koziatyn',
      value: 'Koziatyn',
    },
    {
      name: 'Kolomyia',
      value: 'Kolomyia',
    },
    {
      name: 'Komarno',
      value: 'Komarno',
    },
    {
      name: 'Konotop',
      value: 'Konotop',
    },
    {
      name: 'Kopychyntsi',
      value: 'Kopychyntsi',
    },
    {
      name: 'Korets',
      value: 'Korets',
    },
    {
      name: 'Korosten',
      value: 'Korosten',
    },
    {
      name: 'Korostyshiv',
      value: 'Korostyshiv',
    },
    {
      name: 'Korsun-Shevchenkivskyi',
      value: 'Korsun-Shevchenkivskyi',
    },
    {
      name: 'Koriukivka',
      value: 'Koriukivka',
    },
    {
      name: 'Kosiv',
      value: 'Kosiv',
    },
    {
      name: 'Kostopil',
      value: 'Kostopil',
    },
    {
      name: 'Kostiantynivka',
      value: 'Kostiantynivka',
    },
    {
      name: 'Kramatorsk',
      value: 'Kramatorsk',
    },
    {
      name: 'Krasyliv',
      value: 'Krasyliv',
    },
    {
      name: 'Krasnohorivka',
      value: 'Krasnohorivka',
    },
    {
      name: 'Krasnohrad',
      value: 'Krasnohrad',
    },
    {
      name: 'Kremenets',
      value: 'Kremenets',
    },
    {
      name: 'Kremenchuk',
      value: 'Kremenchuk',
    },
    {
      name: 'Kreminna',
      value: 'Kreminna',
    },
    {
      name: 'Kryvyi Rih',
      value: 'Kryvyi Rih',
    },
    {
      name: 'Krolevets',
      value: 'Krolevets',
    },
    {
      name: 'Kropyvnytskyi',
      value: 'Kropyvnytskyi',
    },
    {
      name: 'Kupiansk',
      value: 'Kupiansk',
    },
    {
      name: 'Kurakhove',
      value: 'Kurakhove',
    },
    {
      name: 'Ladyzhyn',
      value: 'Ladyzhyn',
    },
    {
      name: 'Lanivtsi',
      value: 'Lanivtsi',
    },
    {
      name: 'Lebedyn',
      value: 'Lebedyn',
    },
    {
      name: 'Lyman',
      value: 'Lyman',
    },
    {
      name: 'Lypovets',
      value: 'Lypovets',
    },
    {
      name: 'Lysychansk',
      value: 'Lysychansk',
    },
    {
      name: 'Lozova',
      value: 'Lozova',
    },
    {
      name: 'Lokhvytsia',
      value: 'Lokhvytsia',
    },
    {
      name: 'Lubny',
      value: 'Lubny',
    },
    {
      name: 'Luhansk',
      value: 'Luhansk',
    },
    {
      name: 'Lutuhyne',
      value: 'Lutuhyne',
    },
    {
      name: 'Lutsk',
      value: 'Lutsk',
    },
    {
      name: 'Lviv',
      value: 'Lviv',
    },
    {
      name: 'Liuboml',
      value: 'Liuboml',
    },
    {
      name: 'Liubotyn',
      value: 'Liubotyn',
    },
    {
      name: 'Makiivka',
      value: 'Makiivka',
    },
    {
      name: 'Mala Vyska',
      value: 'Mala Vyska',
    },
    {
      name: 'Malyn',
      value: 'Malyn',
    },
    {
      name: 'Marhanets',
      value: 'Marhanets',
    },
    {
      name: 'Mariupol',
      value: 'Mariupol',
    },
    {
      name: 'Mariinka',
      value: 'Mariinka',
    },
    {
      name: 'Melitopol',
      value: 'Melitopol',
    },
    {
      name: 'Mena',
      value: 'Mena',
    },
    {
      name: 'Merefa',
      value: 'Merefa',
    },
    {
      name: 'Mykolaiv',
      value: 'Mykolaiv',
    },
    {
      name: 'Mykolaiv',
      value: 'Mykolaiv',
    },
    {
      name: 'Mykolaivka',
      value: 'Mykolaivka',
    },
    {
      name: 'Myrhorod',
      value: 'Myrhorod',
    },
    {
      name: 'Myrnohrad',
      value: 'Myrnohrad',
    },
    {
      name: 'Myronivka',
      value: 'Myronivka',
    },
    {
      name: 'Miusynsk',
      value: 'Miusynsk',
    },
    {
      name: 'Mohyliv-Podilskyi',
      value: 'Mohyliv-Podilskyi',
    },
    {
      name: 'Molodohvardiisk',
      value: 'Molodohvardiisk',
    },
    {
      name: 'Molochansk',
      value: 'Molochansk',
    },
    {
      name: 'Monastyryska',
      value: 'Monastyryska',
    },
    {
      name: 'Monastyryshche',
      value: 'Monastyryshche',
    },
    {
      name: 'Morshyn',
      value: 'Morshyn',
    },
    {
      name: 'Mospyne',
      value: 'Mospyne',
    },
    {
      name: 'Mostyska',
      value: 'Mostyska',
    },
    {
      name: 'Mukachevo',
      value: 'Mukachevo',
    },
    {
      name: 'Nadvirna',
      value: 'Nadvirna',
    },
    {
      name: 'Nemyriv',
      value: 'Nemyriv',
    },
    {
      name: 'Netishyn',
      value: 'Netishyn',
    },
    {
      name: 'Nizhyn',
      value: 'Nizhyn',
    },
    {
      name: 'Nikopol',
      value: 'Nikopol',
    },
    {
      name: 'Nova Kakhovka',
      value: 'Nova Kakhovka',
    },
    {
      name: 'Nova Odesa',
      value: 'Nova Odesa',
    },
    {
      name: 'Novhorod-Siverskyi',
      value: 'Novhorod-Siverskyi',
    },
    {
      name: 'Novyi Buh',
      value: 'Novyi Buh',
    },
    {
      name: 'Novyi Kalyniv',
      value: 'Novyi Kalyniv',
    },
    {
      name: 'Novyi Rozdil',
      value: 'Novyi Rozdil',
    },
    {
      name: 'Novoazovsk',
      value: 'Novoazovsk',
    },
    {
      name: 'Novovolynsk',
      value: 'Novovolynsk',
    },
    {
      name: 'Novohrodivka',
      value: 'Novohrodivka',
    },
    {
      name: 'Novodnistrovsk',
      value: 'Novodnistrovsk',
    },
    {
      name: 'Novodruzhesk',
      value: 'Novodruzhesk',
    },
    {
      name: 'Novomyrhorod',
      value: 'Novomyrhorod',
    },
    {
      name: 'Novomoskovsk',
      value: 'Novomoskovsk',
    },
    {
      name: 'Novoselytsia',
      value: 'Novoselytsia',
    },
    {
      name: 'Novoukrainka',
      value: 'Novoukrainka',
    },
    {
      name: 'Novoiavorivsk',
      value: 'Novoiavorivsk',
    },
    {
      name: 'Nosivka',
      value: 'Nosivka',
    },
    {
      name: 'Obukhiv',
      value: 'Obukhiv',
    },
    {
      name: 'Ovruch',
      value: 'Ovruch',
    },
    {
      name: 'Odesa',
      value: 'Odesa',
    },
    {
      name: 'Olevsk',
      value: 'Olevsk',
    },
    {
      name: 'Oleksandrivsk',
      value: 'Oleksandrivsk',
    },
    {
      name: 'Oleksandriia',
      value: 'Oleksandriia',
    },
    {
      name: 'Oleshky',
      value: 'Oleshky',
    },
    {
      name: 'Orikhiv',
      value: 'Orikhiv',
    },
    {
      name: 'Oster',
      value: 'Oster',
    },
    {
      name: 'Ostroh',
      value: 'Ostroh',
    },
    {
      name: 'Okhtyrka',
      value: 'Okhtyrka',
    },
    {
      name: 'Ochakiv',
      value: 'Ochakiv',
    },
    {
      name: 'Pavlohrad',
      value: 'Pavlohrad',
    },
    {
      name: 'Pervomaisk',
      value: 'Pervomaisk',
    },
    {
      name: 'Pervomaisk',
      value: 'Pervomaisk',
    },
    {
      name: 'Pervomaiskyi',
      value: 'Pervomaiskyi',
    },
    {
      name: 'Perevalsk',
      value: 'Perevalsk',
    },
    {
      name: 'Peremyshliany',
      value: 'Peremyshliany',
    },
    {
      name: 'Perechyn',
      value: 'Perechyn',
    },
    {
      name: 'Pereshchepyne',
      value: 'Pereshchepyne',
    },
    {
      name: 'Pereiaslav',
      value: 'Pereiaslav',
    },
    {
      name: 'Pershotravensk',
      value: 'Pershotravensk',
    },
    {
      name: 'Petrovo-Krasnosillia',
      value: 'Petrovo-Krasnosillia',
    },
    {
      name: 'Pyriatyn',
      value: 'Pyriatyn',
    },
    {
      name: 'Pivdenne',
      value: 'Pivdenne',
    },
    {
      name: 'Pidhaitsi',
      value: 'Pidhaitsi',
    },
    {
      name: 'Pidhorodne',
      value: 'Pidhorodne',
    },
    {
      name: 'Pohrebyshche',
      value: 'Pohrebyshche',
    },
    {
      name: 'Podilsk',
      value: 'Podilsk',
    },
    {
      name: 'Pokrov',
      value: 'Pokrov',
    },
    {
      name: 'Pokrovsk',
      value: 'Pokrovsk',
    },
    {
      name: 'Pology',
      value: 'Pology',
    },
    {
      name: 'Polonne',
      value: 'Polonne',
    },
    {
      name: 'Poltava',
      value: 'Poltava',
    },
    {
      name: 'Pomichna',
      value: 'Pomichna',
    },
    {
      name: 'Popasna',
      value: 'Popasna',
    },
    {
      name: 'Pochaiv',
      value: 'Pochaiv',
    },
    {
      name: 'Pryvillia',
      value: 'Pryvillia',
    },
    {
      name: 'Pryluky',
      value: 'Pryluky',
    },
    {
      name: 'Prymorsk',
      value: 'Prymorsk',
    },
    {
      name: 'Prypiat',
      value: 'Prypiat',
    },
    {
      name: 'Pustomyty',
      value: 'Pustomyty',
    },
    {
      name: 'Putyvl',
      value: 'Putyvl',
    },
    {
      name: 'Piatykhatky',
      value: 'Piatykhatky',
    },
    {
      name: 'Rava-Ruska',
      value: 'Rava-Ruska',
    },
    {
      name: 'Radekhiv',
      value: 'Radekhiv',
    },
    {
      name: 'Radyvyliv',
      value: 'Radyvyliv',
    },
    {
      name: 'Radomyshl',
      value: 'Radomyshl',
    },
    {
      name: 'Rakhiv',
      value: 'Rakhiv',
    },
    {
      name: 'Reni',
      value: 'Reni',
    },
    {
      name: 'Reshetylivka',
      value: 'Reshetylivka',
    },
    {
      name: 'Rzhyshchiv',
      value: 'Rzhyshchiv',
    },
    {
      name: 'Rivne',
      value: 'Rivne',
    },
    {
      name: 'Rovenky',
      value: 'Rovenky',
    },
    {
      name: 'Rohatyn',
      value: 'Rohatyn',
    },
    {
      name: 'Rodynske',
      value: 'Rodynske',
    },
    {
      name: 'Rozhyshche',
      value: 'Rozhyshche',
    },
    {
      name: 'Rozdilna',
      value: 'Rozdilna',
    },
    {
      name: 'Romny',
      value: 'Romny',
    },
    {
      name: 'Rubizhne',
      value: 'Rubizhne',
    },
    {
      name: 'Rudky',
      value: 'Rudky',
    },
    {
      name: 'Saky',
      value: 'Saky',
    },
    {
      name: 'Sambir',
      value: 'Sambir',
    },
    {
      name: 'Sarny',
      value: 'Sarny',
    },
    {
      name: 'Svaliava',
      value: 'Svaliava',
    },
    {
      name: 'Svatove',
      value: 'Svatove',
    },
    {
      name: 'Svitlovodsk',
      value: 'Svitlovodsk',
    },
    {
      name: 'Svitlodarsk',
      value: 'Svitlodarsk',
    },
    {
      name: 'Sviatohirsk',
      value: 'Sviatohirsk',
    },
    {
      name: 'Sevastopol',
      value: 'Sevastopol',
    },
    {
      name: 'Selidove',
      value: 'Selidove',
    },
    {
      name: 'Semenivka',
      value: 'Semenivka',
    },
    {
      name: 'Seredyna-Buda',
      value: 'Seredyna-Buda',
    },
    {
      name: 'Siverskodonetsk',
      value: 'Siverskodonetsk',
    },
    {
      name: 'Synelnykove',
      value: 'Synelnykove',
    },
    {
      name: 'Siversk',
      value: 'Siversk',
    },
    {
      name: 'Simferopol',
      value: 'Simferopol',
    },
    {
      name: 'Skadovsk',
      value: 'Skadovsk',
    },
    {
      name: 'Skalat',
      value: 'Skalat',
    },
    {
      name: 'Skvyra',
      value: 'Skvyra',
    },
    {
      name: 'Skole',
      value: 'Skole',
    },
    {
      name: 'Slavuta',
      value: 'Slavuta',
    },
    {
      name: 'Slavutych',
      value: 'Slavutych',
    },
    {
      name: 'Sloviansk',
      value: 'Sloviansk',
    },
    {
      name: 'Smila',
      value: 'Smila',
    },
    {
      name: 'Snihurivka',
      value: 'Snihurivka',
    },
    {
      name: 'Snizhne',
      value: 'Snizhne',
    },
    {
      name: 'Snovsk',
      value: 'Snovsk',
    },
    {
      name: 'Sniatyn',
      value: 'Sniatyn',
    },
    {
      name: 'Sokal',
      value: 'Sokal',
    },
    {
      name: 'Sokyriany',
      value: 'Sokyriany',
    },
    {
      name: 'Soledar',
      value: 'Soledar',
    },
    {
      name: 'Sorokyne',
      value: 'Sorokyne',
    },
    {
      name: 'Sosnivka',
      value: 'Sosnivka',
    },
    {
      name: 'Staryi Krym',
      value: 'Staryi Krym',
    },
    {
      name: 'Staryi Sambir',
      value: 'Staryi Sambir',
    },
    {
      name: 'Starobilsk',
      value: 'Starobilsk',
    },
    {
      name: 'Starokostiantyniv',
      value: 'Starokostiantyniv',
    },
    {
      name: 'Stebnyk',
      value: 'Stebnyk',
    },
    {
      name: 'Storozhynets',
      value: 'Storozhynets',
    },
    {
      name: 'Stryi',
      value: 'Stryi',
    },
    {
      name: 'Sudak',
      value: 'Sudak',
    },
    {
      name: 'Sudova Vyshnia',
      value: 'Sudova Vyshnia',
    },
    {
      name: 'Sumy',
      value: 'Sumy',
    },
    {
      name: 'Sukhodilsk',
      value: 'Sukhodilsk',
    },
    {
      name: 'Tavriisk',
      value: 'Tavriisk',
    },
    {
      name: 'Talne',
      value: 'Talne',
    },
    {
      name: 'Tarashcha',
      value: 'Tarashcha',
    },
    {
      name: 'Tatarbunary',
      value: 'Tatarbunary',
    },
    {
      name: 'Teplodar',
      value: 'Teplodar',
    },
    {
      name: 'Terebovlia',
      value: 'Terebovlia',
    },
    {
      name: 'Ternivka',
      value: 'Ternivka',
    },
    {
      name: 'Ternopil',
      value: 'Ternopil',
    },
    {
      name: 'Tetiiv',
      value: 'Tetiiv',
    },
    {
      name: 'Tysmenytsia',
      value: 'Tysmenytsia',
    },
    {
      name: 'Tlumach',
      value: 'Tlumach',
    },
    {
      name: 'Tokmak',
      value: 'Tokmak',
    },
    {
      name: 'Toretsk',
      value: 'Toretsk',
    },
    {
      name: 'Trostianets',
      value: 'Trostianets',
    },
    {
      name: 'Truskavets',
      value: 'Truskavets',
    },
    {
      name: 'Tulchyn',
      value: 'Tulchyn',
    },
    {
      name: 'Turka',
      value: 'Turka',
    },
    {
      name: 'Tyachiv',
      value: 'Tyachiv',
    },
    {
      name: 'Uhniv',
      value: 'Uhniv',
    },
    {
      name: 'Uzhhorod',
      value: 'Uzhhorod',
    },
    {
      name: 'Uzyn',
      value: 'Uzyn',
    },
    {
      name: 'Ukrainka',
      value: 'Ukrainka',
    },
    {
      name: 'Ukrainsk',
      value: 'Ukrainsk',
    },
    {
      name: 'Uman',
      value: 'Uman',
    },
    {
      name: 'Ustyluh',
      value: 'Ustyluh',
    },
    {
      name: 'Fastiv',
      value: 'Fastiv',
    },
    {
      name: 'Feodosiia',
      value: 'Feodosiia',
    },
    {
      name: 'Kharkiv',
      value: 'Kharkiv',
    },
    {
      name: 'Khartsyzk',
      value: 'Khartsyzk',
    },
    {
      name: 'Kherson',
      value: 'Kherson',
    },
    {
      name: 'Khyriv',
      value: 'Khyriv',
    },
    {
      name: 'Khmelnytskyi',
      value: 'Khmelnytskyi',
    },
    {
      name: 'Khmilnyk',
      value: 'Khmilnyk',
    },
    {
      name: 'Khodoriv',
      value: 'Khodoriv',
    },
    {
      name: 'Khorol',
      value: 'Khorol',
    },
    {
      name: 'Khorostkiv',
      value: 'Khorostkiv',
    },
    {
      name: 'Khotyn',
      value: 'Khotyn',
    },
    {
      name: 'Khrestivka',
      value: 'Khrestivka',
    },
    {
      name: 'Khrystynivka',
      value: 'Khrystynivka',
    },
    {
      name: 'Khrustalnyi',
      value: 'Khrustalnyi',
    },
    {
      name: 'Khust',
      value: 'Khust',
    },
    {
      name: 'Chasiv Yar',
      value: 'Chasiv Yar',
    },
    {
      name: 'Chervonohrad',
      value: 'Chervonohrad',
    },
    {
      name: 'Cherkasy',
      value: 'Cherkasy',
    },
    {
      name: 'Chernivtsi',
      value: 'Chernivtsi',
    },
    {
      name: 'Chernihiv',
      value: 'Chernihiv',
    },
    {
      name: 'Chyhyryn',
      value: 'Chyhyryn',
    },
    {
      name: 'Chystiakove',
      value: 'Chystiakove',
    },
    {
      name: 'Chop',
      value: 'Chop',
    },
    {
      name: 'Chornobyl',
      value: 'Chornobyl',
    },
    {
      name: 'Chornomorsk',
      value: 'Chornomorsk',
    },
    {
      name: 'Chortkiv',
      value: 'Chortkiv',
    },
    {
      name: 'Chuhuiv',
      value: 'Chuhuiv',
    },
    {
      name: 'Chudniv',
      value: 'Chudniv',
    },
    {
      name: 'Sharhorod',
      value: 'Sharhorod',
    },
    {
      name: 'Shakhtarsk',
      value: 'Shakhtarsk',
    },
    {
      name: 'Shepetivka',
      value: 'Shepetivka',
    },
    {
      name: 'Shostka',
      value: 'Shostka',
    },
    {
      name: 'Shpola',
      value: 'Shpola',
    },
    {
      name: 'Shumsk',
      value: 'Shumsk',
    },
    {
      name: 'Shchastia',
      value: 'Shchastia',
    },
    {
      name: 'Shcholkine',
      value: 'Shcholkine',
    },
    {
      name: 'Yuzhne',
      value: 'Yuzhne',
    },
    {
      name: 'Yuzhnoukrainsk',
      value: 'Yuzhnoukrainsk',
    },
    {
      name: 'Yavoriv',
      value: 'Yavoriv',
    },
    {
      name: 'Yahotyn',
      value: 'Yahotyn',
    },
    {
      name: 'Yalta',
      value: 'Yalta',
    },
    {
      name: 'Yampil',
      value: 'Yampil',
    },
    {
      name: 'Yaremche',
      value: 'Yaremche',
    },
    {
      name: 'Yani Kapu',
      value: 'Yani Kapu',
    },
    {
      name: 'Yasynuvata',
      value: 'Yasynuvata',
    },
  ];
  static carsList: CarsListInterface[] = [
    {
      id: 1,
      make: 'AMCO-VEBA',
      models: [
        {
          makeId: '1',
          name: '817',
        },
      ],
    },
    {
      id: 2,
      make: 'Ashok Leyland',
      models: [
        {
          name: '1518',
          makeId: '2',
        },
      ],
    },
    {
      id: 3,
      make: 'Avia',
      models: [
        {
          name: '31',
          makeId: '3',
        },
        {
          name: 'A31',
          makeId: '3',
        },
        {
          name: 'D120',
          makeId: '3',
        },
      ],
    },
    {
      id: 4,
      make: 'Barkas (Баркас)',
      models: [
        {
          name: 'B1000',
          makeId: '4',
        },
      ],
    },
    {
      id: 5,
      make: 'Baw',
      models: [
        {
          name: 'BJ',
          makeId: '5',
        },
        {
          name: 'BJ1044',
          makeId: '5',
        },
        {
          name: 'BJ1065',
          makeId: '5',
        },
      ],
    },
    {
      id: 6,
      make: 'CAMC',
      models: [
        {
          name: '3250',
          makeId: '6',
        },
      ],
    },
    {
      id: 7,
      make: 'Cenntro',
      models: [
        {
          name: 'Logistar 100',
          makeId: '7',
        },
        {
          name: 'Logistar 200',
          makeId: '7',
        },
        {
          name: 'Logistar 260',
          makeId: '7',
        },
      ],
    },
    {
      id: 8,
      make: 'Chanje',
      models: [
        {
          name: 'V8070',
          makeId: '8',
        },
      ],
    },
    {
      id: 9,
      make: 'Chevrolet',
      models: [
        {
          name: 'Astro',
          makeId: '9',
        },
        {
          name: 'C/K Series',
          makeId: '9',
        },
        {
          name: 'Express',
          makeId: '9',
        },
      ],
    },
    {
      id: 10,
      make: 'Citroen',
      models: [
        {
          name: 'Berlingo',
          makeId: '10',
        },
        {
          name: 'C25',
          makeId: '10',
        },
        {
          name: 'C35',
          makeId: '10',
        },
        {
          name: 'Dispatch',
          makeId: '10',
        },
        {
          name: 'Jumper',
          makeId: '10',
        },
        {
          name: 'Jumper груз.',
          makeId: '10',
        },
        {
          name: 'Jumpy',
          makeId: '10',
        },
        {
          name: 'Nemo',
          makeId: '10',
        },
      ],
    },
    {
      id: 11,
      make: 'Dacia',
      models: [
        {
          name: 'Dokker',
          makeId: '11',
        },
      ],
    },
    {
      id: 12,
      make: 'Daewoo',
      models: [
        {
          name: 'Lanos Cargo',
          makeId: '12',
        },
        {
          name: 'Lublin',
          makeId: '12',
        },
        {
          name: 'Maximus',
          makeId: '12',
        },
        {
          name: 'Novus',
          makeId: '12',
        },
      ],
    },
    {
      id: 13,
      make: 'DAF',
      models: [
        {
          name: '1900',
          makeId: '13',
        },
        {
          name: '200',
          makeId: '13',
        },
        {
          name: '400 груз-пас',
          makeId: '13',
        },
        {
          name: '400 груз.',
          makeId: '13',
        },
        {
          name: '45',
          makeId: '13',
        },
        {
          name: '55',
          makeId: '13',
        },
        {
          name: '65',
          makeId: '13',
        },
        {
          name: '75',
          makeId: '13',
        },
        {
          name: '85',
          makeId: '13',
        },
        {
          name: '95',
          makeId: '13',
        },
        {
          name: 'AE',
          makeId: '13',
        },
        {
          name: 'ATI',
          makeId: '13',
        },
        {
          name: 'Berkhof',
          makeId: '13',
        },
        {
          name: 'CF',
          makeId: '13',
        },
        {
          name: 'CF 65',
          makeId: '13',
        },
        {
          name: 'CF 75',
          makeId: '13',
        },
        {
          name: 'CF 85',
          makeId: '13',
        },
        {
          name: 'F 75',
          makeId: '13',
        },
        {
          name: 'FA',
          makeId: '13',
        },
        {
          name: 'FT',
          makeId: '13',
        },
        {
          name: 'FT 95',
          makeId: '13',
        },
        {
          name: 'FX',
          makeId: '13',
        },
        {
          name: 'Leyland',
          makeId: '13',
        },
        {
          name: 'LF',
          makeId: '13',
        },
        {
          name: 'TE',
          makeId: '13',
        },
        {
          name: 'TE 47XS',
          makeId: '13',
        },
        {
          name: 'XF',
          makeId: '13',
        },
        {
          name: 'XF 105',
          makeId: '13',
        },
        {
          name: 'XF 106',
          makeId: '13',
        },
        {
          name: 'XF 95',
          makeId: '13',
        },
        {
          name: 'XG',
          makeId: '13',
        },
        {
          name: 'YA 126',
          makeId: '13',
        },
      ],
    },
    {
      id: 14,
      make: 'DFAC',
      models: [
        {
          name: '1045',
          makeId: '14',
        },
      ],
    },
    {
      id: 15,
      make: 'Dodge',
      models: [
        {
          name: 'RAM',
          makeId: '15',
        },
        {
          name: 'B-Models',
          makeId: '15',
        },
        {
          name: 'RAM 2500',
          makeId: '15',
        },
        {
          name: 'RAM 3500',
          makeId: '15',
        },
        {
          name: 'Sprinter',
          makeId: '15',
        },
      ],
    },
    {
      id: 16,
      make: 'Dongfeng',
      models: [
        {
          name: 'DF',
          makeId: '16',
        },
        {
          name: 'DFA',
          makeId: '16',
        },
        {
          name: 'EQ',
          makeId: '16',
        },
        {
          name: '1044',
          makeId: '16',
        },
        {
          name: '1074',
          makeId: '16',
        },
        {
          name: 'DF-20',
          makeId: '16',
        },
        {
          name: 'DF-25',
          makeId: '16',
        },
        {
          name: 'DF-30',
          makeId: '16',
        },
        {
          name: 'DF-47',
          makeId: '16',
        },
        {
          name: 'DFA 1051',
          makeId: '16',
        },
        {
          name: 'DFA 1064',
          makeId: '16',
        },
        {
          name: 'EM26',
          makeId: '16',
        },
        {
          name: 'EQ1032',
          makeId: '16',
        },
        {
          name: 'EQ5021',
          makeId: '16',
        },
      ],
    },
    {
      id: 17,
      make: 'Eagle',
      models: [
        {
          name: 'MD',
          makeId: '17',
        },
      ],
    },
    {
      id: 18,
      make: 'ERF',
      models: [
        {
          name: 'ECS',
          makeId: '18',
        },
      ],
    },
    {
      id: 19,
      make: 'FAW',
      models: [
        {
          name: 'CA',
          makeId: '19',
        },
        {
          name: '1011',
          makeId: '19',
        },
        {
          name: '1031',
          makeId: '19',
        },
        {
          name: '1041',
          makeId: '19',
        },
        {
          name: '1047',
          makeId: '19',
        },
        {
          name: '1051',
          makeId: '19',
        },
        {
          name: 'CA 1031',
          makeId: '19',
        },
        {
          name: 'CA 1061',
          makeId: '19',
        },
        {
          name: 'CA 3252P',
          makeId: '19',
        },
        {
          name: 'J6P',
          makeId: '19',
        },
        {
          name: 'Tiger',
          makeId: '19',
        },
        {
          name: 'Tiger VR',
          makeId: '19',
        },
        {
          name: 'СА 1051',
          makeId: '19',
        },
        {
          name: 'СА 3252',
          makeId: '19',
        },
      ],
    },
    {
      id: 20,
      make: 'Fiat',
      models: [
        {
          name: 'Doblo',
          makeId: '20',
        },
        {
          name: 'Ducato',
          makeId: '20',
        },
        {
          name: 'Fiorino',
          makeId: '20',
        },
        {
          name: 'Qubo',
          makeId: '20',
        },
        {
          name: 'Scudo',
          makeId: '20',
        },
        {
          name: 'Talento',
          makeId: '20',
        },
      ],
    },
    {
      id: 21,
      make: 'Ford',
      models: [
        {
          name: 'Cargo',
          makeId: '21',
        },
        {
          name: 'Courier',
          makeId: '21',
        },
        {
          name: 'E-250',
          makeId: '21',
        },
        {
          name: 'E-350',
          makeId: '21',
        },
        {
          name: 'E-series',
          makeId: '21',
        },
        {
          name: 'Econovan',
          makeId: '21',
        },
        {
          name: 'Escort Express',
          makeId: '21',
        },
        {
          name: 'F-650',
          makeId: '21',
        },
        {
          name: 'F-Max',
          makeId: '21',
        },
        {
          name: 'LTL-9000',
          makeId: '21',
        },
        {
          name: 'Transit',
          makeId: '21',
        },
        {
          name: 'Transit Connect',
          makeId: '21',
        },
        {
          name: 'Transit Courier',
          makeId: '21',
        },
        {
          name: 'Transit Custom',
          makeId: '21',
        },
      ],
    },
    {
      id: 22,
      make: 'Foton',
      models: [
        {
          name: 'AC',
          makeId: '22',
        },
        {
          name: 'Auman',
          makeId: '22',
        },
        {
          name: 'Aumark',
          makeId: '22',
        },
        {
          name: 'Aumark С',
          makeId: '22',
        },
        {
          name: 'BJ',
          makeId: '22',
        },
        {
          name: 'BJ1043',
          makeId: '22',
        },
        {
          name: 'FL',
          makeId: '22',
        },
        {
          name: 'Forland',
          makeId: '22',
        },
        {
          name: 'Кобальт',
          makeId: '22',
        },
      ],
    },
    {
      id: 23,
      make: 'Freightliner',
      models: [
        {
          name: 'Century',
          makeId: '23',
        },
        {
          name: 'Columbia',
          makeId: '23',
        },
      ],
    },
    {
      id: 24,
      make: 'Ginaf',
      models: [
        {
          name: 'M',
          makeId: '24',
        },
      ],
    },
    {
      id: 25,
      make: 'GMC',
      models: [
        {
          name: 'Hummer EV',
          makeId: '25',
        },
        {
          name: 'Hummer EV SUV',
          makeId: '25',
        },
      ],
    },
    {
      id: 26,
      make: 'Great Wall',
      models: [
        {
          name: 'Wingle',
          makeId: '26',
        },
      ],
    },
    {
      id: 27,
      make: 'HDC',
      models: [
        {
          name: 'B22R33',
          makeId: '27',
        },
      ],
    },
    {
      id: 28,
      make: 'Hongda',
      models: [
        {
          name: 'HDT5401THB',
          makeId: '28',
        },
        {
          name: 'HDT5420THB',
          makeId: '28',
        },
      ],
    },
    {
      id: 29,
      make: 'Howo',
      models: [
        {
          name: 'A7',
          makeId: '29',
        },
        {
          name: 'T5G',
          makeId: '29',
        },
        {
          name: 'T7H',
          makeId: '29',
        },
        {
          name: 'V7G',
          makeId: '29',
        },
        {
          name: 'ZZ1257',
          makeId: '29',
        },
        {
          name: 'ZZ5407',
          makeId: '29',
        },
        {
          name: 'ZZ5707',
          makeId: '29',
        },
      ],
    },
    {
      id: 30,
      make: 'Hyundai',
      models: [
        {
          name: 'EX-Series',
          makeId: '30',
        },
        {
          name: 'H-Series',
          makeId: '30',
        },
        {
          name: 'HD-Series',
          makeId: '30',
        },
        {
          name: 'EX10',
          makeId: '30',
        },
        {
          name: 'EX6',
          makeId: '30',
        },
        {
          name: 'EX8',
          makeId: '30',
        },
        {
          name: 'H 100',
          makeId: '30',
        },
        {
          name: 'H 200',
          makeId: '30',
        },
        {
          name: 'H 300',
          makeId: '30',
        },
        {
          name: 'H 350',
          makeId: '30',
        },
        {
          name: 'H-1',
          makeId: '30',
        },
        {
          name: 'HD 120',
          makeId: '30',
        },
        {
          name: 'HD 210',
          makeId: '30',
        },
        {
          name: 'HD 35',
          makeId: '30',
        },
        {
          name: 'HD 65',
          makeId: '30',
        },
        {
          name: 'HD 78',
          makeId: '30',
        },
        {
          name: 'Porter',
          makeId: '30',
        },
      ],
    },
    {
      id: 31,
      make: 'IFA (ІФА)',
      models: [
        {
          name: 'B-50',
          makeId: '31',
        },
        {
          name: 'IFA',
          makeId: '31',
        },
        {
          name: 'Multicar',
          makeId: '31',
        },
        {
          name: 'W50',
          makeId: '31',
        },
      ],
    },
    {
      id: 32,
      make: 'International',
      models: [
        {
          name: '9200',
          makeId: '32',
        },
        {
          name: '9600',
          makeId: '32',
        },
      ],
    },
    {
      id: 33,
      make: 'Isuzu',
      models: [
        {
          name: 'FSR',
          makeId: '33',
        },
        {
          name: 'FVR',
          makeId: '33',
        },
        {
          name: 'Giga',
          makeId: '33',
        },
        {
          name: 'NKR',
          makeId: '33',
        },
        {
          name: 'NLR',
          makeId: '33',
        },
        {
          name: 'NMR',
          makeId: '33',
        },
        {
          name: 'NPR',
          makeId: '33',
        },
        {
          name: 'NPS',
          makeId: '33',
        },
        {
          name: 'NQR',
          makeId: '33',
        },
      ],
    },
    {
      id: 34,
      make: 'Iveco',
      models: [
        {
          name: 'Daily',
          makeId: '34',
        },
        {
          name: 'TurboDaily',
          makeId: '34',
        },
        {
          name: '35C13',
          makeId: '34',
        },
        {
          name: '35S13',
          makeId: '34',
        },
        {
          name: '35S1701 груз.',
          makeId: '34',
        },
        {
          name: '65C17',
          makeId: '34',
        },
        {
          name: 'Cursor',
          makeId: '34',
        },
        {
          name: 'Daily груз.',
          makeId: '34',
        },
        {
          name: 'Daily груз.-пасс.',
          makeId: '34',
        },
        {
          name: 'EuroCargo',
          makeId: '34',
        },
        {
          name: 'EuroStar',
          makeId: '34',
        },
        {
          name: 'EuroTech',
          makeId: '34',
        },
        {
          name: 'EuroTrakker',
          makeId: '34',
        },
        {
          name: 'Ford',
          makeId: '34',
        },
        {
          name: 'Magirus',
          makeId: '34',
        },
        {
          name: 'ML',
          makeId: '34',
        },
        {
          name: 'S-Way',
          makeId: '34',
        },
        {
          name: 'Stralis',
          makeId: '34',
        },
        {
          name: 'Tector',
          makeId: '34',
        },
        {
          name: 'Trakker',
          makeId: '34',
        },
        {
          name: 'TurboDaily',
          makeId: '34',
        },
        {
          name: 'TurboDaily груз.',
          makeId: '34',
        },
        {
          name: 'TurboStar',
          makeId: '34',
        },
        {
          name: 'Zeta',
          makeId: '34',
        },
      ],
    },
    {
      id: 35,
      make: 'JAC',
      models: [
        {
          name: 'HFC',
          makeId: '35',
        },
        {
          name: 'HFC 1020K',
          makeId: '35',
        },
        {
          name: 'HFC 1020KR',
          makeId: '35',
        },
        {
          name: 'HFC 1040KR1',
          makeId: '35',
        },
        {
          name: 'HFC 1045K',
          makeId: '35',
        },
        {
          name: 'N Series',
          makeId: '35',
        },
        {
          name: 'N120',
          makeId: '35',
        },
        {
          name: 'N200',
          makeId: '35',
        },
        {
          name: 'N56',
          makeId: '35',
        },
        {
          name: 'N90',
          makeId: '35',
        },
        {
          name: 'X200',
          makeId: '35',
        },
      ],
    },
    {
      id: 36,
      make: 'Kenworth',
      models: [
        {
          name: 'T2000',
          makeId: '36',
        },
      ],
    },
    {
      id: 37,
      make: 'Kia',
      models: [
        {
          name: 'Bongo',
          makeId: '37',
        },
        {
          name: 'K2500',
          makeId: '37',
        },
        {
          name: 'Pregio',
          makeId: '37',
        },
      ],
    },
    {
      id: 38,
      make: 'LDV',
      models: [
        {
          name: 'Convoy груз.',
          makeId: '38',
        },
        {
          name: 'Maxus',
          makeId: '38',
        },
      ],
    },
    {
      id: 39,
      make: 'Ligier',
      models: [
        {
          name: 'T2000',
          makeId: '39',
        },
      ],
    },
    {
      id: 40,
      make: 'MAN',
      models: [
        {
          name: '8.150',
          makeId: '40',
        },
        {
          name: 'F',
          makeId: '40',
        },
        {
          name: 'LE',
          makeId: '40',
        },
        {
          name: 'TGX',
          makeId: '40',
        },
        {
          name: '10.150',
          makeId: '40',
        },
        {
          name: '10.156',
          makeId: '40',
        },
        {
          name: '10.163',
          makeId: '40',
        },
        {
          name: '10.224',
          makeId: '40',
        },
        {
          name: '10.225',
          makeId: '40',
        },
        {
          name: '12.163',
          makeId: '40',
        },
        {
          name: '12.180',
          makeId: '40',
        },
        {
          name: '12.192',
          makeId: '40',
        },
        {
          name: '12.220',
          makeId: '40',
        },
        {
          name: '12.224',
          makeId: '40',
        },
        {
          name: '12.225',
          makeId: '40',
        },
        {
          name: '12.232',
          makeId: '40',
        },
        {
          name: '14',
          makeId: '40',
        },
        {
          name: '14.163',
          makeId: '40',
        },
        {
          name: '14.192',
          makeId: '40',
        },
        {
          name: '14.222',
          makeId: '40',
        },
        {
          name: '14.224',
          makeId: '40',
        },
        {
          name: '14.225',
          makeId: '40',
        },
        {
          name: '14.232',
          makeId: '40',
        },
        {
          name: '14.264',
          makeId: '40',
        },
        {
          name: '14.272',
          makeId: '40',
        },
        {
          name: '14.280',
          makeId: '40',
        },
        {
          name: '14.284',
          makeId: '40',
        },
        {
          name: '14.285',
          makeId: '40',
        },
        {
          name: '17.232',
          makeId: '40',
        },
        {
          name: '18',
          makeId: '40',
        },
        {
          name: '18.192',
          makeId: '40',
        },
        {
          name: '18.220',
          makeId: '40',
        },
        {
          name: '18.224',
          makeId: '40',
        },
        {
          name: '18.225',
          makeId: '40',
        },
        {
          name: '18.232',
          makeId: '40',
        },
        {
          name: '18.264',
          makeId: '40',
        },
        {
          name: '18.272',
          makeId: '40',
        },
        {
          name: '18.284',
          makeId: '40',
        },
        {
          name: '18.310',
          makeId: '40',
        },
        {
          name: '18.343',
          makeId: '40',
        },
        {
          name: '18.360',
          makeId: '40',
        },
        {
          name: '18.363',
          makeId: '40',
        },
        {
          name: '18.390',
          makeId: '40',
        },
        {
          name: '18.403',
          makeId: '40',
        },
        {
          name: '18.410',
          makeId: '40',
        },
        {
          name: '18.413',
          makeId: '40',
        },
        {
          name: '18.430',
          makeId: '40',
        },
        {
          name: '18.440',
          makeId: '40',
        },
        {
          name: '18.463',
          makeId: '40',
        },
        {
          name: '18.480',
          makeId: '40',
        },
        {
          name: '18.540',
          makeId: '40',
        },
        {
          name: '19.314',
          makeId: '40',
        },
        {
          name: '19.322',
          makeId: '40',
        },
        {
          name: '19.332',
          makeId: '40',
        },
        {
          name: '19.342',
          makeId: '40',
        },
        {
          name: '19.343',
          makeId: '40',
        },
        {
          name: '19.362',
          makeId: '40',
        },
        {
          name: '19.364',
          makeId: '40',
        },
        {
          name: '19.372',
          makeId: '40',
        },
        {
          name: '19.402',
          makeId: '40',
        },
        {
          name: '19.403',
          makeId: '40',
        },
        {
          name: '19.414',
          makeId: '40',
        },
        {
          name: '19.422',
          makeId: '40',
        },
        {
          name: '19.463',
          makeId: '40',
        },
        {
          name: '19.464',
          makeId: '40',
        },
        {
          name: '22.403',
          makeId: '40',
        },
        {
          name: '23',
          makeId: '40',
        },
        {
          name: '23.403',
          makeId: '40',
        },
        {
          name: '23.414',
          makeId: '40',
        },
        {
          name: '23.463',
          makeId: '40',
        },
        {
          name: '24.332',
          makeId: '40',
        },
        {
          name: '24.362',
          makeId: '40',
        },
        {
          name: '24.372',
          makeId: '40',
        },
        {
          name: '24.414',
          makeId: '40',
        },
        {
          name: '24.430',
          makeId: '40',
        },
        {
          name: '25.280',
          makeId: '40',
        },
        {
          name: '25.372',
          makeId: '40',
        },
        {
          name: '25.422',
          makeId: '40',
        },
        {
          name: '26',
          makeId: '40',
        },
        {
          name: '26.293',
          makeId: '40',
        },
        {
          name: '26.343',
          makeId: '40',
        },
        {
          name: '26.360',
          makeId: '40',
        },
        {
          name: '26.372',
          makeId: '40',
        },
        {
          name: '26.390',
          makeId: '40',
        },
        {
          name: '26.400',
          makeId: '40',
        },
        {
          name: '26.403',
          makeId: '40',
        },
        {
          name: '26.410',
          makeId: '40',
        },
        {
          name: '26.413',
          makeId: '40',
        },
        {
          name: '26.414',
          makeId: '40',
        },
        {
          name: '26.430',
          makeId: '40',
        },
        {
          name: '26.440',
          makeId: '40',
        },
        {
          name: '26.460',
          makeId: '40',
        },
        {
          name: '26.463',
          makeId: '40',
        },
        {
          name: '26.464',
          makeId: '40',
        },
        {
          name: '26.480',
          makeId: '40',
        },
        {
          name: '26.530',
          makeId: '40',
        },
        {
          name: '33.403',
          makeId: '40',
        },
        {
          name: '41',
          makeId: '40',
        },
        {
          name: '41.414',
          makeId: '40',
        },
        {
          name: '41.464',
          makeId: '40',
        },
        {
          name: '8',
          makeId: '40',
        },
        {
          name: '8.113',
          makeId: '40',
        },
        {
          name: '8.145',
          makeId: '40',
        },
        {
          name: '8.150 груз.',
          makeId: '40',
        },
        {
          name: '8.153',
          makeId: '40',
        },
        {
          name: '8.155',
          makeId: '40',
        },
        {
          name: '8.163',
          makeId: '40',
        },
        {
          name: '8.180',
          makeId: '40',
        },
        {
          name: '8.185',
          makeId: '40',
        },
        {
          name: '8.224',
          makeId: '40',
        },
        {
          name: '8.240',
          makeId: '40',
        },
        {
          name: '8163',
          makeId: '40',
        },
        {
          name: '9.163',
          makeId: '40',
        },
        {
          name: 'Comandor',
          makeId: '40',
        },
        {
          name: 'F 2000',
          makeId: '40',
        },
        {
          name: 'L 2000',
          makeId: '40',
        },
        {
          name: 'LE 12.180',
          makeId: '40',
        },
        {
          name: 'LE 12.220',
          makeId: '40',
        },
        {
          name: 'LE 18.220',
          makeId: '40',
        },
        {
          name: 'LE 180',
          makeId: '40',
        },
        {
          name: 'LE 20.280',
          makeId: '40',
        },
        {
          name: 'LE 220',
          makeId: '40',
        },
        {
          name: 'LE 8.140',
          makeId: '40',
        },
        {
          name: 'LE 8.150',
          makeId: '40',
        },
        {
          name: 'LE 8.180',
          makeId: '40',
        },
        {
          name: 'M 2000 L',
          makeId: '40',
        },
        {
          name: 'M 2000 M',
          makeId: '40',
        },
        {
          name: 'MAN',
          makeId: '40',
        },
        {
          name: 'TG',
          makeId: '40',
        },
        {
          name: 'TGA',
          makeId: '40',
        },
        {
          name: 'TGE',
          makeId: '40',
        },
        {
          name: 'TGL',
          makeId: '40',
        },
        {
          name: 'TGM',
          makeId: '40',
        },
        {
          name: 'TGS',
          makeId: '40',
        },
        {
          name: 'TGX',
          makeId: '40',
        },
      ],
    },
    {
      id: 41,
      make: 'MAN-VW',
      models: [
        {
          name: '10.150',
          makeId: '41',
        },
        {
          name: '6.100',
          makeId: '41',
        },
        {
          name: '8.150',
          makeId: '41',
        },
      ],
    },
    {
      id: 42,
      make: 'Maxus',
      models: [
        {
          name: 'e-Deliver 3',
          makeId: '42',
        },
        {
          name: 'EV80',
          makeId: '42',
        },
      ],
    },
    {
      id: 43,
      make: 'Mazda',
      models: [
        {
          name: 'E-series',
          makeId: '43',
        },
      ],
    },
    {
      id: 44,
      make: 'Mercedes-Benz',
      models: [
        {
          name: 'Actros',
          makeId: '44',
        },
        {
          name: 'Arocs',
          makeId: '44',
        },
        {
          name: 'Atego',
          makeId: '44',
        },
        {
          name: 'Axor',
          makeId: '44',
        },
        {
          name: 'Citan',
          makeId: '44',
        },
        {
          name: 'Econic',
          makeId: '44',
        },
        {
          name: 'eVito',
          makeId: '44',
        },
        {
          name: 'L/LA-Series',
          makeId: '44',
        },
        {
          name: 'LK-Series',
          makeId: '44',
        },
        {
          name: 'LN-Series',
          makeId: '44',
        },
        {
          name: 'LP-Series',
          makeId: '44',
        },
        {
          name: 'MB-Class',
          makeId: '44',
        },
        {
          name: 'MK-Series',
          makeId: '44',
        },
        {
          name: 'SK-Series',
          makeId: '44',
        },
        {
          name: 'Sprinter',
          makeId: '44',
        },
        {
          name: 'T1',
          makeId: '44',
        },
        {
          name: 'T2',
          makeId: '44',
        },
        {
          name: 'Unimog',
          makeId: '44',
        },
        {
          name: 'Vario',
          makeId: '44',
        },
        {
          name: 'Vito',
          makeId: '44',
        },
      ],
    },
    {
      id: 45,
      make: 'Mitsubishi',
      models: [
        {
          name: 'Fuso Canter',
          makeId: '45',
        },
        {
          name: 'L 400',
          makeId: '45',
        },
      ],
    },
    {
      id: 46,
      make: 'MUDAN',
      models: [
        {
          name: 'MD',
          makeId: '46',
        },
      ],
    },
    {
      id: 47,
      make: 'Nissan',
      models: [
        {
          name: 'NV',
          makeId: '47',
        },
        {
          name: 'Atlas',
          makeId: '47',
        },
        {
          name: 'Atleon',
          makeId: '47',
        },
        {
          name: 'Cabstar',
          makeId: '47',
        },
        {
          name: 'e-NV200',
          makeId: '47',
        },
        {
          name: 'Eco',
          makeId: '47',
        },
        {
          name: 'Interstar',
          makeId: '47',
        },
        {
          name: 'Kubistar',
          makeId: '47',
        },
        {
          name: 'NV200',
          makeId: '47',
        },
        {
          name: 'NV2500',
          makeId: '47',
        },
        {
          name: 'NV300',
          makeId: '47',
        },
        {
          name: 'NV400',
          makeId: '47',
        },
        {
          name: 'Primastar',
          makeId: '47',
        },
        {
          name: 'Serena',
          makeId: '47',
        },
        {
          name: 'Sunny',
          makeId: '47',
        },
        {
          name: 'Trade',
          makeId: '47',
        },
        {
          name: 'UD',
          makeId: '47',
        },
        {
          name: 'Vanette',
          makeId: '47',
        },
      ],
    },
    {
      id: 48,
      make: 'Opel',
      models: [
        {
          name: 'Astra',
          makeId: '48',
        },
        {
          name: 'Combo',
          makeId: '48',
        },
        {
          name: 'Arena',
          makeId: '48',
        },
        {
          name: 'Astra Van',
          makeId: '48',
        },
        {
          name: 'Combo',
          makeId: '48',
        },
        {
          name: 'Combo Cargo',
          makeId: '48',
        },
        {
          name: 'Movano',
          makeId: '48',
        },
        {
          name: 'Vivaro',
          makeId: '48',
        },
        {
          name: 'Vivaro-e',
          makeId: '48',
        },
      ],
    },
    {
      id: 49,
      make: 'Peugeot',
      models: [
        {
          name: 'Bipper',
          makeId: '49',
        },
        {
          name: 'Boxer',
          makeId: '49',
        },
        {
          name: 'Expert',
          makeId: '49',
        },
        {
          name: 'J5',
          makeId: '49',
        },
        {
          name: 'J9 Karsan',
          makeId: '49',
        },
        {
          name: 'Partner',
          makeId: '49',
        },
      ],
    },
    {
      id: 50,
      make: 'Praga',
      models: [
        {
          name: 'V3S',
          makeId: '50',
        },
      ],
    },
    {
      id: 51,
      make: 'Renault',
      models: [
        {
          name: 'C-Series',
          makeId: '51',
        },
        {
          name: 'D-Series',
          makeId: '51',
        },
        {
          name: 'Dokker',
          makeId: '51',
        },
        {
          name: 'Express',
          makeId: '51',
        },
        {
          name: 'Express Van',
          makeId: '51',
        },
        {
          name: 'K-Series',
          makeId: '51',
        },
        {
          name: 'Kangoo',
          makeId: '51',
        },
        {
          name: 'Kerax',
          makeId: '51',
        },
        {
          name: 'Logan Van',
          makeId: '51',
        },
        {
          name: 'Magnum',
          makeId: '51',
        },
        {
          name: 'Major',
          makeId: '51',
        },
        {
          name: 'Manager',
          makeId: '51',
        },
        {
          name: 'Mascott',
          makeId: '51',
        },
        {
          name: 'Master',
          makeId: '51',
        },
        {
          name: 'Maxity',
          makeId: '51',
        },
        {
          name: 'Messenger',
          makeId: '51',
        },
        {
          name: 'Midliner',
          makeId: '51',
        },
        {
          name: 'Midlum',
          makeId: '51',
        },
        {
          name: 'Premium',
          makeId: '51',
        },
        {
          name: 'Range T/T-Series ',
          makeId: '51',
        },
        {
          name: 'Rapid',
          makeId: '51',
        },
        {
          name: 'Trafic',
          makeId: '51',
        },
      ],
    },
    {
      id: 52,
      make: 'Scania',
      models: [
        {
          name: 'R',
          makeId: '52',
        },
        {
          name: '111',
          makeId: '52',
        },
        {
          name: '112M',
          makeId: '52',
        },
        {
          name: '113',
          makeId: '52',
        },
        {
          name: '113M',
          makeId: '52',
        },
        {
          name: '114',
          makeId: '52',
        },
        {
          name: '124',
          makeId: '52',
        },
        {
          name: '144',
          makeId: '52',
        },
        {
          name: '164L',
          makeId: '52',
        },
        {
          name: '94',
          makeId: '52',
        },
        {
          name: 'G',
          makeId: '52',
        },
        {
          name: 'L',
          makeId: '52',
        },
        {
          name: 'P',
          makeId: '52',
        },
        {
          name: 'R 114',
          makeId: '52',
        },
        {
          name: 'R 124',
          makeId: '52',
        },
        {
          name: 'R 143',
          makeId: '52',
        },
        {
          name: 'R 144',
          makeId: '52',
        },
        {
          name: 'R 340',
          makeId: '52',
        },
        {
          name: 'R 380',
          makeId: '52',
        },
        {
          name: 'R 400',
          makeId: '52',
        },
        {
          name: 'R 410',
          makeId: '52',
        },
        {
          name: 'R 420',
          makeId: '52',
        },
        {
          name: 'R 440',
          makeId: '52',
        },
        {
          name: 'R 450',
          makeId: '52',
        },
        {
          name: 'R 470',
          makeId: '52',
        },
        {
          name: 'R 480',
          makeId: '52',
        },
        {
          name: 'R 490',
          makeId: '52',
        },
        {
          name: 'R 500',
          makeId: '52',
        },
        {
          name: 'R 580',
          makeId: '52',
        },
        {
          name: 'Topline',
          makeId: '52',
        },
      ],
    },
    {
      id: 53,
      make: 'SEAT',
      models: [
        {
          name: 'Inca',
          makeId: '53',
        },
      ],
    },
    {
      id: 54,
      make: 'Shacman',
      models: [
        {
          name: 'SX',
          makeId: '54',
        },
      ],
    },
    {
      id: 55,
      make: 'Sinotruk',
      models: [
        {
          name: 'C7H',
          makeId: '55',
        },
      ],
    },
    {
      id: 56,
      make: 'Skoda',
      models: [
        {
          name: 'Felicia',
          makeId: '56',
        },
        {
          name: 'Praktik',
          makeId: '56',
        },
      ],
    },
    {
      id: 57,
      make: 'Sterling',
      models: [
        {
          name: 'Acterra',
          makeId: '57',
        },
      ],
    },
    {
      id: 58,
      make: 'StreetScooter',
      models: [
        {
          name: 'Work',
          makeId: '58',
        },
      ],
    },
    {
      id: 59,
      make: 'Suzuki',
      models: [
        {
          name: 'Carry',
          makeId: '59',
        },
      ],
    },
    {
      id: 60,
      make: 'TATA',
      models: [
        {
          name: '1116',
          makeId: '60',
        },
        {
          name: '1618',
          makeId: '60',
        },
        {
          name: '815',
          makeId: '60',
        },
        {
          name: 'LPT',
          makeId: '60',
        },
        {
          name: 'LPT 613',
          makeId: '60',
        },
        {
          name: 'T 713',
          makeId: '60',
        },
        {
          name: 'Т 713.12',
          makeId: '60',
        },
      ],
    },
    {
      id: 61,
      make: 'Tatra',
      models: [
        {
          name: '815',
          makeId: '61',
        },
        {
          name: 'Phoenix',
          makeId: '61',
        },
        {
          name: 'Т 815',
          makeId: '61',
        },
      ],
    },
    {
      id: 62,
      make: 'Terberg',
      models: [
        {
          name: 'Fm',
          makeId: '62',
        },
      ],
    },
    {
      id: 63,
      make: 'Terex',
      models: [
        {
          name: 'TA',
          makeId: '63',
        },
      ],
    },
    {
      id: 64,
      make: 'Toyota',
      models: [
        {
          name: 'Dyna',
          makeId: '64',
        },
        {
          name: 'Hiace',
          makeId: '64',
        },
        {
          name: 'Proace',
          makeId: '64',
        },
        {
          name: 'Proace City',
          makeId: '64',
        },
      ],
    },
    {
      id: 65,
      make: 'Volkswagen',
      models: [
        {
          name: 'Caddy',
          makeId: '65',
        },
        {
          name: 'Caddy Alltrack',
          makeId: '65',
        },
        {
          name: 'Crafter',
          makeId: '65',
        },
        {
          name: 'Eurovan',
          makeId: '65',
        },
        {
          name: 'LT',
          makeId: '65',
        },
        {
          name: 'Transporter',
          makeId: '65',
        },
      ],
    },
    {
      id: 66,
      make: 'Volvo',
      models: [
        {
          name: 'F7',
          makeId: '66',
        },
        {
          name: 'FH',
          makeId: '66',
        },
        {
          name: 'FL',
          makeId: '66',
        },
        {
          name: 'FM',
          makeId: '66',
        },
        {
          name: 'F12',
          makeId: '66',
        },
        {
          name: 'F16',
          makeId: '66',
        },
        {
          name: 'F4',
          makeId: '66',
        },
        {
          name: 'F7',
          makeId: '66',
        },
        {
          name: 'FE',
          makeId: '66',
        },
        {
          name: 'FH 12',
          makeId: '66',
        },
        {
          name: 'FH 13',
          makeId: '66',
        },
        {
          name: 'FH 16',
          makeId: '66',
        },
        {
          name: 'FL 10',
          makeId: '66',
        },
        {
          name: 'FL 6',
          makeId: '66',
        },
        {
          name: 'FL 7',
          makeId: '66',
        },
        {
          name: 'FLC',
          makeId: '66',
        },
        {
          name: 'FM 11',
          makeId: '66',
        },
        {
          name: 'FM 12',
          makeId: '66',
        },
        {
          name: 'FM 13',
          makeId: '66',
        },
        {
          name: 'FM 7',
          makeId: '66',
        },
        {
          name: 'FM 9',
          makeId: '66',
        },
        {
          name: 'FMX 11',
          makeId: '66',
        },
        {
          name: 'FMX 13',
          makeId: '66',
        },
        {
          name: 'FS 7',
          makeId: '66',
        },
        {
          name: 'NH 12',
          makeId: '66',
        },
        {
          name: 'VNL 630',
          makeId: '66',
        },
        {
          name: 'VNL 670',
          makeId: '66',
        },
        {
          name: 'WG',
          makeId: '66',
        },
      ],
    },
    {
      id: 67,
      make: 'Yuejin',
      models: [
        {
          name: 'NJ 1062',
          makeId: '67',
        },
      ],
    },
    {
      id: 68,
      make: 'Zuk',
      models: [
        {
          name: 'A-06',
          makeId: '66',
        },
        {
          name: 'A-11 груз.',
          makeId: '66',
        },
      ],
    },
    {
      id: 69,
      make: 'ЄРАЗ',
      models: [
        {
          name: '762 груз.',
          makeId: '69',
        },
      ],
    },
    {
      id: 70,
      make: 'БАЗ',
      models: [
        {
          name: 'Т901.60',
          makeId: '70',
        },
      ],
    },
    {
      id: 71,
      make: 'Богдан',
      models: [
        {
          name: 'DF',
          makeId: '71',
        },
        {
          name: 'DF-40',
          makeId: '71',
        },
      ],
    },
    {
      id: 72,
      make: 'ВАЗ / Lada',
      models: [
        {
          name: '1706 Челнок',
          makeId: '72',
        },
      ],
    },
    {
      id: 73,
      make: 'ВИС',
      models: [
        {
          name: '2345',
          makeId: '73',
        },
      ],
    },
    {
      id: 74,
      make: 'ГАЗ',
      models: [
        {
          name: '2310 Соболь',
          makeId: '74',
        },
        {
          name: '2705 Газель',
          makeId: '74',
        },
        {
          name: '2752 Соболь',
          makeId: '74',
        },
        {
          name: '2818 Газель',
          makeId: '74',
        },
        {
          name: '3301',
          makeId: '74',
        },
        {
          name: '3302 Газель',
          makeId: '74',
        },
        {
          name: '3307',
          makeId: '74',
        },
        {
          name: '3308 Садко',
          makeId: '74',
        },
        {
          name: '3309',
          makeId: '74',
        },
        {
          name: '3310 Валдай',
          makeId: '74',
        },
        {
          name: '33104',
          makeId: '74',
        },
        {
          name: '3325',
          makeId: '74',
        },
        {
          name: '4301',
          makeId: '74',
        },
        {
          name: '51',
          makeId: '74',
        },
        {
          name: '52',
          makeId: '74',
        },
        {
          name: '5201',
          makeId: '74',
        },
        {
          name: '5204',
          makeId: '74',
        },
        {
          name: '5205',
          makeId: '74',
        },
        {
          name: '5208',
          makeId: '74',
        },
        {
          name: '53',
          makeId: '74',
        },
        {
          name: '63',
          makeId: '74',
        },
        {
          name: '66',
          makeId: '74',
        },
        {
          name: 'Next',
          makeId: '74',
        },
        {
          name: 'ГАЗель NN',
          makeId: '74',
        },
        {
          name: 'ГАЗон Next',
          makeId: '74',
        },
        {
          name: 'САЗ 3504',
          makeId: '74',
        },
        {
          name: 'САЗ 3507',
          makeId: '74',
        },
        {
          name: 'САЗ 4509',
          makeId: '74',
        },
      ],
    },
    {
      id: 75,
      make: 'ЗАЗ',
      models: [
        {
          name: '11055',
          makeId: '75',
        },
        {
          name: 'Lanos Cargo',
          makeId: '75',
        },
      ],
    },
    {
      id: 76,
      make: 'ЗИЛ',
      models: [
        {
          name: 'ММЗ',
          makeId: '76',
        },
        {
          name: '130',
          makeId: '76',
        },
        {
          name: '131',
          makeId: '76',
        },
        {
          name: '133',
          makeId: '76',
        },
        {
          name: '138',
          makeId: '76',
        },
        {
          name: '138А',
          makeId: '76',
        },
        {
          name: '157',
          makeId: '76',
        },
        {
          name: '4131',
          makeId: '76',
        },
        {
          name: '431410',
          makeId: '76',
        },
        {
          name: '431412',
          makeId: '76',
        },
        {
          name: '431610',
          makeId: '76',
        },
        {
          name: '4331',
          makeId: '76',
        },
        {
          name: '433102',
          makeId: '76',
        },
        {
          name: '43336',
          makeId: '76',
        },
        {
          name: '433362',
          makeId: '76',
        },
        {
          name: '441510',
          makeId: '76',
        },
        {
          name: '4502',
          makeId: '76',
        },
        {
          name: '4505',
          makeId: '76',
        },
        {
          name: '4514',
          makeId: '76',
        },
        {
          name: '495810',
          makeId: '76',
        },
        {
          name: '5301 (Бичок)',
          makeId: '76',
        },
        {
          name: '555',
          makeId: '76',
        },
        {
          name: 'ЗИЛ',
          makeId: '76',
        },
        {
          name: 'ММЗ 4502',
          makeId: '76',
        },
        {
          name: 'ММЗ 45021',
          makeId: '76',
        },
        {
          name: 'ММЗ 554',
          makeId: '76',
        },
        {
          name: 'ММЗ 555',
          makeId: '76',
        },
      ],
    },
    {
      id: 77,
      make: 'КАЗ',
      models: [
        {
          name: '4540',
          makeId: '77',
        },
      ],
    },
    {
      id: 78,
      make: 'КамАЗ',
      models: [
        {
          name: '4308',
          makeId: '78',
        },
        {
          name: '4310',
          makeId: '78',
        },
        {
          name: '43101',
          makeId: '78',
        },
        {
          name: '43105',
          makeId: '78',
        },
        {
          name: '43118',
          makeId: '78',
        },
        {
          name: '43253',
          makeId: '78',
        },
        {
          name: '45142',
          makeId: '78',
        },
        {
          name: '45143',
          makeId: '78',
        },
        {
          name: '51102',
          makeId: '78',
        },
        {
          name: '5230',
          makeId: '78',
        },
        {
          name: '5310',
          makeId: '78',
        },
        {
          name: '53102',
          makeId: '78',
        },
        {
          name: '5311',
          makeId: '78',
        },
        {
          name: '5315',
          makeId: '78',
        },
        {
          name: '5320',
          makeId: '78',
        },
        {
          name: '53202',
          makeId: '78',
        },
        {
          name: '53211',
          makeId: '78',
        },
        {
          name: '53212',
          makeId: '78',
        },
        {
          name: '53213',
          makeId: '78',
        },
        {
          name: '53215',
          makeId: '78',
        },
        {
          name: '53229',
          makeId: '78',
        },
        {
          name: '53605',
          makeId: '78',
        },
        {
          name: '5410',
          makeId: '78',
        },
        {
          name: '54112',
          makeId: '78',
        },
        {
          name: '54115',
          makeId: '78',
        },
        {
          name: '5460',
          makeId: '78',
        },
        {
          name: '5490',
          makeId: '78',
        },
        {
          name: '5510',
          makeId: '78',
        },
        {
          name: '55102',
          makeId: '78',
        },
        {
          name: '5511',
          makeId: '78',
        },
        {
          name: '55111',
          makeId: '78',
        },
        {
          name: '581470',
          makeId: '78',
        },
        {
          name: '65111',
          makeId: '78',
        },
        {
          name: '65115',
          makeId: '78',
        },
        {
          name: '65117',
          makeId: '78',
        },
        {
          name: '6520',
          makeId: '78',
        },
        {
          name: '65201',
          makeId: '78',
        },
        {
          name: '6522',
          makeId: '78',
        },
        {
          name: 'КамАЗ',
          makeId: '78',
        },
      ],
    },
    {
      id: 79,
      make: 'КрАЗ',
      models: [
        {
          name: '250',
          makeId: '79',
        },
        {
          name: '255',
          makeId: '79',
        },
        {
          name: '256',
          makeId: '79',
        },
        {
          name: '258',
          makeId: '79',
        },
        {
          name: '260',
          makeId: '79',
        },
        {
          name: '6233',
          makeId: '79',
        },
        {
          name: '6322',
          makeId: '79',
        },
        {
          name: '6437',
          makeId: '79',
        },
        {
          name: '64431',
          makeId: '79',
        },
        {
          name: '65032',
          makeId: '79',
        },
        {
          name: '65053',
          makeId: '79',
        },
        {
          name: '65055',
          makeId: '79',
        },
        {
          name: '6510',
          makeId: '79',
        },
        {
          name: '65101',
          makeId: '79',
        },
        {
          name: 'КрАЗ',
          makeId: '79',
        },
      ],
    },
    {
      id: 80,
      make: 'МАЗ',
      models: [
        {
          name: '329',
          makeId: '80',
        },
        {
          name: '35337',
          makeId: '80',
        },
        {
          name: '354203',
          makeId: '80',
        },
        {
          name: '4370',
          makeId: '80',
        },
        {
          name: '437040',
          makeId: '80',
        },
        {
          name: '437041',
          makeId: '80',
        },
        {
          name: '4371',
          makeId: '80',
        },
        {
          name: '437121',
          makeId: '80',
        },
        {
          name: '437141',
          makeId: '80',
        },
        {
          name: '4371N2',
          makeId: '80',
        },
        {
          name: '4371V2',
          makeId: '80',
        },
        {
          name: '4371Р2',
          makeId: '80',
        },
        {
          name: '438121',
          makeId: '80',
        },
        {
          name: '4381C0',
          makeId: '80',
        },
        {
          name: '4381N2',
          makeId: '80',
        },
        {
          name: '4570',
          makeId: '80',
        },
        {
          name: '4571N2',
          makeId: '80',
        },
        {
          name: '4581N2',
          makeId: '80',
        },
        {
          name: '4907N2',
          makeId: '80',
        },
        {
          name: '500',
          makeId: '80',
        },
        {
          name: '504',
          makeId: '80',
        },
        {
          name: '5245',
          makeId: '80',
        },
        {
          name: '5316F5',
          makeId: '80',
        },
        {
          name: '5316Х5',
          makeId: '80',
        },
        {
          name: '533',
          makeId: '80',
        },
        {
          name: '5334',
          makeId: '80',
        },
        {
          name: '5335',
          makeId: '80',
        },
        {
          name: '5336',
          makeId: '80',
        },
        {
          name: '533603',
          makeId: '80',
        },
        {
          name: '533605',
          makeId: '80',
        },
        {
          name: '53362',
          makeId: '80',
        },
        {
          name: '533630',
          makeId: '80',
        },
        {
          name: '53366',
          makeId: '80',
        },
        {
          name: '5337',
          makeId: '80',
        },
        {
          name: '53371',
          makeId: '80',
        },
        {
          name: '5337А2',
          makeId: '80',
        },
        {
          name: '5340',
          makeId: '80',
        },
        {
          name: '5340C2',
          makeId: '80',
        },
        {
          name: '5340В2',
          makeId: '80',
        },
        {
          name: '5340Е9',
          makeId: '80',
        },
        {
          name: '5340С3',
          makeId: '80',
        },
        {
          name: '538',
          makeId: '80',
        },
        {
          name: '54229',
          makeId: '80',
        },
        {
          name: '543',
          makeId: '80',
        },
        {
          name: '5432',
          makeId: '80',
        },
        {
          name: '543205',
          makeId: '80',
        },
        {
          name: '54322',
          makeId: '80',
        },
        {
          name: '54323',
          makeId: '80',
        },
        {
          name: '543240',
          makeId: '80',
        },
        {
          name: '54328',
          makeId: '80',
        },
        {
          name: '54329',
          makeId: '80',
        },
        {
          name: '5432А3',
          makeId: '80',
        },
        {
          name: '54331',
          makeId: '80',
        },
        {
          name: '5440',
          makeId: '80',
        },
        {
          name: '544008',
          makeId: '80',
        },
        {
          name: '544019',
          makeId: '80',
        },
        {
          name: '544028',
          makeId: '80',
        },
        {
          name: '544069',
          makeId: '80',
        },
        {
          name: '5440C9',
          makeId: '80',
        },
        {
          name: '5440Е9',
          makeId: '80',
        },
        {
          name: '5440С5',
          makeId: '80',
        },
        {
          name: '5516',
          makeId: '80',
        },
        {
          name: '551605',
          makeId: '80',
        },
        {
          name: '551608',
          makeId: '80',
        },
        {
          name: '5537',
          makeId: '80',
        },
        {
          name: '5549',
          makeId: '80',
        },
        {
          name: '555026',
          makeId: '80',
        },
        {
          name: '5550C3',
          makeId: '80',
        },
        {
          name: '5550М4',
          makeId: '80',
        },
        {
          name: '5550С3',
          makeId: '80',
        },
        {
          name: '5550С5',
          makeId: '80',
        },
        {
          name: '5551',
          makeId: '80',
        },
        {
          name: '555102',
          makeId: '80',
        },
        {
          name: '5634',
          makeId: '80',
        },
        {
          name: '5903С2',
          makeId: '80',
        },
        {
          name: '5904С2',
          makeId: '80',
        },
        {
          name: '5907C2',
          makeId: '80',
        },
        {
          name: '5917С2',
          makeId: '80',
        },
        {
          name: '6303',
          makeId: '80',
        },
        {
          name: '630305',
          makeId: '80',
        },
        {
          name: '630308',
          makeId: '80',
        },
        {
          name: '6310Е9',
          makeId: '80',
        },
        {
          name: '6312',
          makeId: '80',
        },
        {
          name: '631208',
          makeId: '80',
        },
        {
          name: '6312C3',
          makeId: '80',
        },
        {
          name: '6312C5',
          makeId: '80',
        },
        {
          name: '6312А8',
          makeId: '80',
        },
        {
          name: '6312В5',
          makeId: '80',
        },
        {
          name: '6312С9',
          makeId: '80',
        },
        {
          name: '6317F5',
          makeId: '80',
        },
        {
          name: '6317F9',
          makeId: '80',
        },
        {
          name: '6422',
          makeId: '80',
        },
        {
          name: '642205',
          makeId: '80',
        },
        {
          name: '642208',
          makeId: '80',
        },
        {
          name: '64227',
          makeId: '80',
        },
        {
          name: '64229',
          makeId: '80',
        },
        {
          name: '642508',
          makeId: '80',
        },
        {
          name: '6430C9',
          makeId: '80',
        },
        {
          name: '6432Н9',
          makeId: '80',
        },
        {
          name: '650108',
          makeId: '80',
        },
        {
          name: '650128',
          makeId: '80',
        },
        {
          name: '6501C5',
          makeId: '80',
        },
        {
          name: '6501E9',
          makeId: '80',
        },
        {
          name: '6501V6',
          makeId: '80',
        },
        {
          name: '6501А8',
          makeId: '80',
        },
        {
          name: '6501С9',
          makeId: '80',
        },
        {
          name: '6516',
          makeId: '80',
        },
        {
          name: '6516V8',
          makeId: '80',
        },
        {
          name: '6516Е8',
          makeId: '80',
        },
        {
          name: '6516М9',
          makeId: '80',
        },
        {
          name: '6516С9',
          makeId: '80',
        },
        {
          name: '651705',
          makeId: '80',
        },
        {
          name: '690GC3',
          makeId: '80',
        },
        {
          name: '6950С5',
          makeId: '80',
        },
        {
          name: '8378',
          makeId: '80',
        },
        {
          name: '8561',
          makeId: '80',
        },
        {
          name: '8926',
          makeId: '80',
        },
        {
          name: '931020',
          makeId: '80',
        },
        {
          name: '9380',
          makeId: '80',
        },
        {
          name: '938060',
          makeId: '80',
        },
        {
          name: '9386',
          makeId: '80',
        },
        {
          name: '9397',
          makeId: '80',
        },
        {
          name: '9758',
          makeId: '80',
        },
        {
          name: '975830',
          makeId: '80',
        },
        {
          name: 'KrASZ',
          makeId: '80',
        },
        {
          name: 'KrASZ-M43BC0',
          makeId: '80',
        },
        {
          name: 'Зубренок',
          makeId: '80',
        },
        {
          name: 'МАЗ',
          makeId: '80',
        },
      ],
    },
    {
      id: 81,
      make: 'МАЗ-МАН',
      models: [
        {
          name: '540546',
          makeId: '81',
        },
        {
          name: '652546',
          makeId: '81',
        },
      ],
    },
    {
      id: 82,
      make: 'МЗКТ',
      models: [
        {
          name: '6515',
          makeId: '82',
        },
        {
          name: '65151',
          makeId: '82',
        },
      ],
    },
    {
      id: 83,
      make: 'ПАЗ',
      models: [
        {
          name: '37421',
          makeId: '83',
        },
      ],
    },
    {
      id: 84,
      make: 'РАФ',
      models: [
        {
          name: '2920',
          makeId: '84',
        },
      ],
    },
    {
      id: 85,
      make: 'САЗ',
      models: [
        {
          name: '3502',
          makeId: '85',
        },
        {
          name: '3503',
          makeId: '85',
        },
        {
          name: '3507',
          makeId: '85',
        },
      ],
    },
    {
      id: 86,
      make: 'УАЗ',
      models: [
        {
          name: '2206 груз.',
          makeId: '86',
        },
        {
          name: '2360',
          makeId: '86',
        },
        {
          name: '3303',
          makeId: '86',
        },
        {
          name: '3741',
          makeId: '86',
        },
        {
          name: '3909 Фермер',
          makeId: '86',
        },
        {
          name: '452',
          makeId: '86',
        },
        {
          name: '452 груз.',
          makeId: '86',
        },
      ],
    },
    {
      id: 89,
      make: 'Урал',
      models: [
        {
          name: '375',
          makeId: '89',
        },
        {
          name: '377',
          makeId: '89',
        },
        {
          name: '4320',
          makeId: '89',
        },
        {
          name: '4420',
          makeId: '89',
        },
        {
          name: '5557',
          makeId: '89',
        },
        {
          name: '63685',
          makeId: '89',
        },
        {
          name: 'Урал',
          makeId: '89',
        },
      ],
    },
  ];
}
