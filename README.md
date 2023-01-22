<h1 align="center">Karachan Deluxe 2023 <a href='https://github.com/KDeluxe2023/KDeluxe2023/blob/main/CHANGELOG.md'>v0.8.0</a> BETA</h1>
<p align="center"><img src="https://user-images.githubusercontent.com/119752397/210906694-ee8dccf4-f47c-472a-877b-243a740bab76.png" alt="bobraz" width="600"/></p>
<h3 align="center">Największe, modularne rozszerzenie do forum młodzieżowo katolickiego</h3>
<hr/>

**Wymagania**
* Firefox / Chrome / Safari (?) / Opera 
* Addon pozwalający ładować userjs

**Instalacja**
* Instalujesz [addon violentmonkey](https://violentmonkey.github.io/get-it/)
* Instalujesz [userscript z repozytorium](https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js)

**Bezpieczeństwo**

Odpowiadając na liczne zarzuty jakoby ten projekt miałby być cyberwołyniem 2.0: kod jest publiczny i wszystko jest zawarte w tym repozytorium. Wbrew pozorom KDeluxe nie posiada żadnej funkcjonalności wykonującej automatyczne aktualizacje. Każdy moduł jest [pobierany z repo przez jsdelivr](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/karachan_deluxe2023.user.js#L34) z danego punktu w tym repo, które jest przedstawione w kodzie pod postacią [zhardcodowanego ID commita](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/karachan_deluxe2023.user.js#L25). W praktyce oznacza to, że niemożliwe jest wprowadzenie jakiejkolwiek zmiany w kodzie, z którą nie będzie się można wcześniej zapoznać. Poza tym kod jest prosty i bogaty w komentarze.

**Architektura modularna**

KDeluxe jest zaprojektowany w oparciu o system tzw. modułów czyli pojedynczych skryptów vanilla javascript, które odpowiadają za poszczególne funkcjonalności. Sam skrypt .user.js nie robi absolutnie nic, służy jedynie do ładowania reszty.

**Jak aktywować moduł**

Ustawienia modułów są tam gdzie ustawienia mitsuby (trybik). Gdy jakaś nowa funkcja zostanie dodana, trzeba kliknąć przycisk zapisu ustawień jeszcze raz żeby ją aktywować, nawet jeśli dana opcja jest zaznaczona jako aktywna.

![firefox_bKzkjwzFYE](https://user-images.githubusercontent.com/119752397/206005514-765ec49b-bb95-44d4-ab9b-7f7b08208280.png)

**Dostępne moduły ([zaproponuj nowe](https://github.com/KDeluxe2023/KDeluxe2023/issues))**

|Moduł|Opis|Stabilny|Uwagi
|---|---|---|---|
|[User Interface](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/user_interface.js)|Rysuje okienko z ustawieniami|&check;|[#27](https://github.com/KDeluxe2023/KDeluxe2023/issues/27)
|[Vocaroo Embeds](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/vocaroo_embeds.js)|Zamienia linki do vocaroo w postach na osadzony player|&check;|
|[Autoscroll](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/auto_scroll.js)|Dodaje opcje toggle do automatycznego scrollowania freda|&check;|
|[Teoria Chaosu™ Integration](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/radio_radio.js)|Wyświetla player radioradio podczas audycji kloda|&check;|█▬█ █ ▀█▀
|[Konfident+](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/konfident_plus.js)|Pozwala śledzić dalsze losy zgłoszonych przez siebie postów|&cross;|kopiuj-wklejka, trzeba ją przepisać
|[Advanced Filters](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/filters.js)|Inteligentne filtry à la ublock ułatwiające korzystanie ze strony|&check;|
|[Enhanced PostForm](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/enhanced_postform.js)|Ulepszony formularz postowania, z listą wordfiltrów i nie tylko|&check;|[#23](https://github.com/KDeluxe2023/KDeluxe2023/issues/23), [#28](https://github.com/KDeluxe2023/KDeluxe2023/issues/28)
|[Better Embeds](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/better_embeds.js)|Zamienia ciężkie jutubowe embedy na miniaturki z tytułem, które przekierowują do wideo|&check;|
|[Rich Stats](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/rich_stats.js)|Dodaje okienko z różnymi statystykami odnośnie twojej aktywności na forum|&check;|[#6](https://github.com/KDeluxe2023/KDeluxe2023/issues/6)
|[Fred Dumper](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/fred_dumper.js)|Pozwala zapisać obecnie otwarty fred jako jpg, pozwala pobrać też obrazki osobno w zipie|&cross;|[#5](https://github.com/KDeluxe2023/KDeluxe2023/issues/5), [#3](https://github.com/KDeluxe2023/KDeluxe2023/issues/3)
|[Ban Checker](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/ban_checker.js)|Pokazuje czerwony napis na górze deski kiedy dostanie się bana|&check;|
|[External Links](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/external_links.js)|Wszystkie linki otwierają się teraz w nowym oknie|&check;|
|[Catalog Curb](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/catalog_curb.js)|Pozwala krawężnikować tematy z poziomu katalogu|&check;|[#26](https://github.com/KDeluxe2023/KDeluxe2023/issues/26)
|[Jump To Post](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/prev_next.js)|Pozwala skakać do następnego/poprzedniego postu wybranego użytkownika|&check;|
|[UID Curb](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/uid_curb.js)|Pozwala krawężnikować poszczególnych postujących we fredach|&check;|[#20](https://github.com/KDeluxe2023/KDeluxe2023/issues/20)
|[Password Changer](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/password_changer.js)|Zmienia hasło na losowe przy każdym załadowaniu strony|&check;|
|[Auto Follow](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/auto_follow.js)|Automatycznie obserwuje temat, w którym napiszemy posta|&check;|[#22](https://github.com/KDeluxe2023/KDeluxe2023/issues/22)
|[Image Preview Anti-Eyestrain](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/anti_eyestrain.js)|Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy|&check;|
|[Smart Boards](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/smart_boards.js)|Ukrywa /noc/ kiedy nie jest dostępna, zawsze ukrywa /4/|&check;|
|[Spoiler Revealer](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/spoiler_revealer.js)|Odkrywa spoilery|&check;|
|[Lower Default Volume](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/lower_def_volume.js)|Obniża domyślną głośność w playerze video, przydatne w FF|&cross;|[#11](https://github.com/KDeluxe2023/KDeluxe2023/issues/11)
|[Fix Thread WatchList OOB](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/user_interface.js#L109)|Przywraca listę obserwowanych fredów do lewego górnego rogu|&check;|
|[New Keyframe Animations](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/new_keyframe_anims.js)|Dodaje różne nowe filtry, np. #robercik, #R, #deluxe|&cross;|
|[Anti Bible](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/karachan_deluxe2023.user.js#L51)|Nie pozwala na załadowanie biblii|&check;|[działa tylko na firefox](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforescriptexecute_event)
|[Blind Mode (TTS)](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/blind_mode_tts.js)|Dodaje obok postów opcję text to speech czyli czytania na głos (męski/żeński)|&cross;|totalnie rozjebany, [#24](https://github.com/KDeluxe2023/KDeluxe2023/issues/24), [#10](https://github.com/KDeluxe2023/KDeluxe2023/issues/10)
|[ThreadWatcher Sort](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/threadwatcher_sort.js)|Sortuje obserwowane fredy tak, że te z nowymi odpowiedziami są na początku|&cross;|totalnie rozjebany, [#12](https://github.com/KDeluxe2023/KDeluxe2023/issues/12)
|[Dangerous Bambo](https://github.com/KDeluxe2023/KDeluxe2023/blob/main/modules/dangerous_bambo.js)|Dodaje biegającego murzynka (bambo) na dole ekranu|&check;|żeżuncja

**Do zrobienia (kolejność według priorytetu)**
* rozwiązać i usunąć wszystkie [tagi w kodzie](https://github.com/KDeluxe2023/KDeluxe2023/search?q=TO-DO%3A)
* ukrywanie postow <x odpowiedzi, x do wyboru samemu (slider)
* content freeze - usunięte posty są zapisywane w pamięci przeglądarki i "zamrożone" oraz widoczne z niższym opacity
* autokrawężnik z warunkiem, np. (substring)nazwa obrazka, (substring)treść głównego posta
* usunąć czytanie linków i numerów postów z blind mode tts
* crocodile scanner - skanuje linki do portali informacyjnych w postach i zamienia je na ikonke krokodyla jeśli go wykryje
* standalone media player - żeby rozwiązać problem z niewidocznym suwakiem dźwięku
* zaimplementować mutationobserver w modułach które zmieniają treści postów (dodawanych przez pageloader i autoupdater we fredzie)
* sekret: możliwość pisania zaszyfrowanych postów z unikalną sygnaturą na końcu (np. ==SECRET) które można odszyfrować automatycznie domyślnym, publicznym hasłem. można też nadać hasło ręcznie, wtedy w polu posta zamiast tekstu pojawi się textbox z opcją wpisania hasła do sekretu
* system pingowania (w oparciu na odpytywanie search.php ajaxem): wpisujemy w formularzu posta pseudonim, za pomocą którego można spingować kogoś np. wpisujemy do posta @stały_słuchacz i wtedy u tego anona pojawia się [powiadomienie](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) z [dźwiękiem](https://stackoverflow.com/a/24749629)
* dodać obsługe reportów wysłanych z modala w konfident+, dodatkowo przenieść otiweranie zakładki konfident+ gdzieś indziej np. w róg ekranu (ikonka)
* moduł do zmiany tytułu deski
* moduł do powiadomień w faviconie, [inspiracja](https://pastebin.com/NazxdcsU)
* auto-[trójsiła](https://software.hixie.ch/utilities/cgi/unicode-decoder/character-identifier?characters=%C2%A0%C2%A0%E2%96%B2+)
