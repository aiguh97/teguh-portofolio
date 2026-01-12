import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { NextSeo } from 'next-seo';

import { fetcher } from '@/services/fetcher';

import Skill from '@/components/views/skill/Skill';
import PageHeading from '@/components/common/PageHeading';
import Container from '@/components/layouts/partials/Container';

const SkillsetPage = ({ skills, certificates }) => {
    const t = useTranslations('Skillset');
    const { locale, pathname } = useRouter();
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';
    const lang = locale === 'en' ? '/en' : '';
    const currentPageURL = `${SITE_URL}${lang}${pathname}`;

    return (
        <>
            <NextSeo
                title={`${t('title')} - Teguh Muhammad Harits`}
                description={t('metaDesc')}
                additionalLinkTags={[
                    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}${pathname}` },
                    { rel: 'alternate', hreflang: 'id', href: `${SITE_URL}${pathname}` },
                    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/en${pathname}` },
                ]}
                canonical={currentPageURL}
                openGraph={{
                    url: currentPageURL,
                }}
            />
            <Container data-aos='fade-up'>
                <PageHeading
                    title={t('title')}
                    description={t('subtitle')}
                />
                <Skill skills={skills} certificates={certificates} />
            </Container>
        </>
    );
};

export default SkillsetPage;

export const getStaticProps = async () => {
    let skills = [];
    let certificates = [];

    try {
        skills = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/skill`);
    } catch (err) {
        console.warn('Failed to fetch skills:', err.message);
    }

    try {
        certificates = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/certificate`);
    } catch (err) {
        console.warn('Failed to fetch certificates:', err.message);
    }

    return {
        props: {
            skills,
            certificates,
        },
        revalidate: 60, // ISR, refresh tiap 60 detik
    };
};
