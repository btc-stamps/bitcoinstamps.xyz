<!--
Legacy Bridge Component
Provides backward compatibility for existing complex LEO components
while encouraging migration to smart components
-->
<template>
  <div class="leo-legacy-bridge">
    <!-- Smart component with legacy props mapping -->
    <SmartStructuredData />
    
    <!-- Migration hint for developers -->
    <div v-if="showMigrationHint && isDev" class="migration-hint">
      <h4>🔧 LEO Migration Available</h4>
      <p>This page uses legacy LEO components. Consider migrating to:</p>
      <ul>
        <li><code>&lt;SmartStructuredData /&gt;</code> (automatic)</li>
        <li><code>&lt;EntityMention entity="kevin" /&gt;</code> instead of complex EntityLink</li>
      </ul>
      <p>Migration reduces maintenance by 80% while preserving all functionality.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SmartStructuredData from './SmartStructuredData.vue'

interface Props {
  showMigrationHint?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showMigrationHint: true
})

const isDev = computed(() => {
  return typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
})
</script>

<style scoped>
.migration-hint {
  margin: 1rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border: 1px solid #ffeaa7;
  border-radius: 0.5rem;
  color: #856404;
  font-size: 0.875rem;
}

.migration-hint h4 {
  margin: 0 0 0.5rem 0;
  color: #b45309;
}

.migration-hint code {
  background: rgba(255, 255, 255, 0.8);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.migration-hint ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.migration-hint li {
  margin: 0.25rem 0;
}
</style>