export const Friends: Friend[] = [
  {
    title: 'Anak1st',
    description: '🎈 ACMer (网瘾罢了😄)',
    website: 'https://anak1st.github.io/blog/',
    avatar: 'https://avatars.githubusercontent.com/u/87300894?v=4',
  },
  {
    title: 'yixinBC',
    description: 'A beginner of CTF',
    website: 'https://blog.buyix.in/',
    avatar: 'https://avatars.githubusercontent.com/u/61578883?v=4',
  },
  {
    title: 'AsterZC19',
    description: '每个人的花期都不一样。',
    website: 'https://asterzc19.github.io/',
    avatar: 'https://avatars.githubusercontent.com/u/28391387?v=4',
  },
  {
    title: 'LofiSu',
    description: 'Learning is a lifelong journey.',
    website: 'https://www.lofisu.chat/',
    avatar: 'https://avatars.githubusercontent.com/u/163713803?v=4',
  }
]

export type Friend = {
  title: string
  description: string
  website: string
  avatar?: string
}
