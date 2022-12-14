<h1 align="center">Karachan Deluxe 2023 <a href='https://github.com/KDeluxe2023/KDeluxe2023/blob/main/CHANGELOG.md'>v0.7.9</a> BETA</h1>
<p align="center"><img  src="https://user-images.githubusercontent.com/119752397/210906694-ee8dccf4-f47c-472a-877b-243a740bab76.png" alt="bobraz" width="600"/></p>
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

**Jak zmienić ustawienia**

Ustawienia są tam gdzie ustawienia mitsuby (trybik)
Gdy jakaś nowa funkcja zostanie dodana, musisz kliknąć przycisk zapisu ustawień jeszcze raz żeby ją aktywować, nawet jeśli dana opcja jest zaznaczona jako aktywna.

![firefox_bKzkjwzFYE](https://user-images.githubusercontent.com/119752397/206005514-765ec49b-bb95-44d4-ab9b-7f7b08208280.png)

**Dostępne funkcje ([zaproponuj nowe](https://github.com/KDeluxe2023/KDeluxe2023/issues))**

* Vocaroo Embeds - Zamienia linki do vocaroo w postach na osadzony player
* Autoscroll - Dodaje opcje automatycznego przewijania freda, którą można togglować
* Teoria Chaosu™ Integration - Wyświetla player radioradio podczas audycji claude'a (█▬█ █ ▀█▀)
* Konfident+ - Pozwala śledzić dalsze losy zgłoszonych przez siebie postów
* Advanced Filters - Inteligentne filtry à la ublock ułatwiające korzystanie ze strony
* Enhanced PostForm - Zmieniony formularz postowania, z listą wordfiltrów i nie tylko
* Better Embeds - Zamienia ciężkie jutubowe embedy na miniaturki z tytułem, które przekierowują do wideo
* Rich Stats - Dodaje okienko z różnymi statystykami odnośnie twojej aktywności na forum
* Fred Dumper - Pozwala zapisać obecnie otwarty fred jako jpg, pozwala pobrać też obrazki osobno w zipie
* Ban Checker - Pokazuje czerwony napis na górze deski kiedy dostanie się bana
* External Links - Wszystkie linki otwierają się teraz w nowym oknie
* Catalog Curb - Pozwala krawężnikować tematy z poziomu katalogu
* Jump To Post - Pozwala skakać do następnego/poprzedniego postu wybranego użytkownika
* UID Curb - Pozwala krawężnikować poszczególnych postujących we fredach (działa tylko we fredzie)
* Password Changer - Zmienia hasło na losowe przy każdym załadowaniu strony
* Auto Follow - Automatycznie obserwuje temat, w którym napiszemy posta (obecnie nie działa z fast reply)
* Image Preview Anti-Eyestrain - Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy
* Smart Boards - Ukrywa /noc/ kiedy nie jest dostępna, zawsze ukrywa /4/
* Lower Default Volume - Obniża domyślną głośność w playerze video, przydatne w FF
* Fix Thread WatchList OOB - Przywraca listę obserwowanych fredów do lewego górnego rogu
* Dangerous Bambo - Dodaje biegającego murzynka (bambo) na dole ekranu
* New Keyframe Animations - Dodaje różne nowe filtry, np. #robercik, #R, #deluxe
* Anti Bible - Nie pozwala na załadowanie biblii [(działa tylko na firefox)](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforescriptexecute_event)
* <del>Blind Mode (TTS) - Dodaje obok postów opcję text to speech czyli czytania na głos (męski/żeński)</del>
* <del>ThreadWatcher Sort - Sortuje obserwowane fredy tak, że te z nowymi odpowiedziami są na początku</del>

Przekreślone pozycje są zepsute lub na tyle wolne że wymagają przepisania, [pull requesty](https://github.com/KDeluxe2023/KDeluxe2023/pulls) mile widziane

**Do zrobienia**
* dodać niewidzialną spacje jako bbbutton do enhanced postform
* sprawdzić które znaki w nowym bbcode "zalgo" są banowane automatycznie
* poprawić konfident+, przepisać najlepiej bo to stare gówno
* naprawić blind mode tts
* usunąć czytanie linków i numerów postów z blind mode tts
* crocodile scanner - skanuje linki do portali informacyjnych w postach i zamienia je na ikonke krokodyla jeśli go wykryje
* standalone media player - żeby rozwiązać problem z niewidocznym suwakiem dźwięku
* zaimplementować mutationobserver w modułach które zmieniają treści postów (dodawanych przez pageloader i autoupdater we fredzie)
* content freeze - usunięte posty są zapisywane w pamięci i "zamrożone" oraz widoczne z niższym opacity
* dodać funkcje obsługującą dodawanie textboxów, buttonów, sliderów i comboboxów do UI
* sekret: możliwość pisania zaszyfrowanych postów z unikalną sygnaturą na końcu (np. ==SECRET) które można odszyfrować automatycznie domyślnym, publicznym hasłem. można też nadać hasło ręcznie, wtedy w polu posta zamiast tekstu pojawi się textbox z opcją wpisania hasła do sekretu
* system pingowania (w oparciu na odpytywanie search.php ajaxem): wpisujemy w formularzu posta pseudonim, za pomocą którego można spingować kogoś np. wpisujemy do posta @stały_słuchacz i wtedy u tego anona pojawia się [powiadomienie](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) z [dźwiękiem](https://stackoverflow.com/a/24749629)
* dodać obsługe reportów wysłanych z modala w konfident+, dodatkowo przenieść otiweranie zakładki konfident+ gdzieś indziej np. w róg ekranu (ikonka)
* opcja zmiany tytułu deski (textbox)
* autokrawężnik z warunkiem, np. (substring)nazwa obrazka, (substring)treść głównego posta
* spoilerowanie obrazka na stałe (po hashu)
* system powiadomień w faviconie, [inspiracja](https://pastebin.com/NazxdcsU)
* ukrywanie postow <x odpowiedzi, x do wyboru samemu (slider)
* auto-[trójsiła](https://software.hixie.ch/utilities/cgi/unicode-decoder/character-identifier?characters=%C2%A0%C2%A0%E2%96%B2+)
* przepisać system zapisywania/odczytywania ustawień, chwilowo robi to za nas mitsuba
* rozwiązać i usunąć wszystkie [tagi w kodzie](https://github.com/KDeluxe2023/KDeluxe2023/search?q=TO-DO%3A)
