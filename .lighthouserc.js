module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        '/en/',
        '/en/protocols/src-20',
        '/en/guide/introduction',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
}
