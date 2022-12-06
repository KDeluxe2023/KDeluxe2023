<h1 align="center">Karachan Deluxe 2023 v0.4.3 BETA</h1>
<h3 align="center">Największe rozszerzenie z nowymi funkcjami do forum młodzieżowo katolickiego</h3>
<hr/>

**Wymagania**
* Firefox [(o wsparciu dla chrome)](https://github.com/KDeluxe2023/KDeluxe2023/issues/1)
* Tampermonkey

**Instalacja**
* Instalujesz [addon tampermonkey](https://www.tampermonkey.net/) do przeglądarki
* Instalujesz [userscript z repo](https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js)

**Dostępne funkcje**
* Autoscroll - Dodaje opcje automatycznego przewijania freda, którą można w(y)łączyć na samym dole strony
* Anti Bible - Nie pozwala na załadowanie biblii (htmlshiv.js)
* Advanced Filters - Filtry ala ublock ułatwiające korzystanie z czana, w tym heurystyczne
* Better Embeds - Zamienia ciężkie embedy na miniaturki z tytułem, które przekierowują do filmu
* Smart Boards - Ukrywa /noc/ kiedy nie jest dostępna, ukrywa /4/, [wkrutce] a w nocy dodaje lampy na całej stronie i lekko ją przyciemnia
* Blind Mode (TTS) - Dodaje obok postów opcję text to speech czyli czytania na głos (męski/żeński)
* <del>New Keyframe Animations - Dodaje różne nowe filtry, np. #robercik, #R</del>
* Dangerous Bambo - Dodaje biegającego murzynka (bambo) na dole ekranu
* Ban Checker - Pokazuje czerwony napis na górze deski jeśli masz bana
* Lower Default Volume - Obniża domyślną głośność w playerze video, przydatne w FF
* <del>Jump To Post - Pozwala przechodzić do następnego/poprzedniego postu wybranego użytkownika</del>
* Image Preview Anti-Eyestrain - Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy
* Catalog Curb - Pozwala krawężnikować z poziomu katalogu
* UID Curb - Pozwala krawężnikować poszczególnych anonów we fredach
* Teoria Chaosu™ Integration - Wyświetla player radioradio podczas audycji claude'a (█▬█ █ ▀█▀)
* Fix Thread WatchList OOB - Przywraca listę obserwowanych fredów do lewego górnego rogu
* Auto Follow - Automatycznie obserwuje temat, w którym napiszemy posta (obecnie nie działa z fast reply)
* Password Changer - Zmienia hasło na losowe przy każdym załadowaniu strony
* Fred Dumper - Pozwala zapisać obecnie otwarty fred jako jpg, dodatkowo pozwala pobrać też obrazki osobno w zipie
* Rich Stats - Dodaje okienko z różnymi statystykami odnośnie twojej aktywności na forum

Dodatkowo w konsoli jest dostępny obszerny log z wykonywania skryptu i profilowanie czasowe

Przekreślone pozycje są zepsute lub na tyle zjebane że wymagają przepisania, zapraszam do robienia pull requestów

**Do zrobienia**
* zmiana tytułu deski
* zintegrować i przepisać [konfident+](https://greasyfork.org/en/scripts/370095-konfident/code)
* secret: anony bez skryptu widzą tylko ciąg losowych słów i znaków, a ci ze skryptem pasek w kolorze i żeby rozkodować trzeba podać hasło, [stary skrypt](https://pastebin.com/Qv1pd284)
* autokrawężnik z filtrami (nazwa obrazka/substring w głównym poście freda)
* możliwośc wpisania nicku w formularzu wysyłania posta, za pomocą nicku można spingować kogoś np. wpisujemy do posta @stały_słuchacz i wtedy u tego anona pojawia się [powiadomienie](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) z dźwiękiem, można to oprzeć na odpytywanie search.php ajaxem
* poprawienie pobierania plików żeby nie pobrać thumbnaila albo dodanie jakiegoś downloader żeby pobrać całą nitkę lub bobrazki z nitki
* uproszczone sagowanie
* <b>przesunąć wszystkie pętle iterujące po postach do jednej wspólnej, tej na końcu pliku</b>
* spoilerowanie obrazka na stałe (po hashu)
* ulepszone tytuły stron
* content freeze (usunięte posty są oznaczane jako usunięte i nie znikają po odświezeniu strony (trzeba mieć otwartego freda))
* przepisany, odbugowany fastreply
* zaimportować jakieś gówna z [kurahen premium](https://github.com/Kurahen-Premium/Kurahen-Premium)
* system powiadomień w faviconie, [inspiracja](https://pastebin.com/NazxdcsU)
* pełna lista wordfiltrów w kreatorze posta
* zamienianie słowofiltrów w polu treści posta w czasie rzeczywistym
* worldfilter bypass (zapobiega banom za słowofiltry na które jest autoban itp)
* ukrywanie postow <x odpowiedzi x do wyboru samemu
* opcja pisania tekstem zalgo
* helper do [trójsiły](https://software.hixie.ch/utilities/cgi/unicode-decoder/character-identifier?characters=%C2%A0%C2%A0%E2%96%B2+)
* usprawnienia do wyszukiwarki chanowej

**Historia wersji**

Pojawi się po zakończeniu bety
