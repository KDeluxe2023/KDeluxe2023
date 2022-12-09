<h1 align="center">Karachan Deluxe 2023 v0.5.4 BETA</h1>
<h3 align="center">Największe rozszerzenie z nowymi funkcjami do forum młodzieżowo katolickiego</h3>
<hr/>

**Wymagania**
* Firefox / Chrome / Safari (?) / Opera 
* Addon pozwalający ładować userjs

**Instalacja**
* Instalujesz [addon violentmonkey](https://violentmonkey.github.io/get-it/)
* Instalujesz [userscript z repo](https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js)

**Jak zmienić ustawienia**

Ustawienia są tam gdzie ustawienia mitsuby (trybik)

![firefox_bKzkjwzFYE](https://user-images.githubusercontent.com/119752397/206005514-765ec49b-bb95-44d4-ab9b-7f7b08208280.png)

**Dostępne funkcje ([zaproponuj nowe](https://github.com/KDeluxe2023/KDeluxe2023/issues))**
* Autoscroll - Dodaje opcje automatycznego przewijania freda, którą można togglować
* Teoria Chaosu™ Integration - Wyświetla player radioradio podczas audycji claude'a (█▬█ █ ▀█▀)
* Advanced Filters - Inteligentne filtry à la ublock ułatwiające korzystanie ze strony
* Better Embeds - Zamienia ciężkie jutubowe embedy na miniaturki z tytułem, które przekierowują do wideo
* Rich Stats - Dodaje okienko z różnymi statystykami odnośnie twojej aktywności na forum
* Fred Dumper - Pozwala zapisać obecnie otwarty fred jako jpg, pozwala pobrać też obrazki osobno w zipie
* Blind Mode (TTS) - Dodaje obok postów opcję text to speech czyli czytania na głos (męski/żeński)
* Ban Checker - Pokazuje czerwony napis na górze deski kiedy dostanie się bana
* External Links - Wszystkie linki otwierają się teraz w nowym oknie
* Catalog Curb - Pozwala krawężnikować tematy z poziomu katalogu
* UID Curb - Pozwala krawężnikować poszczególnych postujących we fredach (działa tylko we fredzie)
* Password Changer - Zmienia hasło na losowe przy każdym załadowaniu strony
* Auto Follow - Automatycznie obserwuje temat, w którym napiszemy posta (obecnie nie działa z fast reply)
* Image Preview Anti-Eyestrain - Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy
* Smart Boards - Ukrywa /noc/ kiedy nie jest dostępna, zawsze ukrywa /4/
* Lower Default Volume - Obniża domyślną głośność w playerze video, przydatne w FF
* Fix Thread WatchList OOB - Przywraca listę obserwowanych fredów do lewego górnego rogu
* Dangerous Bambo - Dodaje biegającego murzynka (bambo) na dole ekranu
* Anti Bible - Nie pozwala na załadowanie biblii [(działa tylko na firefox)](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforescriptexecute_event)
* Profilowanie czasowe - w konsoli wyświetla nam czas jaki każda funkcja potrzebowała na załadowanie
* <del>New Keyframe Animations - Dodaje różne nowe filtry, np. #robercik, #R</del>
* <del>Jump To Post - Pozwala przechodzić do następnego/poprzedniego postu wybranego użytkownika</del>
* <del>ThreadWatcher Sort - Sortuje obserwowane fredy tak, że te z nowymi odpowiedziami są na początku</del>

Przekreślone pozycje są zepsute lub na tyle wolne że wymagają przepisania, [pull requesty](https://github.com/KDeluxe2023/KDeluxe2023/pulls) mile widziane

**Do zrobienia**
* zrobić [logo i faviconke](https://github.com/KDeluxe2023/KDeluxe2023/issues/9)
* <b>[przesunąć wszystkie pętle](https://github.com/KDeluxe2023/KDeluxe2023/issues/4) iterujące po postach do jednej wspólnej, tej na końcu pliku</b>
* content freeze - usunięte posty są zapisywane w pamięci i "zamrożone" oraz widoczne z niższym opacity
* dodać funkcje obsługującą dodawanie textboxów, buttonów, sliderów i comboboxów do UI
* sekret: możliwość pisania zaszyfrowanych postów z unikalną sygnaturą na końcu (np. ==SECRET) które można odszyfrować automatycznie domyślnym, publicznym hasłem. można też nadać hasło ręcznie, wtedy w polu posta zamiast tekstu pojawi się textbox z opcją wpisania hasła do sekretu
* system pingowania (w oparciu na odpytywanie search.php ajaxem): wpisujemy w formularzu posta pseudonim, za pomocą którego można spingować kogoś np. wpisujemy do posta @stały_słuchacz i wtedy u tego anona pojawia się [powiadomienie](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) z [dźwiękiem](https://stackoverflow.com/a/24749629)
* przepisać [konfident+](https://pastebin.com/raw/ELkn8CRb) i zintegrować do kdeluxe
* opcja zmiany tytułu deski (textbox)
* autokrawężnik z warunkiem, np. (substring)nazwa obrazka, (substring)treść głównego posta
* uproszczone sagowanie (checkbox)
* spoilerowanie obrazka na stałe (po hashu)
* fastreply fix (zdebugować i naprawić problem, najłatwiej przez napisanie nowego xD)
* system powiadomień w faviconie, [inspiracja](https://pastebin.com/NazxdcsU)
* pełna lista wordfiltrów w stylu #esesman, #gimbo w kreatorze posta
* worldfilter bypass (wstawia niewidzialne spacje lub zamienia znaki w wyrazach ze słowofiltrem)
* ukrywanie postow <x odpowiedzi, x do wyboru samemu (slider)
* opcja pisania tekstem zalgo
* auto-[trójsiła](https://software.hixie.ch/utilities/cgi/unicode-decoder/character-identifier?characters=%C2%A0%C2%A0%E2%96%B2+)
* usprawnienia do wyszukiwarki chanowej
* przepisać system zapisywania/odczytywania ustawień, chwilowo robi to za nas mitsuba
* rozwiązać i usunąć wszystkie [tagi w kodzie](https://github.com/KDeluxe2023/KDeluxe2023/search?q=TO-DO%3A)

**Historia wersji**

Pojawi się po zakończeniu bety, która zostanie zakończona po wprowadzeniu systemu pingowania, konfident+ i sekretów oraz generalnej optymalizacji
