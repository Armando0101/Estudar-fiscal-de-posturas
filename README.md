# Estudar Fiscal de Posturas — Tanguá/RJ

Planner compartilhado para o concurso de Fiscal de Posturas (código 101, banca IBDO, prova 22/11/2026). Banco autoral de treino (`q01`–`q120`). Não é prova oficial.

## O que o site faz

- Cronograma de 02/11 a 22/11/2026, com página de cada dia.
- Banco, treino rápido, simulados, caderno, revisões, flashcards.
- Conta (usuário e senha), nuvem e ranking privado por grupo.
- Visitante: progresso só neste navegador; backup JSON de emergência.

## Como rodar

```bash
npm install
npm start
```

Abre `http://localhost:8787`. Testes: `npm test`.

Publicação na Cloudflare: veja `SETUP.md`. O frontend publicado pelo Worker está em `public/` (HTML, CSS e JS). `src/`, testes, migrações e secrets não vão para a internet. O GitHub Pages atual continua no ar até o Worker ser implantado por você. Esta cópia não publica sozinha.

## Conta

- Cadastro: usuário, senha, apelido. E-mail de recuperação opcional.
- Guarde a chave de recuperação na hora do cadastro.
- Sair da conta não apaga o histórico na nuvem.

## Ranking

Grupos com convite. Ordenação: sequência atual, recorde, dias concluídos. Checklists não comprovam atenção real. Percentual de acertos não entra no ranking.

## Auditoria IBDO 2019

A prova de Paraibuna/SP (amostra) está descrita em `AUDITORIA-IBDO-2019.md`. Não copie legislação de outro município para Tanguá. Tanguá 01/2026 usa quatro alternativas (A–D).
