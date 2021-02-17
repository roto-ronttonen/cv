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

const locales = ['fi', 'en'];

type HomeProps = {
  content: Content;
};

export default function Home({ content }: HomeProps) {
  const router = useRouter();
  const cms = useCMS();
  const formConfig: FormOptions<any> = {
    id: 'home-content',
    label: 'Etusivu',
    fields: [
      {
        label: 'Meta',
        name: 'meta',
        component: 'group',
        fields: [
          { label: 'Otsikko', name: 'title', component: 'text' },
          { label: 'Kuvaus', name: 'description', component: 'textarea' },
        ],
      },
      {
        label: 'Otsikko',
        name: 'header',
        component: 'group',
        fields: [],
      },
      {
        label: 'Taidot',
        name: 'skills',
        component: 'group',
        fields: [
          {
            label: 'Otsikko',
            name: 'title',
            component: 'text',
          },
          {
            label: 'Taidot',
            name: 'skills',
            component: 'list',
            field: {
              component: 'text',
            },
          },
        ],
      },
      {
        label: 'Kokemus',
        name: 'experience',
        component: 'group',
        fields: [
          {
            label: 'Otsikko',
            name: 'title',
            component: 'text',
          },
          {
            label: 'Kokemukset',
            name: 'experience.experiences',
            component: 'group-list',
            itemProps: (item: Content['experience']['experiences'][0]) => ({
              label: item.employerName,
            }),
            fields: [
              {
                label: 'Työnantaja',
                name: 'employerName',
                component: 'text',
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
  const [data, form] = useForm<Content>(formConfig);
  usePlugin(form);
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>
      <nav className="w-screen h-16 border-b border-gray-300">
        <ContentContainer className="flex items-center justify-end">
          {locales.map((l) => (
            <Link href={router.pathname} locale={l} key={l}>
              <a className="ml-2">{l.toUpperCase()}</a>
            </Link>
          ))}
        </ContentContainer>
      </nav>
      <main>
        <ContentContainer className="flex flex-col divide-solid divide-y">
          <div id="header">
            <h1>{data.header.name}</h1>
            <h2>{data.header.title}</h2>
          </div>
          <div id="skills">
            <ul className="grid grid-col-2 gap-2"></ul>
            {data.skills.skills.map((skill) => (
              <li>{skill}</li>
            ))}
          </div>
          <div id="experience"></div>
        </ContentContainer>
      </main>
      <footer className="border-t border-gray-300"></footer>
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
  };
};
