# RM Character Explorer

Aplicação desenvolvida com **Next.js + TypeScript** para explorar personagens do universo **Rick and Morty**, com foco em **arquitetura escalável, boas práticas, performance, segurança e qualidade de código**.

Este projeto foi desenvolvido como estudo prático, aplicando conceitos de **feature-based architecture**, princípios de **Clean Architecture**, separação de responsabilidades e testes.

---

## 🚀 Tecnologias utilizadas

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Jest**
* **React Testing Library**

---

## 🏗️ Arquitetura e organização

O projeto foi estruturado com foco em **escalabilidade, manutenção e legibilidade**, utilizando uma abordagem **feature-based** combinada com separação por camadas.

### Estrutura principal

```bash
src/
├── app/
├── features/
│   └── characters/
│       ├── application/
│       ├── domain/
│       ├── infra/
│       ├── ui/
│       └── __tests__/
├── shared/
│   ├── lib/
│   ├── ui/
│   └── __tests__/
```

---

## 🧠 Padrões aplicados

### ✅ Feature-Based Architecture

Organização do código por contexto de negócio, facilitando crescimento e manutenção da aplicação.

---

### ✅ Clean Architecture (parcial)

Separação em camadas com responsabilidades bem definidas:

* **application** → casos de uso
* **domain** → entidades e contratos
* **infra** → acesso a API / repositórios
* **ui** → componentes, hooks

---

### ✅ Repository Pattern

A comunicação com a API foi abstraída em repositórios para desacoplamento da regra de negócio.

Exemplo:

```ts
CharactersRepository
ICharactersRepository
```

---

### ✅ Custom Hooks

Toda lógica de UI e navegação foi isolada em hooks reutilizáveis.

Exemplo:

```ts
usePagination
useApplyFilters
```

---

## ⚡ Performance e boas práticas

O projeto foi desenvolvido com foco em performance e experiência do usuário.

### 🔹 Suspense + Skeleton Loading

Uso de `Suspense` para melhorar a experiência durante carregamento.

---

### 🔹 Prefetch de paginação

A próxima página é pré-carregada automaticamente para melhorar navegação.

```ts
router.prefetch(...)
```

---

### 🔹 Query params sincronizados

Filtros e paginação sincronizados com URL.

Exemplo:

```bash
?page=2&status=alive
```

Isso melhora:

* experiência do usuário
* compartilhamento de links
* persistência do estado

---

### 🔹 Timeout e tratamento de erro

A camada de requisição possui timeout e tratamento robusto de erros.

```ts
AbortController
```

---

## 🧪 Testes

O projeto possui testes unitários cobrindo as principais camadas da arquitetura.

### Cobertura

* ✅ use cases (`application`)
* ✅ hooks
* ✅ componentes
* ✅ camada compartilhada (`httpRequest`)

### Exemplos testados

* paginação
* renderização de componentes
* retorno de use cases
* tratamento de timeout
* tratamento de erros da API

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

* evolução técnica
* boas práticas de mercado
* arquitetura escalável

---

## 📌 Aprendizados aplicados

* performance com Next.js
* arquitetura limpa
* separação por camadas
* tipagem avançada com TypeScript
* hooks customizados
* testes unitários
* mocks com Jest

---

## 🚀 Como rodar o projeto

1. Instale as dependências
```bash
npm install
```

2. Crie o arquivo `.env` ou `.env.local` com base no exemplo
```bash
.env.example
```

3. Preencha a variável de ambiente
```env
BASE_URL=https://rickandmortyapi.com/api
```

4. Rode o projeto
```bash
npm run dev
```

---

## 🧪 Rodar testes

```bash
npm run test
```

---

## 📷 Preview

![Preview do projeto](images/projeto.png)

---

## 👨‍💻 Autor

Desenvolvido por **Vinícius Fernandes**