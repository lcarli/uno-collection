# 🎴 UNO Collection Tracker

Site estático para rastrear sua coleção de cartas UNO, baseado nas seções **UNO Spinoffs** e **Standard UNO Cards** do [unovariations.com](https://www.unovariations.com/every-type-of-uno-card-game-and-spinoff).

- **129 itens** catalogados (86 spinoffs + 43 standard).
- Clique em qualquer carta para marcar como possuída.
- Filtros por seção, status (possuído/faltando) e busca por nome/ano.
- Dados salvos automaticamente no `localStorage` do navegador.
- Botões de **Exportar/Importar JSON** para backup.

## 🚀 Publicar no GitHub Pages

```bash
cd uno-collection-tracker
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/uno-collection-tracker.git
git push -u origin main
```

Depois, no repositório do GitHub:
1. Vá em **Settings → Pages**.
2. Em **Source**, escolha branch `main` e pasta `/ (root)`.
3. Salve. Sua página estará em `https://<seu-usuario>.github.io/uno-collection-tracker/`.

## 📁 Estrutura

- `index.html` — página principal
- `styles.css` — estilos
- `app.js` — lógica de tracking
- `data.json` — catálogo dos itens (gerado a partir de unovariations.com)

## ℹ️ Créditos das imagens

As imagens são carregadas diretamente de `unovariations.com` (referência externa). Todos os direitos das imagens pertencem aos seus respectivos proprietários.
