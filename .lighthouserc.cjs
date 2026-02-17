module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        '/en/index.html',
        '/en/protocols/src-20.html',
        '/en/guide/introduction.html',
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
