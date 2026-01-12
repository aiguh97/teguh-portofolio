import Image from 'next/image';
import dynamic from 'next/dynamic';
import { BsGithub } from 'react-icons/bs';
import { BiChevronRight, BiLinkExternal } from 'react-icons/bi';

import { PORTFOLIO_CATEGORIES, PORTFOLIO_TYPES } from '@/constants/data/portfolio';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditorPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((module) => module.default),
  { ssr: false }
);

const DetailPortfolio = ({ portfolio, locale }) => {
  if (!portfolio) return null;

  // Fallback untuk category dan type
  const categoryData = PORTFOLIO_CATEGORIES[portfolio.category] || {};
  const typeData = PORTFOLIO_TYPES[portfolio.type] || {};

  // Pastikan skills selalu array
  const skillsArray = Array.isArray(portfolio.skill) ? portfolio.skill : [];

  return (
    <article className=''>
      <h1 className='text-2xl font-medium'>{portfolio.name || '-'}</h1>
      <p className='text-sm text-subtext leading-5'>{portfolio.excerpt || '-'}</p>
      <hr className="hr" />

      <div className="flex items-center gap-2 justify-center sm:justify-normal">
        {portfolio.demoLink &&
          <a data-umami-event={`Click Live Demo - ${portfolio.name}`} href={portfolio.demoLink} className="badge text-sm mb-5" target="_blank" rel="noopener noreferrer">
            <BiLinkExternal /> {locale === 'en' ? 'Live Demo' : 'Demo Langsung'}
          </a>
        }
        {portfolio.githubLink &&
          <a data-umami-event={`Click Source Code - ${portfolio.name}`} href={portfolio.githubLink} className="badge text-sm mb-5" target="_blank" rel="noopener noreferrer">
            <BsGithub /> {locale === 'en' ? 'Source Code' : 'Kode Sumber'}
          </a>
        }
      </div>

      {portfolio.thumbnail
        ? <Image
            alt={portfolio.name}
            src={portfolio.thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            className='rounded-md'
            style={{ width: '100%', height: 'auto' }}
            loading='lazy'
          />
        : <div className='bg-gray-200 rounded-md w-full h-[300px] flex items-center justify-center'>
            No Image
          </div>
      }

     <div className='flex gap-2 items-center mt-4 overflow-y-hidden scrollbar-hide'>
  {skillsArray.map((skill, index) => (
    <span className="badge text-sm flex items-center gap-1" key={index}>
      {skill.icon ? (
        <span
          className="inline-block w-5 h-5"
          dangerouslySetInnerHTML={{
            __html: skill.icon
              // Hapus deklarasi XML dan comment agar React bisa render
              .replace(/<\?xml.*?\?>/g, '')
              .replace(/<!--.*?-->/g, '')
          }}
        />
      ) : null}
      <span>{skill.name || skill.label}</span>
    </span>
  ))}
</div>


      <hr className='hr' />

      <MDEditorPreview
        source={portfolio.content || ''}
        className="md:p-4 rounded-lg mb-3"
      />

      <p className='text-sm text-subtext flex items-center gap-2'>
        <BiChevronRight /> {locale === 'en' ? 'Category' : 'Kategori'}:  
        {categoryData.reactIcon || null} {categoryData.label?.[locale] || portfolio.category}
      </p>

      <p className='text-sm text-subtext flex items-center gap-2'>
        <BiChevronRight /> {locale === 'en' ? 'Type' : 'Jenis'}:  
        {typeData.icon || null} {typeData[locale] || portfolio.type}
      </p>
    </article>
  )
}

export default DetailPortfolio;
