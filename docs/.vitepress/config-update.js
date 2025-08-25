// Update the sidebar configuration to include the new technical comparison page
// This is a temporary file to help with the exact text replacement needed

const newSidebarSection = `
      '/en/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/guide/introduction' },
            { text: 'Getting Started', link: '/en/guide/getting-started' },
            { text: 'Economics', link: '/en/guide/economics' }
          ]
        },
        {
          text: 'Technical Comparison',
          items: [
            { text: 'Bitcoin Stamps vs Ordinals', link: '/en/guide/bitcoin-stamps-vs-ordinals' }
          ]
        }
      ],
`;

console.log('New sidebar configuration section:');
console.log(newSidebarSection);