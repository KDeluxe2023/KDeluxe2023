# Change Log
Wszystkie warte uwagi zmiany w tym projekcie są udokumentowane w tym pliku

Jeśli aktualizacja nie jest wspomniana na liście oznacza to, że nie zawiera nic ważnego

## [0.9.0] - 07/04/23 19:30

## Dodano
- moduł blind_mode_tts: przepisano całkowicie od zera
- moduł blind_mode_tts: przyczepia się do nowych postów dodanych przez pageloader/autoupdate
- moduł prev_next: przyczepia się do nowych postów dodanych przez pageloader/autoupdate
- moduł new_keyframe_anims: dostępny ponownie, będzie pisany od nowa niedługo

## Zmieniono
- moduł blind_mode_tts: nie korzysta już z zewnętrznego API

## Naprawiono
- moduł blind_mode_tts: nie czyta linków i emotek
- moduł prev_next: refactoring i optymalizacja, nullchecki

## [0.8.9] - 07/04/23 04:51

## Dodano
- moduł ban_checker: pokazuje teraz czas do końca bana i przekierowuje po kliknięciu

## Naprawiono
- moduł anti_bible: działa teraz na overboardzie

## Zmieniono
- timery wydajnościowe przeniesiono do funkcji load_module (z użyciem console.time)
- moduł anti_bible: refactoring i drobne optymalizacje
- moduł filters: optymalizacja, elementy są teraz dodatkowo całkowicie usuwane
- moduł auto_scroll: przepisany do vanilla js
- moduł anti_screamer: usunięto bo był bezużyteczny na większości urządzeń

## [0.8.8] - 22/02/23 09:12

## Zmieniono
- tryb full_compability: został usunięty bo nie jest już prawie do niczego potrzebny
- moduł anti_bible: działa teraz na wszystkich przeglądarkach (inna metoda)
- moduł filters: zmieniono kolejność uruchamiania filtrów i dodano ukrywanie "ankiety anonów"
- moduł radioradio: nie wyświetla się już we wtorki (ty zakało kurierska)
- moduł clickable_boardname: przekierowuje teraz na zerową przeglądanej deski zamiast odświeżać strone

## Dodano
- moduł enhanced_postform: otrzymał sub-opcje pozwalającą odbindować mitsubowski keylistener
- moduł enhanced_postform: zmienia nazwe checkboxa "Ukryj obrazek" na "Spoiler"
- moduł spoiler_revealer: odkrywa teraz też obrazki pod spoilerem
- moduł uid_curb: działa natychmiastowo na posty dodane przez auto-update, usuwa zamiast ukrywać

## [0.8.6] - 05/02/23 16:53

## Zmieniono
- moduł filters: zmieniono metodę ukrywania elementów na lepszą i poprawiono akceptowania regulaminów
- moduł uid_curb: przepisano cały moduł, jest bardziej czytelny i zwięzły

## Naprawiono
- moduł uid_curb: nie pokazuje się już na postach systemowych [#20](https://github.com/KDeluxe2023/KDeluxe2023/issues/20)
- moduł spoiler_reaveler: omyłkowo usunięte w ostatniej aktualizacji, teraz przywrócony

## Dodano
- moduł quick_search: pozwala na szybki dostęp do wyszukiwarki mitsubowskiej

## [0.8.5] - 03/02/23 09:28

## Naprawiono
- błąd z printowaniem zmiennych do debugowania (całkowicie psuło to KDeluxe na niektórych przeglądarkach)
- moduł filters: dodano sprawdzenie czy element istnieje przed usunięciem go (całkowicie psuło to moduł na niektórych przeglądarkach)

## [0.8.4] - 29/01/23 00:55

## Naprawiono
- moduł community styles: modern roach ładuje sie teraz poprawnie ale sam css jest dalej rozejbany
- moduł crocodile scanner: przepisano i poprawiono

## [0.8.3] - 29/01/23 00:24

## Dodano
- moduł crocodile scanner: wyszukuje linki do krokodyli i zamienia je na ikonke

## [0.8.2] - 27/01/23 07:50

## Dodano
- moduł community styles: dodaje nowe style css do wyboru w ustawieniach mitsuby
- github pages do ładowania statycznych zasobów jak css
## Zmieniono
- moduł dangerous bambo: został wypierdolony bo dawał żeżuncje potencjalnym użytkownikom

## [0.8.1] - 23/01/23 01:10

## Zmieniono
- moduł clickable boardname: to teraz "banner f5" i pozwala odświeżyć stronę przez kliknięcie całego banneru (obrazka lub nazwy deski), zmieniono też metodę działa z ułomnej na normalną

## [0.8.0] - 15/01/23 13:38

### Dodano
- moduł clickable boardname: pozwala odświeżyć/wrócić na zerową boarda na którym jesteś poprzez kliknięcie nagłówka z jego nazwą
### Zmieniono
- priorytet ładowania filtrów jest wyższy
- moduł enhanced postform: popout to teraz opcjonalna funkcja, którą można wyłączyć w ustawieniach
- moduł enhanced postform: zalgo to teraz opcjonalna funkcja, którą można wyłączyć w ustawieniach

## [0.7.9] - 06/01/22 01:56

### Zmieniono
- usunięto zepsute moduły z interfejsu
- moduł enhanced_postform ma teraz większy priorytet ładowania
### Naprawiono
- sprawdzenie dostępności jquery zostało usunięte bo nie działało dobrze na wszystkich konfiguracjach

## [0.7.8] - 25/12/22 23:52

### Dodano
- error handling do module loadera, teraz wyświetli nam przeglądarkowy alert jeśli nie można było załadować jakiegoś modułu
### Zmieniono
- moduł ban_checker sprawdza teraz status bana natychmiast po załadowaniu strony, a potem co każde 10 sekund
- ścieżka specjalnego modułu user_interface została zmieniona na katalog root
### Naprawiono
- moduł enhanced_postform jest teraz w pełni sprawny i nie stripuje już eventów z elementów, przepisano go też na vanilla js

## [0.7.7] - 17/12/22 21:45
 
### Zmieniono
- moduł new_keyfame_animations: przeniesiono regułki podmieniania do tablicy 
### Naprawiano
- moduł new_keyframe_animations: nie odczepia już eventów do innych elementów w postach, np. eventu podglądu cytowanego posta

## [0.7.6] - 17/12/22 10:16
 
### Zmieniono
- moduł prev_next: przyśpieszono o ~10%
- moduł uid_curb: przyśpieszono o ~90%
- moduł enhanced_postform: przepisany częściowo do vanilla js, dalej jest rozjebany lekko
### Naprawiano
- moduł radio_radio nie robi już niepotrzebnych requestów
 
## [0.7.4] - 15/12/22 18:00

### Dodano
- opcję odczepiania formularza do pisania postów, taki formularz działa jak fastreply z tą różnicą, że się nie buguje w dużych fredach tak jak mitsubowskie fastreply
 
## [0.7.3] - 15/12/22 14:00
 
### Dodano
- moduł prev/next (jump to post) został przywrócony
### Zmieniono
- moduł prev/next został zoptymalizowany i działa 100% szybciej
