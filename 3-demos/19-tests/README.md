# Installation

```bash
npm i -D vitest supertest cypress
```

## Objectifs

Les tests = écriture du code qui permet de tester que son code a le comportement ou le résultat attendu

## Avantages

- Eviter la regression du code (introduction future d'un bug suite une évolution du code)
- Documentation

## 3 niveaux avec pour chaque des librairies

- Pour les tests unitaires : plus petite unité de code à tester (par exemple une fonction)
    - vitest (Les devs derrière VueJS framework Front JavaScript)
    - jest (Ancien qui a été detroné par vitest)
    - node:test node:assert
- Intégrations : tester au moins brique d'une fonctionnalité (exemples APIs)
    - vitest
    - jest
    - supertest (permet de tester les routes notamment des APIs)
- End to End (E2E) : tester une fonctionnalité ou un parcours client dans sa globalité (interface l'interaction via l'interface graphique proposée au public)
    - cypress
    - playwright

## Pratique

- Le pattern AAA
    - Arrange : préparer l'environnement de test (on doit avoir tout pour tester)
    - Act : l'appel de la fonction à tester
    - Assert : vérification du résultat obtenu après l'appel et le résultat attendu
-  Le fichier test aura une extension spécifique .test.js ou .spec.js ou .cy.j
- TDD : piloté par les tests (écriture des tests avant le code final)
- RGR : Red Green Refactor
- Tester une chose à la fois => 1 test = 1 assertion (vérification)