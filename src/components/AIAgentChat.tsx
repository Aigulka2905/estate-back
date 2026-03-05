import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Send, Loader2, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENTS = [
  {
    id: 'podbor',
    name: 'Агент подбора объектов',
    systemPrompt:
      'Ты эксперт по подбору недвижимости в России. Помогай находить лучшие варианты по критериям клиента (бюджет, район, площадь и т.д.). Предлагай альтернативы, основываясь на типичных рыночных данных. Отвечай на русском, структурировано: 1. Варианты, 2. Плюсы/минусы. Будь краток и полезен.',
  },
  {
    id: 'analiz',
    name: 'Агент анализа объявления',
    systemPrompt:
      'Ты аналитик объявлений о продаже недвижимости. Проверь фото, описание, цену на несоответствия и риски (завышенная цена, скрытые дефекты). Дай рекомендации: что спросить у продавца. Отвечай на русском, в формате: Анализ цены, Риски, Советы. Будь объективен.',
  },
  {
    id: 'peregovory',
    name: 'Агент подготовки к переговорам',
    systemPrompt:
      'Ты опытный риелтор-переговорщик. Составь вопросы для просмотра, аргументы для торга, план сделки. Учитывай бюджет клиента и рынок. Отвечай на русском, нумерованным списком: Вопросы, Аргументы, План. Будь практичен.',
  },
  {
    id: 'yurist',
    name: 'Агент юридической проверки',
    systemPrompt:
      'Ты даёшь общие ориентиры по документам при покупке недвижимости в РФ (паспорт, выписка ЕГРН и т.д.). Выдели красные флаги (например, обременения). Не давай юридическую консультацию — только типичные советы. Отвечай на русском, в формате: Необходимые документы, Возможные риски.',
  },
  {
    id: 'photo_editor',
    name: 'Агент улучшения фотографий',
    systemPrompt:
      'Ты эксперт по обработке изображений недвижимости. Улучшай качество фото квартир/домов, удаляй ненужные объекты (люди, мусор, провода, лишние предметы), делай upscale, освещение, цветокоррекцию, inpainting/outpainting. Отвечай на русском. Описывай подробно, что именно ты изменил и почему. Предлагай варианты улучшений. Если пользователь прислал фото — обязательно обработай его по описанному запросу.',
  },
];

type Message = {
  role: 'user' | 'assistant';
  content: string;
  imageBase64?: string;
};

