# Sintonia (App) — monorepo

Este repositório contém o MVP do **Sintonia** (mobile + API mínima).

## Estrutura
- `apps/mobile`: app mobile (iOS/Android)
- `apps/api`: backend mínimo (contas/metadados/compartilhamento)
- `packages/*`: código compartilhado

## Princípio de privacidade
Dados clínicos detalhados devem permanecer **on-device**. O backend armazena apenas metadados operacionais e controles de compartilhamento.

