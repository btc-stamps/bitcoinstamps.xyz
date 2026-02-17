---
title: "Whitepaper de Bitcoin Stamps"
description: "Documentación técnica fundacional de Bitcoin Stamps: arquitectura del protocolo, especificaciones técnicas y fundamentos del ecosistema"
leoType: "whitepaper"
audience: "technical"
mentions: ["bitcoin-stamps", "src-20", "src-101", "src-721", "olga", "counterparty", "utxo"]
---

# Whitepaper de Bitcoin Stamps

Documentación técnica fundacional del protocolo Bitcoin Stamps, su arquitectura y los principios que guían su desarrollo.

## Resumen Ejecutivo

Bitcoin Stamps es un protocolo metaprotocolo construido sobre Bitcoin que permite almacenar datos arbitrarios directamente en el conjunto UTXO de Bitcoin. A diferencia de protocolos que dependen de OP_RETURN o witnesses, Bitcoin Stamps utiliza salidas multisig para garantizar que los datos sean **permanentes e imposibles de eliminar** incluso si los nodos de pruning eliminan datos de transacciones antiguos.

## Arquitectura Técnica

### Almacenamiento en Multisig

Los datos de Bitcoin Stamps se codifican en claves públicas falsas dentro de salidas multisig P2MS:

```
OP_2 <clave_datos_1> <clave_datos_2> <clave_pública_real> OP_3 OP_CHECKMULTISIG
```

Esto garantiza:
- **Permanencia**: Los datos en el conjunto UTXO no pueden ser podados
- **Inmutabilidad**: No puede ser modificado una vez confirmado
- **Verificabilidad**: Cualquiera puede verificar los datos en la cadena

### Codificación Base64

Los datos de imagen se codifican en Base64 y se incrustan en las claves públicas falsas, con el prefijo `stamp:` para identificación del protocolo.

## Protocolos del Ecosistema

### SRC-20: Tokens Fungibles
- Operaciones: DEPLOY, MINT, TRANSFER
- Almacenamiento: Transacciones Bitcoin con datos JSON incrustados
- Rastreo: Indexador de estado mantenido por la comunidad
- Ejemplo: KEVIN - primer token SRC-20 con lanzamiento justo

### SRC-101: Sistema de Nombres
- Nombres legibles por humanos para direcciones Bitcoin
- Resolución de nombres descentralizada en la cadena
- Hace el ecosistema más accesible

### SRC-721: NFTs Avanzados
- Capacidades recursivas para colecciones complejas
- Herencia de rasgos entre tokens
- Composición on-chain

### OLGA: Protocolo de Almacenamiento Optimizado
- Codificación más eficiente para reducción de tarifas
- Compatible con todos los tipos de stamps
- Reduce la barrera de entrada para creadores

## Modelo de Seguridad

### Inmutabilidad
Los stamps son inmutables porque:
1. Los datos están en el conjunto UTXO (no podables por nodos de archivado)
2. Las transacciones de Bitcoin son finales después de suficientes confirmaciones
3. No hay operador centralizado que pueda eliminar o modificar datos

### Verificación
Cualquier participante puede verificar la autenticidad de un stamp:
- El indexador de código abierto puede reconstruirse desde el génesis
- Los datos en bruto son visibles en cualquier nodo completo de Bitcoin
- No se requiere confianza en terceros

## Infraestructura

### Stampchain.io
La infraestructura fundacional del ecosistema Bitcoin Stamps:
- Creado por los fundadores originales: mikeinspace, Arwyn, Reinamora
- Primer sitio en presentar Bitcoin Stamps al mundo
- Primer servicio de mint SRC-20
- API pública para desarrolladores e integradores

## Recursos Técnicos

- **[Código Fuente](https://github.com/stampchain-io)** - Implementación de referencia
- **[API REST →](/es/tutorials/api-integration)** - Documentación de integración
- **[SDK →](/es/tutorials/sdk-integration)** - Herramientas para desarrolladores
- **[Especificaciones de Protocolos →](/es/protocols/)** - Documentación técnica detallada

---

*El protocolo Bitcoin Stamps representa una innovación fundamental en el almacenamiento de datos en Bitcoin: permanente, sin confianza, y construido sobre la blockchain más segura del mundo.*
