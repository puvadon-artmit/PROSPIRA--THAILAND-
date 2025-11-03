export type NewsItemApi = {
  company_news_id: string;
  company_news_photo?: string;
  title: string;
  content: string;
  category?: string;
  username_creator?: string;
  created_at: string;
  updated_at?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  desc: string;
  category: string;
  dateText: string;
  created_at: string;
  photo?: string;
  isNew: boolean;
};

export type RelatedNews = {
    company_news_id: string;
    company_news_photo?: string;
    title: string;
    category?: string;
    created_at: string;
};

