import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getContent } from '../lib/api';
import { Content, contentDefaultValues } from '../lib/api/content-types';
import { useRouter } from 'next/router';
import { useCMS, usePlugin, useForm, FormOptions } from 'tinacms';
import { save } from '../cms/save';
import React from 'react';
import Link from 'next/link';
import { ContentContainer } from '../components/content-container';
import clsx from 'clsx';

const locales = ['fi', 'en'];

type HomeProps = {
  content: Content;
  preview: boolean;
};

export default function Home({ content, preview }: HomeProps) {
  const router = useRouter();
  const cms = useCMS();

  const formConfig: FormOptions<any> = {
    id: 'home-content',
    label: 'Home',
    fields: [
      {
        label: 'Meta',
        name: 'meta',
        component: 'group',
        fields: [
          { label: 'Title', name: 'title', component: 'text' },
          { label: 'Description', name: 'description', component: 'textarea' },
        ],
      },
      {
        label: 'Header section',
        name: 'header',
        component: 'group',
        fields: [
          { label: 'Name', name: 'name', component: 'text' },
          { label: 'Title', name: 'title', component: 'text' },
        ],
      },
      {
        label: 'Profile section',
        name: 'profile',
        component: 'group',
        fields: [
          {
            label: 'Title',
            name: 'title',
            component: 'text',
          },
          {
            label: 'Text',
            name: 'text',
            component: 'textarea',
          },
        ],
      },
      {
        label: 'Skills section',
        name: 'skills',
        component: 'group',
        fields: [
          {
            label: 'Title',
            name: 'title',
            component: 'text',
          },
          {
            label: 'Skills title',
            name: 'skillNameTitle',
            component: 'text',
          },
          {
            label: 'Level title',
            name: 'levelTitle',
            component: 'text',
          },
          {
            label: 'Skills',
            name: 'skills',
            component: 'group-list',
            itemProps: (item: Content['skills']['skills'][0]) => ({
              label: item.name,
            }),
            fields: [
              {
                label: 'Name',
                name: 'name',
                component: 'text',
              },
              {
                label: 'Proficiency',
                name: 'level',
                component: 'select',
                options: [0, 1, 2, 3, 4, 5].map((o) => ({
                  label: o.toString(),
                  value: o,
                })),
              },
            ],
          },
        ],
      },
      {
        label: 'Experience section',
        name: 'experience',
        component: 'group',
        fields: [
          {
            label: 'Title',
            name: 'title',
            component: 'text',
          },
          {
            label: 'Experiences',
            name: 'experiences',
            component: 'group-list',
            itemProps: (item: Content['experience']['experiences'][0]) => ({
              label: item.employerName,
            }),
            fields: [
              {
                label: 'Employer',
                name: 'employerName',
                component: 'text',
              },
              {
                label: 'From',
                name: 'fromDate',
                component: 'text',
              },
              {
                label: 'To',
                name: 'toDate',
                component: 'text',
              },
              {
                label: 'Description',
                name: 'text',
                component: 'textarea',
              },
            ],
          },
        ],
      },
    ],
    initialValues: content,
    onSubmit: async (values) => {
      await save(router.locale, 'content', values);
      cms.alerts.success('Tallennettu');
    },
  };
  const [editableData, form] = useForm<Content>(formConfig);
  usePlugin(form);

  const data = preview ? editableData : content;

  return (
    <div className="min-h-screen bg-primary text-white">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>
      <nav className="min-w-screen h-16">
        <ContentContainer className="flex items-center">
          {locales.map((l, index) => (
            <React.Fragment key={l}>
              {index !== 0 && <span>/</span>}
              <Link href={router.pathname} locale={l}>
                <a className={clsx(index !== 0 && 'ml-2', 'mr-2')}>
                  {l.toUpperCase()}
                </a>
              </Link>
            </React.Fragment>
          ))}
          <a
            className="ml-auto"
            rel="noopener"
            target="_blank"
            href="https://github.com/roto-ronttonen/cv"
          >
            Github
          </a>
        </ContentContainer>
      </nav>
      <main>
        <ContentContainer className="flex flex-col items-end divide-solid divide-y divide-white">
          <section
            id="header"
            className="inline-flex flex-col py-4 w-full md:w-3/4"
          >
            <h1 className="font-bold text-6xl">{data.header.name}</h1>
            <h2 className="text-4xl">{data.header.title}</h2>
          </section>
          <section
            id="profile"
            className="inline-flex flex-col md:flex-row py-4 w-full md:w-3/4"
          >
            <h2 className="font-bold text-xl w-full md:w-1/2">
              {data.profile.title}
            </h2>
            <p className="text-lg w-full md:w-1/2">{data.profile.text}</p>
          </section>

          <section
            id="skills"
            className="inline-flex flex-col md:flex-row w-full md:w-3/4 py-4"
          >
            <h2 className="font-bold text-xl w-full md:w-1/2">
              {data.skills.title}
            </h2>
            <div className="w-full md:w-1/2 inline-flex flex-col">
              <div className="flex w-full justify-between underline text-lg">
                <span>{data.skills.skillNameTitle}</span>
                <span>{data.skills.levelTitle}</span>
              </div>
              <ul className="w-full list-disc text-lg">
                {data.skills.skills.map((skill) => (
                  <li key={skill.name} className="flex justify-between">
                    <span>{skill.name}</span>
                    <span>{skill.level?.toString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section
            id="experience"
            className="inline-flex flex-col md:flex-row w-full md:w-3/4 py-4"
          >
            <h2 className="font-bold text-xl w-full md:w-1/2">
              {data.experience.title}
            </h2>
            <ul className="w-full md:w-1/2 text-lg">
              {data.experience.experiences.map((e) => (
                <li key={e.employerName} className="mb-4">
                  <div className="flex flex-col">
                    <h3>{e.employerName}</h3>
                    <div className="flex">
                      <p className="text-sm mb-1">
                        {e.fromDate} - {e.toDate}
                      </p>
                    </div>
                    <p>{e.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </ContentContainer>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const content = await getContent<Content>(
    locale,
    'content',
    contentDefaultValues
  );
  return {
    props: {
      content,
      preview: !!preview,
    },
    revalidate: 5,
  };
};
