// API Service for AI Agents
const API_BASE_URL = 'http://localhost:8000';

export interface SearchRequest {
  voice_transcript?: string;
  text_query?: string;
}

export interface SearchResponse {
  results: Array<{
    id: string;
    address: string;
    price: number;
    rooms: number;
    area: number;
    floor: number;
    description: string;
  }>;
  matched_criteria: string[];
}

export interface AdRequest {
  property_data: {
    address: string;
    price: number;
    rooms: number;
    area: number;
    floor: number;
    features?: string[];
  };
  target_audience?: string;
  tone?: string;
}

export interface AdResponse {
  ad_text: string;
  headline: string;
  key_selling_points: string[];
}

export interface PhotoRequest {
  image_url: string;
  operation: 'enhance' | 'cleanup' | 'virtual_staging' | 'remove_objects';
}

export interface PhotoResponse {
  processed_image_url: string;
  operation_applied: string;
}

export interface QARequest {
  question: string;
}

export interface QAResponse {
  answer: string;
  confidence: number;
  source?: string;
}

// Search Agent API
export const searchApartments = async (request: SearchRequest): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Search request failed');
    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    // Return mock data for demo
    return getMockSearchResults(request);
  }
};

// Ad Generation Agent API
export const generateAd = async (request: AdRequest): Promise<AdResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/ad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Ad generation failed');
    return await response.json();
  } catch (error) {
    console.error('Ad API error:', error);
    return getMockAdResponse(request);
  }
};

// Photo Processing Agent API
export const processPhoto = async (request: PhotoRequest): Promise<PhotoResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Photo processing failed');
    return await response.json();
  } catch (error) {
    console.error('Photo API error:', error);
    return getMockPhotoResponse(request);
  }
};

// Q&A Agent API
export const askQuestion = async (request: QARequest): Promise<QAResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/qa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) throw new Error('Q&A request failed');
    return await response.json();
  } catch (error) {
    console.error('Q&A API error:', error);
    return getMockQAResponse(request);
  }
};

// Mock data for demo purposes
const getMockSearchResults = (request: SearchRequest): SearchResponse => {
  const query = request.voice_transcript || request.text_query || '';
  const hasRooms = query.match(/(\d+)-?\s*комнат/);
  const hasPrice = query.match(/до\s*(\d+)\s*млн/);
  const hasArea = query.match(/(\d+)\s*м²/);
  
  return {
    results: [
      {
        id: '1',
        address: 'ул. Ленина, 45, кв. 12',
        price: 8500000,
        rooms: hasRooms ? parseInt(hasRooms[1]) : 2,
        area: hasArea ? parseInt(hasArea[1]) : 65,
        floor: 5,
        description: 'Светлая квартира с ремонтом, балкон, рядом метро'
      },
      {
        id: '2',
        address: 'пр. Мира, 120, кв. 78',
        price: hasPrice ? parseInt(hasPrice[1]) * 1000000 : 12000000,
        rooms: hasRooms ? parseInt(hasRooms[1]) : 3,
        area: hasArea ? parseInt(hasArea[1]) + 15 : 85,
        floor: 8,
        description: 'Просторная квартира, панорамные окна, парковка'
      },
      {
        id: '3',
        address: 'ул. Гагарина, 15, кв. 34',
        price: 7200000,
        rooms: 1,
        area: 42,
        floor: 3,
        description: 'Студия с евроремонтом, новый дом'
      }
    ],
    matched_criteria: ['Цена', 'Количество комнат', 'Район']
  };
};

const getMockAdResponse = (request: AdRequest): AdResponse => {
  const { property_data } = request;
  return {
    headline: `${property_data.rooms}-комнатная квартира, ${property_data.area} м² — ${(property_data.price / 1000000).toFixed(1)} млн ₽`,
    ad_text: `Продается отличная ${property_data.rooms}-комнатная квартира площадью ${property_data.area} м² по адресу ${property_data.address}. 

Квартира расположена на ${property_data.floor} этаже. Современный ремонт, светлые комнаты, развитая инфраструктура района. 

Идеальный вариант для семьи или инвестиций. Звоните прямо сейчас!`,
    key_selling_points: [
      'Удобное расположение',
      'Современный ремонт',
      'Развитая инфраструктура',
      'Хорошая транспортная доступность'
    ]
  };
};

const getMockPhotoResponse = (request: PhotoRequest): PhotoResponse => {
  return {
    processed_image_url: request.image_url,
    operation_applied: request.operation
  };
};

const getMockQAResponse = (request: QARequest): QAResponse => {
  const question = request.question.toLowerCase();
  
  if (question.includes('комисс')) {
    return {
      answer: 'Комиссия агентства составляет 3% от стоимости сделки при продаже и 50% от первого месяца аренды при сдаче внаем. При повторных обращениях действуют скидки.',
      confidence: 0.95,
      source: 'База знаний: Условия сотрудничества'
    };
  }
  
  if (question.includes('ипотек') || question.includes('кредит')) {
    return {
      answer: 'Мы сотрудничаем с ведущими банками: Сбербанк, ВТБ, Альфа-Банк, Тинькофф. Помогаем одобрить ипотеку по сниженной ставке от 4.9% годовых. Одобрение за 2 дня.',
      confidence: 0.92,
      source: 'База знаний: Ипотечные программы'
    };
  }
  
  if (question.includes('документ')) {
    return {
      answer: 'Для продажи квартиры необходимы: паспорт собственника, свидетельство о праве собственности, выписка из ЕГРН, справка об отсутствии задолженности по ЖКХ.',
      confidence: 0.88,
      source: 'База знаний: Документооборот'
    };
  }
  
  return {
    answer: 'Благодарим за вопрос! Наши специалисты ответят вам в ближайшее время. Для срочных вопросов звоните по телефону: +7 (999) 123-45-67',
    confidence: 0.6
  };
};
