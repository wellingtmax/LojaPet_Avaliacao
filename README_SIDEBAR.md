# 🛍️ LojaPet - Menu Lateral Implementation

## 📖 Guia para Colaboradores

### 🎯 **Resumo da Implementação**
Implementação completa de um menu lateral responsivo com submenus para navegação intuitiva na LojaPet.

---

## 🔧 **Setup Rápido**

### **1. Arquivos Principais:**
```
├── index.html          # HTML principal com sidebar
├── style.css           # Estilos completos do sidebar  
├── produtos.js         # JavaScript funcional
├── PULL_REQUEST.md     # Documentação detalhada
└── README.md           # Este arquivo
```

### **2. Como Rodar:**
```bash
# Abra o arquivo diretamente no navegador:
file:///caminho/para/index.html

# Ou use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000
```

---

## 🎨 **Estrutura do Sidebar**

### **HTML Structure:**
```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <h3>🛍️ Categorias</h3>
    <button class="sidebar-close">✕</button>
  </div>
  
  <nav class="sidebar-nav">
    <ul class="sidebar-menu">
      <!-- Itens do menu com submenus -->
    </ul>
  </nav>
</aside>

<button class="sidebar-toggle">☰</button>
<div class="sidebar-overlay"></div>
```

### **CSS Classes:**
```css
.sidebar                 # Container principal (220px)
.sidebar.active          # Estado aberto  
.sidebar-header          # Cabeçalho com título e botão fechar
.sidebar-menu            # Lista principal (flex column)
.menu-item               # Item individual do menu
.menu-link               # Link com ícone + texto + seta
.submenu                 # Lista de subitens
.submenu.active          # Submenu expandido
.sidebar-toggle          # Botão abrir (☰)
.sidebar-toggle.hidden   # Botão oculto quando menu aberto
.sidebar-overlay         # Fundo escuro mobile
```

---

## ⚙️ **Funcionalidades JavaScript**

### **Event Listeners:**
```javascript
// Abrir sidebar
sidebarToggle.click → sidebar.classList.add('active')

// Fechar sidebar  
sidebarClose.click → closeSidebar()
sidebarOverlay.click → closeSidebar()
ESC key → closeSidebar()

// Submenus
menuLink.click → toggle submenu visibility
```

### **Estados Principais:**
```javascript
// Sidebar fechado (padrão)
sidebar: transform: translateX(-100%)
toggle button: visible
overlay: hidden

// Sidebar aberto
sidebar: transform: translateX(0)  
toggle button: hidden
overlay: visible (mobile)
```

---

## 📱 **Responsividade**

### **Desktop (>768px):**
- Sidebar desliza da esquerda (220px)
- Botão toggle sempre visível
- Sem overlay de fundo

### **Mobile (≤768px):**  
- Sidebar fullscreen (250px)
- Overlay escuro atrás
- Botão reposicionado no topo

### **Breakpoints:**
```css
@media (max-width: 768px) {
  .sidebar {
    top: 0;
    height: 100vh;
    width: 250px;
  }
}
```

---

## 🎯 **Menu Structure**

```
🏠 Home
🦴 Rações
   ├── Ração Birbo
   ├── Ração Dog Plus  
   ├── Ração Gold
   ├── Ração Mix Dog
   ├── Ração Multi
   ├── Ração Nutrive
   └── Ração Origen
   
🐱 Produtos para Gatos
   ├── Ração Premium
   ├── Ração Receita  
   ├── Ração Pacato
   └── Areia Higiênica
   
🎾 Acessórios
   ├── Brinquedos
   ├── Camas
   ├── Comedouros
   ├── Coleiras e Guias
   └── Escovas
   
🧴 Higiene e Limpeza
   ├── Shampoos
   └── Produtos de Limpeza
   
ℹ️ Sobre Nós
📧 Contato
```

---

## 🐛 **Debugging Guide**

### **Problemas Comuns:**

#### **1. Menu não abre:**
```javascript
// Verificar se elementos existem
console.log(document.getElementById('sidebar'));
console.log(document.getElementById('sidebarToggle'));
```

#### **2. Submenus não expandem:**
```javascript
// Verificar event listeners
document.querySelectorAll('.menu-link[data-submenu]').forEach(link => {
  console.log(link.getAttribute('data-submenu'));
});
```

#### **3. Responsividade quebrada:**
```css
/* Verificar media queries */
@media (max-width: 768px) {
  .sidebar { /* estilos mobile */ }
}
```

#### **4. Botão não some:**
```javascript
// Verificar classe hidden
console.log(sidebarToggle.classList.contains('hidden'));
```

---

## 🔄 **Como Modificar**

### **Adicionar Nova Categoria:**
```html
<li class="menu-item has-submenu">
  <a href="#" class="menu-link" data-submenu="nova-categoria">
    <span class="menu-icon">🔥</span>
    <span>Nova Categoria</span>
    <span class="submenu-arrow">▼</span>
  </a>
  <ul class="submenu" id="submenu-nova-categoria">
    <li><a href="pagina1.html">Item 1</a></li>
    <li><a href="pagina2.html">Item 2</a></li>
  </ul>
</li>
```

### **Mudar Cores:**
```css
.sidebar {
  background: linear-gradient(135deg, #SEU_GRADIENTE);
}

.menu-link:hover {
  background: rgba(255, 255, 255, 0.15);
  border-left: 4px solid #SUA_COR;
}
```

### **Ajustar Largura:**
```css
.sidebar {
  width: 240px; /* Nova largura */
}

@media (max-width: 768px) {
  .sidebar {
    width: 280px; /* Nova largura mobile */
  }
}
```

---

## ✅ **Checklist para Colaboradores**

### **Antes de Comitar:**
- [ ] Testou no Chrome, Firefox, Safari
- [ ] Testou responsividade mobile
- [ ] Verificou todos os links do menu
- [ ] Testou abertura/fechamento em diferentes telas
- [ ] Validou performance (sem travamentos)
- [ ] Conferiu se não quebrou outras funcionalidades

### **Testes Recomendados:**
- [ ] Redimensionar janela do navegador
- [ ] Testar em dispositivo mobile real
- [ ] Verificar todos os submenus
- [ ] Testar tecla ESC
- [ ] Verificar se botão some/aparece corretamente

---

## 📚 **Recursos e Referências**

### **CSS:**
- Flexbox Guide: [CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- CSS Transforms: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

### **JavaScript:**
- Event Listeners: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- ClassList API: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

---

## 🚀 **Performance Tips**

1. **CSS Transforms** são mais performáticos que mudanças de position
2. **Transitions** devem ter duração máxima de 0.3s para UX fluida
3. **Event delegation** para menus dinâmicos futuros
4. **Debounce** em resize events para performance

---

## 👨‍💻 **Autor**
**Wellington Oliveira** - Desenvolvedor Front-end  
📅 Desenvolvido em: 01/07/2025  
🎯 Projeto: LojaPet Menu Lateral

---

**🎉 Happy Coding!** Se tiverem dúvidas, só chamar!
