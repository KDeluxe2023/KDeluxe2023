# Change Log
Wszystkie warte uwagi zmiany w tym projekcie są udokumentowane w tym pliku
Jeśli aktualizacja nie jest wspomniana na liście oznacza to, że nie zawiera nic ważnego

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