export default function AIAgentChat() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0].id);
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Приветствие при первом выборе агента
  useEffect(() => {
    if (!chatHistories[selectedAgent]?.length) {
      const welcome: Message = {
        role: 'assistant',
        content: `Здравствуйте! Я ${AGENTS.find((a) => a.id === selectedAgent)?.name}. Чем могу помочь?`,
      };
      setChatHistories((prev) => ({
        ...prev,
        [selectedAgent]: [welcome],
      }));
    }
  }, [selectedAgent]);

  // Очистка при смене агента
  useEffect(() => {
    setInput('');
    setUploadedImage(null);
  }, [selectedAgent]);

  // Надёжный скролл к последнему сообщению
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistories, loading, selectedAgent, uploadedImage]);

  const currentAgent = AGENTS.find((agent) => agent.id === selectedAgent)!;
  const currentMessages = chatHistories[selectedAgent] || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
  if (loading) return;

  const trimmed = input.trim();
  const hasContent = trimmed || uploadedImage;

  if (!hasContent) return;

  const userMsg: Message = {
    role: 'user',
    content: trimmed || 'Обработай загруженное фото',
    imageBase64: uploadedImage ?? undefined,
  };

  setChatHistories(prev => ({
    ...prev,
    [selectedAgent]: [...(prev[selectedAgent] || []), userMsg],
  }));

  setInput('');
  setUploadedImage(null);
  setLoading(true);

  try {
    let apiMessages: any[] = [
      { role: 'system', content: currentAgent.systemPrompt },
      ...currentMessages,
      userMsg,
    ];

    if (selectedAgent === 'photo_editor' && userMsg.imageBase64) {
      apiMessages[apiMessages.length - 1] = {
        role: 'user',
        content: [
          {
            type: 'text',
            text: trimmed || 'Улучши качество, удали лишние объекты, сделай профессионально для объявления недвижимости',
          },
          { type: 'image_url', image_url: { url: userMsg.imageBase64 } },
        ],
      };
    }

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
      },
      body: JSON.stringify({
        model: selectedAgent === 'photo_editor' ? 'black-forest-labs/flux.2-klein-4b' : 'deepseek/deepseek-chat',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: selectedAgent === 'photo_editor' ? 2000 : 1500,
        // Для FLUX иногда нужно явно попросить base64
        ...(selectedAgent === 'photo_editor' ? { response_format: { type: 'b64_json' } } : {}),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    let reply = data.choices?.[0]?.message?.content?.trim() || '';
    let generatedImage = null;

// Для моделей FLUX/OpenRouter изображение приходит в images
    if (selectedAgent === 'photo_editor') {
        const imageData = data.choices?.[0]?.message?.images?.[0];
    if (imageData?.image_url?.url) {
        generatedImage = imageData.image_url.url; // base64 или URL
        reply = reply || 'Фото обработано и улучшено. Вот результат:';
    } else if (data.images?.[0]?.url) {
        generatedImage = data.images[0].url;
        reply = reply || 'Фото обработано. Вот результат:';
    } else if (data.data?.[0]?.b64_json) {
        generatedImage = `data:image/png;base64,${data.data[0].b64_json}`;
        reply = reply || 'Фото обработано. Вот результат:';
    }

  // Если ничего не нашли — оставляем запасной текст
    if (!generatedImage && !reply) {
       reply = 'Фото обработано, но изображение не вернулось в ответе. Проверьте консоль.';
    }
  }

// Сохраняем ответ
   setChatHistories((prev) => ({
      ...prev,
      [selectedAgent]: [
          ...(prev[selectedAgent] || []),
      {
          role: 'assistant',
          content: reply,
          imageBase64: generatedImage, // теперь картинка сохранится и отобразится
      },
     ],
   }));
  } catch (err: any) {
    console.error('Ошибка OpenRouter:', err);
    setChatHistories(prev => ({
      ...prev,
      [selectedAgent]: [
        ...(prev[selectedAgent] || []),
        { role: 'assistant', content: `Ошибка: ${err.message || 'попробуй позже'}` },
      ],
    }));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col h-[75vh] min-h-[520px] max-w-4xl mx-auto border border-purple-800/50 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
      {/* Шапка */}
      <div className="p-4 border-b border-purple-800/50 bg-purple-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-purple-300">Чат с ИИ-агентом</h3>

        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-full sm:w-[260px] bg-gray-900 border-purple-700 text-white">
            <SelectValue placeholder="Выберите агента" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-purple-700 text-white">
            {AGENTS.map((agent) => (
              <SelectItem key={agent.id} value={agent.id} className="focus:bg-purple-900/50">
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Чат */}
      <ScrollArea className="flex-1">
        <div className="min-h-full px-4 py-6 space-y-6">
          {currentMessages.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-500 text-center py-8">
              Выберите агента и начните диалог...
            </div>
          )}

          {currentMessages.map((msg, i) => (
            <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[90%] sm:max-w-[80%] p-4 rounded-2xl break-words whitespace-pre-wrap',
                  msg.role === 'user' ? 'bg-purple-600/40 rounded-br-none' : 'bg-gray-800/70 rounded-bl-none'
                )}
              >
                {msg.imageBase64 && (
                  <img
                    src={msg.imageBase64}
                    alt="Фото"
                    className="max-w-full h-auto rounded-lg border border-purple-600 mb-3 shadow-md"
                  />
                )}
                <div className="leading-relaxed text-sm sm:text-base">{msg.content}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-gray-400 mt-4">
              <Loader2 className="h-5 w-5 animate-spin" />
              {selectedAgent === 'photo_editor' ? 'Обрабатываю фото...' : 'Агент думает...'}
            </div>
          )}

          {/* Якорь для скролла */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </ScrollArea>

      {/* Поле ввода */}
      <div className="p-4 border-t border-purple-800/50 bg-black/40 flex flex-col gap-3">
        {selectedAgent === 'photo_editor' && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="photo-upload" className="text-sm text-gray-300 flex items-center gap-2 cursor-pointer">
              <ImagePlus className="h-5 w-5 text-purple-400" />
              Загрузить фото
            </Label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {uploadedImage && (
              <div className="text-sm text-purple-400 flex items-center gap-3">
                <img src={uploadedImage} alt="Превью" className="w-20 h-20 object-cover rounded border border-purple-600" />
                Фото готово
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              selectedAgent === 'photo_editor'
                ? 'Опишите задачу для фото (или отправьте без текста)'
                : 'Напишите запрос агенту...'
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={loading}
            className="bg-gray-900 border-purple-700 text-white placeholder:text-gray-500"
          />
          <Button
            onClick={handleSend}
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-600"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}