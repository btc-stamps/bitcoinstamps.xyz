---
title: "SIPs: Propuestas de Mejora de Stamps"
description: "Proceso de gobernanza descentralizada para evolucionar los protocolos Bitcoin Stamps a través de Stamps Improvement Proposals"
leoType: "protocol"
audience: "technical"
mentions: ["sips", "bitcoin-stamps", "governance", "src-20", "olga", "community"]
---

# SIPs: Propuestas de Mejora de Stamps

El proceso formal para proponer, debatir e implementar mejoras a los protocolos Bitcoin Stamps.

<SipRegistry />

## ¿Qué es un SIP?

Un **SIP (Stamps Improvement Proposal)** es un documento de diseño que proporciona información a la comunidad Bitcoin Stamps, o describe una nueva característica para los protocolos o sus procesos.

El proceso SIP está inspirado en los BIPs de Bitcoin (Bitcoin Improvement Proposals) y los EIPs de Ethereum, adaptado a los valores de la comunidad Bitcoin Stamps.

## Tipos de SIPs

### SIP de Estándares
Propone cambios a la especificación del protocolo que afectan la compatibilidad o interoperabilidad:
- Nuevos protocolos (ej. SRC-721, OLGA)
- Modificaciones a protocolos existentes
- Nuevas operaciones o campos

### SIP de Proceso
Describe o propone cambios a procesos:
- Cambios al proceso SIP mismo
- Herramientas y entornos de desarrollo
- Pautas de gobernanza

### SIP Informativo
Proporciona información general o pautas, sin proponer nueva funcionalidad.

## Proceso SIP

### Etapas

```
1. Idea        → Discusión informal en Discord/GitHub
2. Borrador    → SIP escrito y abierto para comentarios
3. Revisión    → Período de revisión comunitaria
4. Último Llamado → Ventana de comentarios final (14 días)
5. Final       → SIP aceptado y especificación completada
6. Activo      → Implementado en el ecosistema
```

### Requisitos de un SIP

Un SIP debe incluir:
- **Resumen**: Descripción concisa de la propuesta
- **Motivación**: Por qué es necesario este cambio
- **Especificación**: Detalles técnicos completos
- **Implementación de referencia**: Código demostrable (cuando aplique)
- **Compatibilidad hacia atrás**: Análisis de impacto en versiones anteriores
- **Consideraciones de seguridad**: Riesgos potenciales y mitigaciones

## Cómo Contribuir

### Proponer una Idea

1. **Discute primero**: Comparte tu idea en el [Discord de Bitcoin Stamps](https://discord.gg/bitcoinstamps) o en GitHub Issues
2. **Evalúa el soporte**: Determina si la comunidad está interesada
3. **Escribe el borrador**: Crea el documento SIP completo
4. **Envía para revisión**: Crea un Pull Request en el repositorio de SIPs

### Revisar SIPs Existentes

- Lee y comenta SIPs activos en proceso de revisión
- Prueba implementaciones de referencia
- Reporta problemas de especificación o seguridad
- Vota (implícitamente mediante implementación) en SIPs finales

## SIPs Notables

### OLGA (SIP de Almacenamiento)
El protocolo OLGA fue propuesto e implementado a través del proceso SIP, demostrando cómo el proceso puede mejorar significativamente la eficiencia del ecosistema sin fragmentarlo.

### Extensiones SRC-20
Múltiples mejoras a SRC-20 han pasado por el proceso SIP, incluyendo nuevas operaciones y optimizaciones de indexación.

## Recursos

- **[GitHub SIPs](https://github.com/stampchain-io/stamps-sips)** - Repositorio oficial de SIPs
- **[Discord #governance](https://discord.gg/bitcoinstamps)** - Canal de discusión de gobernanza
- **[Especificaciones de Protocolos →](/es/protocols/)** - Documentación técnica actual

---

*El proceso SIP encarna los valores de Bitcoin Stamps: mejora descentralizada, consenso comunitario, y transparencia técnica.*
