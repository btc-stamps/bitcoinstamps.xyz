<script setup lang="ts">
import { data } from '../../data/sip-registry.data'

const githubUrl = (issue: number) =>
  `https://github.com/${data.repository}/issues/${issue}`

const statusColor: Record<string, string> = {
  active: 'var(--vp-c-success)',
  draft: 'var(--vp-c-info)',
  review: 'var(--vp-c-warning)',
  accepted: '#14b8a6',
  activated: '#a855f7',
  final: '#16a34a',
  superseded: 'var(--vp-c-text-3)',
  withdrawn: 'var(--vp-c-danger)',
  rejected: 'var(--vp-c-danger)',
}

const statusBg: Record<string, string> = {
  active: 'rgba(34,197,94,0.12)',
  draft: 'rgba(59,130,246,0.12)',
  review: 'rgba(245,158,11,0.12)',
  accepted: 'rgba(20,184,166,0.12)',
  activated: 'rgba(168,85,247,0.12)',
  final: 'rgba(22,163,74,0.12)',
  superseded: 'rgba(128,128,128,0.12)',
  withdrawn: 'rgba(239,68,68,0.12)',
  rejected: 'rgba(239,68,68,0.12)',
}

function sipById(num: string) {
  return data.sips.find((s) => s.number === num)
}

// SIPs sorted by phase for implementation order (exclude process docs and superseded)
const implementableSips = data.sips
  .filter((s) => s.phase !== null && s.status !== 'superseded')
  .sort((a, b) => (a.phase ?? 99) - (b.phase ?? 99))
</script>

