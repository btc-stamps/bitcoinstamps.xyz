---
title: "SRC-20 se vuelve nativo: independencia de Counterparty"
date: "2023-06-06"
author: "reinamora"
description: "El 6 de junio de 2023, en el bloque 793,068, SRC-20 se codificó directamente en Bitcoin por primera vez. El corte de Counterparty en el bloque 796,000 convirtió la codificación nativa en la regla de consenso."
tags: ["history", "src-20", "counterparty", "milestone", "consensus"]
leoType: "blog"
---

# SRC-20 se vuelve nativo: independencia de Counterparty

El 6 de junio de 2023, en el bloque 793,068, <EntityMention entity="src-20">SRC-20</EntityMention> se codificó directamente en Bitcoin por primera vez. Es un hito de soberanía: el estándar de tokens dejó de depender de otro protocolo y empezó a escribirse directamente en la cadena base.

## El punto de partida en Counterparty

Las primeras transacciones <EntityMention entity="src-20">SRC-20</EntityMention> viajaban sobre <EntityMention entity="counterparty">Counterparty</EntityMention>, un metaprotocolo que vivía en Bitcoin desde 2014. Counterparty le dio al estándar una vía de codificación funcional en sus primeros días, y eso permitió que la comunidad avanzara rápido.

Pero depender de otro protocolo significa heredar sus supuestos y sus limitaciones. Para un estándar construido en torno a la permanencia y la autosuficiencia, esa dependencia era un cabo suelto.

## Codificación nativa en el bloque 793,068

El bloque 793,068 es donde <EntityMention entity="src-20">SRC-20</EntityMention> obtuvo su propia codificación nativa en Bitcoin. A partir de ahí, un despliegue (deploy), una acuñación (mint) o una transferencia podían escribirse directamente en Bitcoin sin pasar en absoluto por Counterparty. Los datos del token aterrizan en el mismo almacenamiento basado en UTXO que le da a cada stamp su permanencia.

## El corte en el bloque 796,000

La codificación nativa por sí sola no era toda la historia. El protocolo también trazó una línea firme. En el bloque 796,000, el 26 de junio de 2023, el <EntityMention entity="src-20">SRC-20</EntityMention> basado en <EntityMention entity="counterparty">Counterparty</EntityMention> pasó a ser inválido. Después de esa altura, la regla de consenso es clara: SRC-20 es codificación nativa de Bitcoin, y punto.

Ese corte es lo que convirtió una nueva capacidad en un estándar de verdad. No hay ambigüedad sobre qué transacciones cuentan. Los indexadores, las wallets y cualquiera que valide la cadena siguen la misma regla, anclada a un bloque específico.

## Por qué importa aquí la soberanía

La independencia de <EntityMention entity="counterparty">Counterparty</EntityMention> significa que <EntityMention entity="src-20">SRC-20</EntityMention> se sostiene solo sobre Bitcoin. Sin un segundo protocolo en el que confiar, sin un conjunto de reglas externo que rastrear. La garantía de permanencia que empezó con el primer stamp ahora cubre los tokens fungibles de principio a fin, decidida por completo por el consenso de Bitcoin.

---

*Lee la especificación de codificación en el [Whitepaper de Bitcoin Stamps](/en/whitepaper/), y explora el ecosistema en [stampchain.io](https://stampchain.io).*
