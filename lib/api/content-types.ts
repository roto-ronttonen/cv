export type MetaContent = {
  title: string;
  description: string;
};

export type HeaderContent = {
  name: string;
  title: string;
};

export type SkillsContent = {
  title: string;
  skills: string[];
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
  skills: {
    title: 'Lorem lipsum',
    skills: ['Lorem lipsum'],
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
