import type { NavigationMenuItem } from '@nuxt/ui'

export const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      children: [
        {
          label: 'Introduction',
          to: '/docs/introduction',
          icon: 'i-lucide-house'
        },
        {
          label: 'Installation',
          icon: 'i-lucide-cloud-download'
        }
      ]
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      children: [
        {
          label: 'Modal',
          to: '/docs/components/modal'
        }
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    }
  ]
]

export const orderTypeOptions = [
  { label: "label.dineIn", value: "dine-in" },
  { label: "label.takeAway", value: "take-away" },
];