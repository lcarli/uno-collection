# 🎴 UNO Collection Tracker

Site estático para rastrear sua coleção de cartas UNO, baseado nas seções **UNO Spinoffs** e **Standard UNO Cards** do [unovariations.com](https://www.unovariations.com/every-type-of-uno-card-game-and-spinoff).

🌐 **Acesse:** [https://lcarli.github.io/uno-collection/](https://lcarli.github.io/uno-collection/)

- **129 itens** catalogados (86 spinoffs + 43 standard).
- Itens possuídos aparecem destacados com o selo **✓ Possuo**.
- Filtros por seção, status (possuído/faltando) e busca por nome/ano.
- **Tudo hard coded:** catálogo em `data.json` e lista de possuídos no array `OWNED_IDS` dentro de `app.js`. A página é somente leitura.

## ➕ Como adicionar itens

Tudo é feito **pelo código** (não pela página).

### Adicionar um item novo ao catálogo
Edite `data.json` e adicione um objeto:

```json
{
  "id": "uno-spinoffs-meu-item-2025",
  "section": "Uno Spinoffs",
  "name": "Meu Item Novo",
  "year": "2025",
  "image": "https://www.unovariations.com/images/Boxes/Meu_Item.jpg"
}
```

### Marcar um item como possuído
Edite `app.js` e adicione o `id` do item no array `OWNED_IDS`:

```js
const OWNED_IDS = [
  "uno-spinoffs-meu-item-2025",
  // ...
];
```

Faça commit e push — o GitHub Pages atualiza automaticamente.

## 🚀 Publicar no GitHub Pages

No repositório do GitHub:
1. Vá em **Settings → Pages**.
2. Em **Source**, escolha branch `main` e pasta `/ (root)`.
3. Salve. Sua página estará em `https://<seu-usuario>.github.io/uno-collection/`.

## 📁 Estrutura

- `index.html` — página principal
- `styles.css` — estilos
- `app.js` — lógica de renderização + array `OWNED_IDS` com os itens possuídos (hard coded)
- `data.json` — catálogo dos itens (gerado a partir de unovariations.com)

## ℹ️ Créditos das imagens

As imagens são carregadas diretamente de `unovariations.com` (referência externa). Todos os direitos das imagens pertencem aos seus respectivos proprietários.