<template>
  <div class="sip-registry">
    <!-- Registry Table -->
    <h2 id="sip-registry">SIP Registry</h2>
    <p>Current protocol proposals and their implementation status:</p>

    <div class="sip-table-wrap">
      <table class="sip-table">
        <thead>
          <tr>
            <th>SIP</th>
            <th>Title</th>
            <th>Status</th>
            <th>GitHub Issue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sip in data.sips" :key="sip.number">
            <td>
              <a :href="githubUrl(sip.issue)" target="_blank" rel="noopener">
                SIP-{{ sip.number }}
              </a>
            </td>
            <td>{{ sip.title }}</td>
            <td>
              <span
                class="sip-status-badge"
                :style="{
                  color: statusColor[sip.status] || 'var(--vp-c-text-2)',
                  background: statusBg[sip.status] || 'rgba(128,128,128,0.1)',
                }"
              >
                {{ sip.status.charAt(0).toUpperCase() + sip.status.slice(1) }}
              </span>
            </td>
            <td>
              <a :href="githubUrl(sip.issue)" target="_blank" rel="noopener">
                #{{ sip.issue }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Status Definitions -->
    <h3 id="status-definitions">Status Definitions</h3>
    <ul class="sip-status-list">
      <li v-for="(desc, status) in data.statusDefinitions" :key="status">
        <span
          class="sip-status-badge"
          :style="{
            color: statusColor[status] || 'var(--vp-c-text-2)',
            background: statusBg[status] || 'rgba(128,128,128,0.1)',
          }"
        >
          {{ status.charAt(0).toUpperCase() + status.slice(1) }}
        </span>
        <span class="sip-status-desc">{{ desc }}</span>
      </li>
    </ul>

    <!-- Implementation Roadmap -->
    <h2 id="implementation-roadmap">Implementation Roadmap</h2>
    <p>
      Strategic phasing ensures each foundation is battle-tested before
      dependent features build upon it.
    </p>

    <div class="sip-roadmap">
      <div
        v-for="phase in data.roadmap"
        :key="phase.phase"
        class="sip-phase-card"
      >
        <div class="sip-phase-header">
          <span class="sip-phase-number">Phase {{ phase.phase }}</span>
          <span class="sip-phase-name">{{ phase.name }}</span>
          <span class="sip-phase-weeks">Weeks {{ phase.weeks }}</span>
        </div>
        <p class="sip-phase-desc">{{ phase.description }}</p>

        <div class="sip-phase-sips">
          <template v-for="sipNum in phase.sips" :key="sipNum">
            <div v-if="sipById(sipNum)" class="sip-phase-sip-item">
              <a :href="githubUrl(sipById(sipNum)!.issue)" target="_blank" rel="noopener">
                SIP-{{ sipNum }}
              </a>
              <span class="sip-phase-sip-title">{{ sipById(sipNum)!.title }}</span>
              <span v-if="sipById(sipNum)!.effort" class="sip-phase-effort">
                {{ sipById(sipNum)!.effort }}
              </span>
              <span
                v-if="sipById(sipNum)!.softDependencies?.length"
                class="sip-phase-soft-dep"
              >
                Soft dep:
                {{ sipById(sipNum)!.softDependencies!.map((d) => 'SIP-' + d).join(', ') }}
              </span>
            </div>
          </template>
          <div v-if="phase.futureSips" class="sip-phase-future-note">
            Includes future SIPs not yet formally drafted
          </div>
        </div>
      </div>
    </div>

    <!-- Recommended Implementation Order -->
    <h2 id="recommended-implementation-order">Recommended Implementation Order</h2>

    <div class="sip-table-wrap">
      <table class="sip-table">
        <thead>
          <tr>
            <th>Priority</th>
            <th>SIP</th>
            <th>Effort</th>
            <th>Hard Dependencies</th>
            <th>Soft Dependencies</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sip, idx) in implementableSips" :key="sip.number">
            <td class="sip-priority">{{ idx + 1 }}</td>
            <td>
              <a :href="githubUrl(sip.issue)" target="_blank" rel="noopener">
                SIP-{{ sip.number }}
              </a>
              <span class="sip-order-title">{{ sip.title }}</span>
            </td>
            <td>{{ sip.effort || '—' }}</td>
            <td>
              <template v-if="sip.dependencies.length">
                {{ sip.dependencies.map((d) => 'SIP-' + d).join(', ') }}
              </template>
              <template v-else>None</template>
            </td>
            <td>
              <template v-if="sip.softDependencies?.length">
                {{ sip.softDependencies.map((d) => 'SIP-' + d).join(', ') }}
              </template>
              <template v-else>—</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Gating Criteria -->
    <h2 id="gating-criteria-between-phases">Gating Criteria Between Phases</h2>
    <p>Strategic checkpoints ensure stability before adding complexity:</p>

    <div class="sip-table-wrap">
      <table class="sip-table">
        <thead>
          <tr>
            <th>Gate</th>
            <th>Condition</th>
            <th>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gate in data.gating" :key="`${gate.from}-${gate.to}`">
            <td class="sip-gate-label">
              Phase {{ gate.from }} &rarr; Phase {{ gate.to }}
            </td>
            <td>{{ gate.condition }}</td>
            <td>{{ gate.rationale }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Future Extensions -->
    <h2 id="future-protocol-extensions">Future Protocol Extensions</h2>
    <p>These extensions are planned but not yet formally drafted:</p>

    <div class="sip-table-wrap">
      <table class="sip-table">
        <thead>
          <tr>
            <th>Future SIP</th>
            <th>Purpose</th>
            <th>Prerequisite</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ext, idx) in data.future" :key="idx">
            <td>
              <strong v-if="ext.number">SIP-{{ ext.number }} ({{ ext.title }})</strong>
              <strong v-else>{{ ext.title }}</strong>
            </td>
            <td>{{ ext.purpose }}</td>
            <td>{{ ext.prerequisite }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Indexer Coordination -->
    <h2 id="indexer-coordination">Indexer Coordination</h2>
    <p>
      SIPs that change consensus behavior require coordination across multiple
      indexers:
    </p>
    <ul>
      <li><strong>stampchain</strong> (primary indexer): Must implement for activation</li>
      <li><strong>OpenStamp</strong>: Should implement for ecosystem consistency</li>
      <li><strong>Future indexers</strong>: Implementation encouraged but not blocking</li>
    </ul>
    <p>For a SIP to reach <strong>Accepted</strong> status:</p>
    <ul>
      <li>stampchain team approves the specification</li>
      <li>At least one other indexer acknowledges the specification</li>
      <li>No unresolved security concerns remain</li>
    </ul>
    <p>
      Activation blocks are coordinated with minimum 4 weeks lead time to allow
      all indexers to prepare.
    </p>
  </div>
</template>

<style scoped>
.sip-registry {
  margin-top: 1.5rem;
}

/* Tables */
.sip-table-wrap {
  overflow-x: auto;
  margin: 1rem 0 1.5rem;
}

.sip-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.sip-table th {
  text-align: left;
  padding: 0.625rem 0.75rem;
  border-bottom: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-weight: 600;
  white-space: nowrap;
}

.sip-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  vertical-align: top;
}

