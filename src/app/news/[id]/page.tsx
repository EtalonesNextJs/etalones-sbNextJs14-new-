import { redirect } from 'next/navigation';
import news from '@/lib/news.json';
import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
import Image from 'next/image';
import { News } from '@/lib/definitions';
import FormCallBack from '@/ui/FormCallBack/FormCallBack';
import Useful from '@/ui/Useful/Useful';
import Managers from '@/ui/Managers/Managers';
import Footer from '@/ui/Footer/Footer';
import Navbar from '@/ui/Navbar/Navbar';
import CardNews from '@/ui/CardNews/CardNews';
import Title from '@/ui/Title/Title';

// Функция для загрузки конкретной новости по идентификатору
async function fetchNews(id: string): Promise<News | null> {
  const selectedNews = news.find((n: News) => n._id === id);
  return selectedNews || null;
}

// Тип пропсов страницы
type PageProps = {
  params: {
    id: string;
  };
};

// Основная функция страницы
export default async function Page({ params }: PageProps) {
  const { id } = params;

  // Логирование полученного id
  console.log("Полученный ID:", id);

  // Загрузка выбранной новости
  const selectedNews = await fetchNews(id);

  // Проверка наличия выбранной новости
  if (!selectedNews) {
    redirect('/404'); // Перенаправление на страницу 404, если новость не найдена
    return null; // Возвращаем null, чтобы избежать ошибки компиляции
  }
  
  // Разбиваем строку с документами на массив
  // const documents = selectedNews.documents ? selectedNews.documents.split(',') : [];

  return (
    <>
      <Navbar />
      <div className="mx-auto lg:p-16 md:p-8 sm:p-4 min-w-0 md:w-[800px] flex-auto lg:static lg:max-h-full lg:overflow-visible">
        <div className="w-full flex">
            <div className="min-w-0 flex-auto items-center px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{selectedNews.title}</h1>
                <Breadcrumbs prev='/news' title={selectedNews.title || 'Нет заголовка'} prevText='Новости' />

                <p className="mt-1 text-lg font-semibold text-green-600">{selectedNews.minDescr}</p>
                <div className='flex justify-center'>
                {selectedNews.image && (
                <Image src={selectedNews.image || '/default-image.png'} width={400} height={400} alt={selectedNews.title || "noImage"} />
                )}

                </div>

                {/* <hr className="my-5"> */}
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedNews.h2}</h2>
                <div className="mt-5 text-base  text-center">
                {selectedNews.content?.article?.map((article, index) => (
  <div key={index}>
    <h3 className='font-bold mb-5'>{article.title}</h3>
    {article.image && (
      <Image src={article.image} width={400} height={400} alt={article.title || ""}/>
    )}
    <p className='font-medium mb-3'>{article.content}</p>
  </div>
))}

</div>
            </div>
        </div>
        <div className='flex justify-between'>
       <p>{selectedNews.date}</p> 
<div>Источник: <a href={selectedNews.source} target='blank'>{selectedNews.source}</a></div>
        </div>
    </div>
    <Title text='Другие новости'/>
    <CardNews count={3} newsData={news} />
      <FormCallBack />
      <Useful />
      <Managers />
      <Footer />
    </>
  );
}
