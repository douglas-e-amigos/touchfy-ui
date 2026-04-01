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
