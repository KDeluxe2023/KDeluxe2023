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
|Vocaroo Embeds|Zamienia linki do vocaroo w postach na osadzony player|&check;|
|Autoscroll|Dodaje opcje toggle do automatycznego scrollowania freda|&check;|
|Teoria Chaosu™ Integration|Wyświetla player radioradio podczas audycji kloda|&check;|█▬█ █ ▀█▀
|Konfident+|Pozwala śledzić dalsze losy zgłoszonych przez siebie postów|&cross;|kopiuj-wklejka, trzeba ją przepisać
|Advanced Filters|Inteligentne filtry à la ublock ułatwiające korzystanie ze strony|&check;|
|Enhanced PostForm|Ulepszony formularz postowania, z listą wordfiltrów i nie tylko|&check;|[#23](https://github.com/KDeluxe2023/KDeluxe2023/issues/23)
|Better Embeds|Zamienia ciężkie jutubowe embedy na miniaturki z tytułem, które przekierowują do wideo|&check;|
|Rich Stats|Dodaje okienko z różnymi statystykami odnośnie twojej aktywności na forum|&check;|[#6](https://github.com/KDeluxe2023/KDeluxe2023/issues/6)
|Fred Dumper|Pozwala zapisać obecnie otwarty fred jako jpg, pozwala pobrać też obrazki osobno w zipie|&cross;|[#5](https://github.com/KDeluxe2023/KDeluxe2023/issues/5), [#3](https://github.com/KDeluxe2023/KDeluxe2023/issues/3)
|Ban Checker|Pokazuje czerwony napis na górze deski kiedy dostanie się bana|&check;|
|External Links|Wszystkie linki otwierają się teraz w nowym oknie|&check;|
|Catalog Curb|Pozwala krawężnikować tematy z poziomu katalogu|&check;|[#26](https://github.com/KDeluxe2023/KDeluxe2023/issues/26)
|Jump To Post|Pozwala skakać do następnego/poprzedniego postu wybranego użytkownika|&check;|
|UID Curb|Pozwala krawężnikować poszczególnych postujących we fredach|&check;|[#20](https://github.com/KDeluxe2023/KDeluxe2023/issues/20)
|Password Changer|Zmienia hasło na losowe przy każdym załadowaniu strony|&check;|
|Auto Follow|Automatycznie obserwuje temat, w którym napiszemy posta|&check;|[#22](https://github.com/KDeluxe2023/KDeluxe2023/issues/22)
|Image Preview Anti-Eyestrain|Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy|&check;|
|Smart Boards|Ukrywa /noc/ kiedy nie jest dostępna, zawsze ukrywa /4/|&check;|
|Lower Default Volume|Obniża domyślną głośność w playerze video, przydatne w FF|&cross;|[#11](https://github.com/KDeluxe2023/KDeluxe2023/issues/11)
|Fix Thread WatchList OOB|Przywraca listę obserwowanych fredów do lewego górnego rogu|&check;|
|New Keyframe Animations|Dodaje różne nowe filtry, np. #robercik, #R, #deluxe|&cross;|
|Anti Bible|Nie pozwala na załadowanie biblii|&check;|[działa tylko na firefox](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforescriptexecute_event)
|Blind Mode (TTS)|Dodaje obok postów opcję text to speech czyli czytania na głos (męski/żeński)|&cross;|totalnie rozjebany, [#24](https://github.com/KDeluxe2023/KDeluxe2023/issues/24), [#10](https://github.com/KDeluxe2023/KDeluxe2023/issues/10)
|ThreadWatcher Sort|Sortuje obserwowane fredy tak, że te z nowymi odpowiedziami są na początku|&cross;|totalnie rozjebany, [#12](https://github.com/KDeluxe2023/KDeluxe2023/issues/12)
|Dangerous Bambo|Dodaje biegającego murzynka (bambo) na dole ekranu|&check;|żeżuncja

**Do zrobienia (kolejność według priorytetu)**
* rozwiązać i usunąć wszystkie [tagi w kodzie](https://github.com/KDeluxe2023/KDeluxe2023/search?q=TO-DO%3A)
* dodać rozbudowaną klase pozwalającą na prace z interfejsem, np. tworzenie draggable windows, textboxów, sliderów, radiobuttonów, checkboxów, buttonów, comboboxów
* przepisać system zapisywania/odczytywania ustawień, chwilowo robi to za nas mitsuba
* ukrywanie postow <x odpowiedzi, x do wyboru samemu (slider)
* content freeze - usunięte posty są zapisywane w pamięci przeglądarki i "zamrożone" oraz widoczne z niższym opacity
* autokrawężnik z warunkiem, np. (substring)nazwa obrazka, (substring)treść głównego posta
* dodać niewidzialną spacje jako bbbutton do enhanced postform
* sprawdzić które znaki w nowym bbcode "zalgo" są banowane automatycznie
* przepisać konfident+ bo to stare gówno napisane przez innego anona
* usunąć czytanie linków i numerów postów z blind mode tts
* crocodile scanner - skanuje linki do portali informacyjnych w postach i zamienia je na ikonke krokodyla jeśli go wykryje
* standalone media player - żeby rozwiązać problem z niewidocznym suwakiem dźwięku
* zaimplementować mutationobserver w modułach które zmieniają treści postów (dodawanych przez pageloader i autoupdater we fredzie)
* sekret: możliwość pisania zaszyfrowanych postów z unikalną sygnaturą na końcu (np. ==SECRET) które można odszyfrować automatycznie domyślnym, publicznym hasłem. można też nadać hasło ręcznie, wtedy w polu posta zamiast tekstu pojawi się textbox z opcją wpisania hasła do sekretu
* system pingowania (w oparciu na odpytywanie search.php ajaxem): wpisujemy w formularzu posta pseudonim, za pomocą którego można spingować kogoś np. wpisujemy do posta @stały_słuchacz i wtedy u tego anona pojawia się [powiadomienie](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) z [dźwiękiem](https://stackoverflow.com/a/24749629)
* dodać obsługe reportów wysłanych z modala w konfident+, dodatkowo przenieść otiweranie zakładki konfident+ gdzieś indziej np. w róg ekranu (ikonka)
* opcja zmiany tytułu deski (textbox)
* spoilerowanie obrazka na stałe (po hashu)
* system powiadomień w faviconie, [inspiracja](https://pastebin.com/NazxdcsU)
* auto-[trójsiła](https://software.hixie.ch/utilities/cgi/unicode-decoder/character-identifier?characters=%C2%A0%C2%A0%E2%96%B2+)
