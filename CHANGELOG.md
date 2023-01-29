# Change Log
Wszystkie warte uwagi zmiany w tym projekcie są udokumentowane w tym pliku

Jeśli aktualizacja nie jest wspomniana na liście oznacza to, że nie zawiera nic ważnego

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
