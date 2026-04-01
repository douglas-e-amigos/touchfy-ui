# Projeto Arquitetural do Software

Documento construído a partido do **Modelo BSI - Doc 005 - Documento de Projeto Arquitetual do Software** que pode ser encontrado no
link:https://docs.google.com/document/d/1i80vPaInPi5lSpI7rk4QExnO86iEmrsHBfmYRy6RDSM/edit?usp=sharing

# 01 - Visão Geral do Sistema

O sistema é uma plataforma de streaming de música inspirada no Spotify, desenvolvida como projeto acadêmico na disciplina de Engenharia de Software. O objetivo é permitir que ouvintes descubram e consumam músicas, artistas façam upload de seu conteúdo, e administradores gerenciem a plataforma.

## Decisões arquiteturais centrais

- **Backend como monolito modular** em Java 25 + Spring Boot - simplicidade operacional com fronteiras de domínio bem definidas por pacotes Java.
- **Frontend como SPA com SSR seletivo** em Next.js - melhor experiência de usuário e SEO via App Router.
- **Separação clara entre** dados relacionais (PostgreSQL), objetos binários (MinIO) e sessão/cache.

## Perfis de usuário

| Perfil | Responsabilidades |
|---|---|
| Ouvinte | Consome músicas, cria playlists, curte e acessa histórico |
| Artista | Faz upload de músicas e álbuns, gerencia seu catálogo |
| Administrador | Gerencia usuários, conteúdo e configurações da plataforma |

## Módulos de domínio

- **Auth / Users** - autenticação, autorização e perfis
- **Músicas / Álbuns / Artistas** - catálogo e metadados
- **Playlists** - criação e gerenciamento
- **Streaming / Player** - entrega de áudio via presigned URL
- **Busca** - pesquisa full-text por músicas, artistas e álbuns
- **Histórico / Curtidas** - registro de eventos de reprodução e likes

# 02 — Visão de Contexto (C4 — Nível 1)

Mostra os atores externos e como eles interagem com o sistema como um todo, sem entrar em detalhes internos.

## Diagrama

![Visão de contexto](images/c4_context_diagram.svg)

## Atores externos

| Ator | Tipo | Interação |
|---|---|---|
| Ouvinte | Pessoa | Navega pelo catálogo, ouve músicas, gerencia playlists e curtidas |
| Artista | Pessoa | Faz upload de músicas e álbuns, gerencia seu conteúdo |
| Administrador | Pessoa | Gerencia usuários, conteúdo e configurações da plataforma |

## Sistemas externos

| Sistema | Tipo | Papel |
|---|---|---|
| MinIO | Armazenamento de objetos | Armazena arquivos de áudio, capas de álbuns e avatares |
| PostgreSQL 15 | Banco de dados relacional | Armazena todos os dados estruturados da aplicação |

## Observações

- O frontend (Next.js) é parte interna do sistema e não aparece como ator externo neste nível.
- O MinIO é acessado tanto pelo backend (para gerar presigned URLs) quanto diretamente pelo navegador (para streaming de áudio), mas essa distinção só aparece no nível de containers.

# 03 — Visão de Containers (C4 — Nível 2)

Mostra como o sistema se divide em unidades deployáveis e como elas se comunicam entre si.

## Diagrama

![Visão de Container](images/c4_container_diagram.svg)

## Containers

| Container | Tecnologia | Responsabilidade |
|---|---|---|
| Next.js App | Next.js + TypeScript | Interface de usuário; SSR para páginas públicas, CSR para player e dashboards |
| Monolito Modular | Java 25 + Spring Boot | Lógica de negócio, autenticação, geração de presigned URLs, persistência |
| PostgreSQL 15 | PostgreSQL | Armazenamento relacional de todos os dados estruturados |
| MinIO | MinIO (S3-compatible) | Armazenamento de objetos binários (áudio, imagens) |

## Comunicações

| De | Para | Protocolo | Descrição |
|---|---|---|---|
| Next.js | Spring Boot | HTTPS / REST + JSON | Todas as operações de dados e autenticação |
| Spring Boot | PostgreSQL | JDBC (Spring Data JPA) | Leitura e escrita de dados relacionais |
| Spring Boot | MinIO | S3 API (SDK) | Geração de presigned URLs; upload no fluxo do artista |
| Next.js | MinIO | HTTPS (presigned URL) | Streaming de áudio direto — sem passar pelo backend |

## Decisão: presigned URLs para streaming

O áudio **nunca trafega pelo servidor Java**. O backend apenas gera uma URL temporária assinada (expira em ~60s) que o navegador usa para requisitar o arquivo diretamente ao MinIO via HTTP Range Requests. Isso atende ao **RNF04** (início de reprodução rápido) e evita que o backend se torne gargalo de I/O.
