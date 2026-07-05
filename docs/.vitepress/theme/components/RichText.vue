<script setup lang="ts">
// Renders an ordered array of RichNode fragments inline, preserving the exact
// text (spaces are embedded inside each fragment) so localized prose that mixes
// plain text with <EntityMention>, <em> and <code> renders identically to the
// original hand-written template. EntityMention is globally registered by the
// theme, so it needs no import here.
//
// The v-for body is intentionally written on a single line with no whitespace
// between branches: any newline/indent between elements would be condensed to a
// stray space by Vue's template compiler and shift the rendered copy.
import { isEntityNode, type RichNode } from './stampsHomeContent'

defineProps<{ nodes: RichNode[] }>()

const textOf = (n: RichNode): string => (typeof n === 'string' ? n : n.text)
const tagOf = (n: RichNode): string | undefined =>
  typeof n === 'string' ? undefined : (n as { tag?: string }).tag
</script>

<template>
  <template v-for="(n, i) in nodes" :key="i"><EntityMention v-if="isEntityNode(n)" :entity="n.entity" :variant="n.variant">{{ n.text }}</EntityMention><em v-else-if="tagOf(n) === 'em'">{{ textOf(n) }}</em><code v-else-if="tagOf(n) === 'code'">{{ textOf(n) }}</code><template v-else>{{ textOf(n) }}</template></template>
</template>