.sip-table tbody tr:hover {
  background: var(--vp-c-brand-softer);
}

.sip-table a {
  color: var(--vp-c-brand-3);
  text-decoration: none;
  font-weight: 500;
}

.sip-table a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

:deep(.dark) .sip-table a {
  color: var(--vp-c-brand-2-dark);
}

.sip-priority {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-align: center;
}

.sip-order-title {
  display: block;
  font-size: 0.825rem;
  color: var(--vp-c-text-3);
  margin-top: 0.125rem;
}

.sip-gate-label {
  font-weight: 600;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

/* Status badges */
.sip-status-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1.4;
}

/* Status definition list */
.sip-status-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 1.5rem;
}

.sip-status-list li {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0;
}

.sip-status-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* Roadmap phase cards */
.sip-roadmap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0 1.5rem;
}

.sip-phase-card {
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-alt);
  transition: border-color 0.2s ease;
}

.sip-phase-card:hover {
  border-left-color: var(--vp-c-brand-2);
}

.sip-phase-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.sip-phase-number {
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
}

.dark .sip-phase-number {
  background: var(--vp-c-brand-1-dark, var(--vp-c-brand-1));
  color: #1a1a1a;
}

.sip-phase-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sip-phase-weeks {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.sip-phase-desc {
  color: var(--vp-c-text-2);
  margin: 0.25rem 0 0.75rem;
  font-size: 0.9rem;
}

.sip-phase-sips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sip-phase-sip-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.875rem;
}

.sip-phase-sip-item a {
  color: var(--vp-c-brand-3);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}

.sip-phase-sip-item a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.dark .sip-phase-sip-item a {
  color: var(--vp-c-brand-2-dark, var(--vp-c-brand-1));
}

.sip-phase-sip-title {
  color: var(--vp-c-text-2);
}

.sip-phase-effort {
  background: var(--vp-c-brand-softer);
  color: var(--vp-c-brand-3);
  padding: 0.0625rem 0.375rem;
  border-radius: 4px;
  font-size: 0.775rem;
  font-weight: 500;
  white-space: nowrap;
}

.dark .sip-phase-effort {
  color: var(--vp-c-brand-2-dark, var(--vp-c-brand-1));
}

.sip-phase-soft-dep {
  color: var(--vp-c-text-3);
  font-size: 0.775rem;
  font-style: italic;
}

.sip-phase-future-note {
  color: var(--vp-c-text-3);
  font-style: italic;
  font-size: 0.825rem;
  padding: 0.25rem 0;
}

/* Mobile */
@media (max-width: 767px) {
  .sip-table {
    font-size: 0.825rem;
  }

  .sip-table th,
  .sip-table td {
    padding: 0.375rem 0.5rem;
  }

  .sip-phase-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .sip-phase-weeks {
    margin-left: 0;
  }

  .sip-phase-sip-item {
    flex-direction: column;
    gap: 0.125rem;
  }
}
</style>
