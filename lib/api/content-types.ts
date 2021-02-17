export type MetaContent = {
  title: string;
  description: string;
};

export type HeaderContent = {
  name: string;
  title: string;
};

export type ProfileContent = {
  title: string;
  text: string;
};

export type SkillsContent = {
  title: string;
  skillNameTitle: string;
  levelTitle: string;
  skills: { name: string; level: 0 | 1 | 2 | 3 | 4 | 5 }[];
};

export type ExperienceContent = {
  title: string;
  experiences: {
    fromDate: string;
    toDate: string;
    employerName: string;
    text: string;
  }[];
};

export type Content = {
  meta: MetaContent;
  header: HeaderContent;
  profile: ProfileContent;
  skills: SkillsContent;
  experience: ExperienceContent;
};

export const contentDefaultValues: Content = {
  meta: {
    title: 'Lorem lipsum',
    description: 'Lorem lipsum',
  },
  header: {
    name: 'Lorem lipsum',
    title: 'Lorem lipsum',
  },
  profile: {
    title: 'Lorem lipsum',
    text: 'Lorem lipsum',
  },
  skills: {
    title: 'Lorem lipsum',
    skillNameTitle: 'loreml lipsum',
    levelTitle: 'Lorem lipsum',
    skills: [{ name: 'Lorem lipsum', level: 5 }],
  },
  experience: {
    title: 'Lorem lipsum',
    experiences: [
      {
        fromDate: '01.01.1970',
        toDate: '01.01.2021',
        employerName: 'Lorem lipsum',
        text: 'Lorem lipsum',
      },
    ],
  },
};
