import PageHeading from '@/components/common/PageHeading';
import Container from '@/components/layouts/partials/Container'
import Portfolio from '@/components/views/portfolio/Portfolio'
import { fetcher } from '@/services/fetcher';
import { useTranslations } from 'next-intl';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';


const PortfolioPage = ({ portfolios }) => {

    const t = useTranslations('Portfolio');
    const { locale, pathname } = useRouter();
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
    const lang = locale == 'en' ? '/en' : ''
    const currentPageURL = `${SITE_URL}${lang}${pathname}`

    return (
        <>
            <NextSeo
                title={`${t('title')} - Dwi Wijaya`}
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
                <div>sadads {JSON.stringify(portfolios)}</div>
                <Portfolio portfolios={portfolios} locale={locale} />
            </Container>
        </>
    )
}

export default PortfolioPage
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}/portfolio`);
  const data = await res.json();

  return {
    props: {
      portfolios: data.items || [], // ambil array items saja
    },
    revalidate: 1,
  };
};
