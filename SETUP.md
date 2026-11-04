# SETUP — plataforma Tanguá Fiscal

O GitHub continua sendo a fonte do código. Cloudflare Workers + D1 entram só depois do merge, com endereço gratuito `*.workers.dev`. Esta sessão não publicou o Worker nem criou o banco remoto.

Não envie senhas, tokens ou `BETTER_AUTH_SECRET` pelo chat.

## 1. Conta Cloudflare

1. Crie uma conta em https://dash.cloudflare.com/sign-up
2. Confirme o e-mail.
3. No plano gratuito: 100 mil requisições de Worker/dia, D1 com 5 milhões de linhas lidas/dia e 100 mil escritas/dia (confira os limites atuais no painel; não contrate pago).

## 2. Conectar o repositório GitHub

1. O remoto continua `https://github.com/Armando0101/Estudar-fiscal-de-posturas`.
2. Depois do merge da branch `plataforma-perfis-nuvem-ranking`, faça o deploy a partir de `main`.
3. Não misture GitHub Pages e Worker no mesmo endereço. Pages pode ficar até o Worker estar no ar.

## 3. Instalar Wrangler

```bash
npm install -g wrangler
wrangler login
```

## 4. Criar o D1

```bash
wrangler d1 create tango-fiscal
```

Copie o `database_id` gerado para `wrangler.toml`, no campo `database_id`.

Aplique a migração:

```bash
wrangler d1 execute tango-fiscal --file=migrations/0001_init.sql --remote
```

## 5. Better Auth

O cadastro usa o plugin `username` (login por usuário e senha). O Better Auth ainda exige um e-mail interno no `signUpEmail`. O servidor gera `u-<id>@internal.tango-fiscal.invalid`. Esse endereço não é de recuperação, não é exibido e não recebe mensagem.

Campos visíveis no cadastro: usuário, senha, apelido, e-mail de recuperação opcional.

## 6. Secrets e origens

```bash
wrangler secret put BETTER_AUTH_SECRET
```

Use pelo menos 32 bytes aleatórios. Não grave o valor em `wrangler.toml`.

Em `wrangler.toml`, ajuste:

- `BETTER_AUTH_URL` = URL pública do Worker, por exemplo `https://tango-fiscal.<sua-conta>.workers.dev`
- Se precisar de CORS extra, defina `ALLOWED_ORIGINS` como secret ou var com a mesma origem.

Cookies: `sameSite=lax`, `httpOnly`, `secure` em HTTPS.

## 7. Publicar o Worker com os estáticos

```bash
wrangler deploy
```

`wrangler.toml` aponta `main = src/index.js` e `[assets] directory = "."`. As rotas `/api/*` passam no Worker antes dos arquivos estáticos.

Não declare o site no ar até o `wrangler deploy` terminar sem erro.

## 8. Atualizar

```bash
git pull
wrangler deploy
```

Novas tabelas: acrescente `migrations/0002_....sql` e execute com `wrangler d1 execute`.

## 9. Desenvolvimento local (sem Wrangler)

```bash
npm install
npm start
```

Sobe `http://localhost:8787` com `node:sqlite` em `data/app.sqlite` e a mesma migração `0001_init.sql`.

Cópia de ambiente:

```bash
cp .dev.vars.example .dev.vars
```

Não commite `.dev.vars`.

## 10. Testes

```bash
npm test
```

Roda `tests/logic.test.mjs` e `tests/api.test.mjs`.

## 11. Migrar progresso antigo

O localStorage de outro domínio (GitHub Pages vs Worker) não migra sozinho.

1. No site antigo: **Exportar backup** (JSON).
2. No site novo: entre na conta e **Importar**, ou use o cartão **Migrar progresso deste navegador** se os dados ainda estiverem no mesmo aparelho.
3. A migração por conta ocorre uma vez (`migration_flags`). Não apaga caderno, simulados nem checklists.
4. Não execute `localStorage.clear()`.

## 12. Convidar amigos

1. Cada pessoa cria a própria conta (usuário + senha + apelido).
2. Um membro cria um grupo em Ranking.
3. O código de convite aparece uma vez. Mostre só a quem for entrar.
4. O ranking lista apelido, sequência, recorde e dias concluídos. Sem percentual de acertos.
5. Quem desmarcar “Aparecer no ranking” some da lista e não quebra o grupo.

## 13. Recuperação de conta

- E-mail opcional no cadastro/perfil.
- Chave de recuperação gerada no cadastro, exibida uma vez (copiar/baixar).
- Sem e-mail e sem chave, a perda da senha pode significar perda da conta.

## 14. Backup do D1

```bash
wrangler d1 export tango-fiscal --output=backup.sql --remote
```

Guarde o arquivo fora do repositório público.

## 15. O que depende de você

- Login na Cloudflare e `wrangler login`.
- Criar o D1 e colar o `database_id`.
- Definir `BETTER_AUTH_SECRET`.
- `wrangler deploy`.
- Apontar os amigos para a URL do Worker, não para o computador local.
