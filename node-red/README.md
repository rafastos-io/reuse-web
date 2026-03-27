# Painel Administrativo ReUse — Node-RED

Painel de controle administrativo da plataforma **ReUse**, desenvolvido com Node-RED Dashboard como parte do trabalho de faculdade.

## Acesso ao Dashboard

Com o Node-RED rodando, acesse: [http://localhost:1880/ui](http://localhost:1880/ui)

---

## Funcionalidades

### 1. Métricas (aba Métricas)
Atualiza automaticamente a cada 30 segundos consumindo a API da ReUse.

- **Gráfico de pizza** — distribuição dos itens por status (Ativos / Pausados / Trocados)
- **Contadores** — Total Ativo, Pausados, Trocados

**Fluxo:** `Inject (30s)` → `Function` → `3× HTTP GET` → `Join (array)` → `Function` → `ui_chart + 3× ui_text`

### 2. Lista de Itens (aba Itens)
Tabela HTML com os 20 itens mais recentes da plataforma, atualizada a cada 30 segundos.

- Exibe título, categoria, status com badge colorido e ID
- Cores por status: verde (ACTIVE), amarelo (PAUSED), azul (TRADED), vermelho (DELETED)

**Fluxo:** `Inject (30s)` → `HTTP GET /api/items` → `Function (HTML)` → `ui_template`

### 3. Moderação de Itens (aba Moderação)
Permite alterar o status de qualquer item informando seu ID.

- Campo de texto para inserir o ID do item
- Botão **Pausar Item** — muda status para `PAUSED`
- Botão **Ativar Item** — muda status para `ACTIVE`
- Notificação de sucesso/erro no canto superior direito

**Fluxo:** `ui_text_input` → `Change (salva ID no context)` → `ui_button` → `Function (monta PATCH)` → `HTTP PATCH /api/items/:id` → `Function (verifica resposta)` → `ui_toast`

---

## APIs utilizadas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/items?status=ACTIVE` | Itens ativos |
| `GET` | `/api/items?status=PAUSED` | Itens pausados |
| `GET` | `/api/items?status=TRADED` | Itens trocados |
| `GET` | `/api/items` | Todos os itens (padrão: ACTIVE) |
| `PATCH` | `/api/items/:id` | Atualiza status de um item |

---

## Como importar no Node-RED

1. Abra o Node-RED em `http://localhost:1880`
2. Menu (≡) → **Import**
3. Selecione o arquivo `flows.json` desta pasta
4. Clique em **Import** e depois em **Implementar**

## Dependência

O dashboard requer o pacote `node-red-dashboard` instalado. Se não estiver:

```bash
cd ~/.node-red
npm install node-red-dashboard
```

Reinicie o Node-RED após instalar.
