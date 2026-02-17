---
title: "Guía de Integración API"
description: "Documentación completa de la API REST y guía de integración para los protocolos Bitcoin Stamps"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "src-101", "src-721", "olga", "api", "rest", "stampchain"]
---

# Guía de Integración API

Documentación completa de la API REST para integrar los protocolos Bitcoin Stamps en aplicaciones, exploradores y herramientas creativas.

## Acerca de Stampchain: La Infraestructura Fundacional

Stampchain sirve como la **infraestructura fundacional** del ecosistema Bitcoin Stamps. Creado por los tres fundadores de Bitcoin Stamps, Stampchain fue el primer sitio en presentar Bitcoin Stamps al mundo y el primer servicio de mint SRC-20.

**Rol actual**: Stampchain.io sigue sirviendo como servicio API fundacional, permitiendo a desarrolladores, artistas y empresas integrar la funcionalidad de Bitcoin Stamps.

## Endpoints de la API

### API de Tokens SRC-20

```bash
# Obtener información del token
GET /api/v2/src20/{tick}
GET /api/v2/src20/{tick}/holders
GET /api/v2/src20/{tick}/transactions

# Ejemplo: Datos del token KEVIN
curl https://stampchain.io/api/v2/src20/tick/KEVIN
```

### API de Bitcoin Stamps

```bash
# Obtener información del stamp
GET /api/v2/stamps/{id}
GET /api/v2/stamps/recent
GET /api/v2/stamps/search?q={consulta}

# Ejemplo: Obtener detalles del primer stamp de KEVIN
curl https://stampchain.io/api/v2/stamps/4258
```

### Ejemplos de Integración

```javascript
// Obtener datos del token KEVIN
async function getKevinData() {
  const response = await fetch('https://stampchain.io/api/v2/src20/tick/KEVIN');
  const tokenData = await response.json();

  return {
    supply: tokenData.max,
    holders: tokenData.holders_count,
    transactions: tokenData.tx_count
  };
}
```

## APIs Específicas por Protocolo

### Tokens SRC-20

```bash
GET /api/v2/src20                    # Listar todos los tokens
GET /api/v2/src20/{tick}            # Detalles del token
GET /api/v2/src20/{tick}/holders    # Distribución de tenedores
GET /api/v2/src20/{tick}/history    # Historial de transacciones
```

## Límites de Velocidad

- **Público**: 100 solicitudes/minuto
- **Autenticado**: 1000 solicitudes/minuto
- **Empresarial**: Límites personalizados para uso institucional

## Recursos

- **API Fundacional**: [https://stampchain.io/api/v1](https://stampchain.io/api/v1)
- **Documentación Interactiva**: [https://stampchain.io/docs](https://stampchain.io/docs)
- **Código Abierto**: [GitHub - stampchain-io](https://github.com/stampchain-io)
- **Soporte Comunitario**: [Bitcoin Stamps Discord](/es/community/)

---

*"In Lak'ech Ala K'in" — APIs construidas sobre infraestructura fundacional que sirve tanto a la creatividad individual como al crecimiento colectivo.*
