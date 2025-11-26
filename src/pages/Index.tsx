import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Паста с морепродуктами',
    description: 'Свежая паста с креветками, мидиями и кальмарами в сливочном соусе с белым вином',
    price: 890,
    category: 'Основные блюда',
    image: 'https://cdn.poehali.dev/projects/caecf8b8-df7a-4b6a-9998-c6393e6c06af/files/abde139b-be6f-46ca-80be-6edec4d861cc.jpg',
    ingredients: ['паста', 'креветки', 'мидии', 'кальмары', 'сливки', 'белое вино', 'чеснок', 'травы']
  },
  {
    id: 2,
    name: 'Стейк Рибай',
    description: 'Премиальный мраморный стейк с овощами гриль и соусом из черного перца',
    price: 1490,
    category: 'Основные блюда',
    image: 'https://cdn.poehali.dev/projects/caecf8b8-df7a-4b6a-9998-c6393e6c06af/files/de6a29bc-cfee-4cc7-870d-fe337601dc15.jpg',
    ingredients: ['говядина', 'овощи гриль', 'черный перец', 'масло', 'розмарин']
  },
  {
    id: 3,
    name: 'Салат Цезарь с курицей',
    description: 'Классический салат с хрустящим салатом романо, курицей гриль и пармезаном',
    price: 590,
    category: 'Салаты',
    image: 'https://cdn.poehali.dev/projects/caecf8b8-df7a-4b6a-9998-c6393e6c06af/files/23bc8dc5-946d-4087-a076-5527a2242aae.jpg',
    ingredients: ['салат романо', 'куриное филе', 'пармезан', 'гренки', 'соус цезарь', 'помидоры черри']
  },
  {
    id: 4,
    name: 'Том Ям с креветками',
    description: 'Традиционный тайский суп с креветками, грибами и кокосовым молоком',
    price: 690,
    category: 'Супы',
    image: 'https://cdn.poehali.dev/projects/caecf8b8-df7a-4b6a-9998-c6393e6c06af/files/abde139b-be6f-46ca-80be-6edec4d861cc.jpg',
    ingredients: ['креветки', 'кокосовое молоко', 'грибы', 'лемонграсс', 'лайм', 'чили']
  },
  {
    id: 5,
    name: 'Тартар из лосося',
    description: 'Свежий лосось с авокадо, каперсами и хрустящими чипсами',
    price: 790,
    category: 'Закуски',
    image: 'https://cdn.poehali.dev/projects/caecf8b8-df7a-4b6a-9998-c6393e6c06af/files/de6a29bc-cfee-4cc7-870d-fe337601dc15.jpg',
    ingredients: ['лосось', 'авокадо', 'каперсы', 'лук', 'оливковое масло', 'лимон']
  },
  {
    id: 6,
    name: 'Тирамису',
    description: 'Классический итальянский десерт с маскарпоне и эспрессо',
    price: 490,
    category: 'Десерты',
    image: 'https://cdn.poehali.dev/projects/caecf8b8-df7a-4b6a-9998-c6393e6c06af/files/23bc8dc5-946d-4087-a076-5527a2242aae.jpg',
    ingredients: ['маскарпоне', 'савоярди', 'эспрессо', 'какао', 'яйца', 'сахар']
  }
];

const categories = ['Все', 'Закуски', 'Салаты', 'Супы', 'Основные блюда', 'Десерты'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = selectedCategory === 'Все' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Наше меню
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Изысканные блюда от наших шеф-поваров, приготовленные из свежайших ингредиентов
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-scale-in">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-primary to-secondary shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in border-2"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold px-3 py-1">
                  {item.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-primary whitespace-nowrap ml-2">
                    {item.price} ₽
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                >
                  <Icon name="Eye" className="mr-2" size={18} />
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {selectedItem.name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <span className="text-lg font-semibold">Цена:</span>
                  <span className="text-3xl font-bold text-primary">{selectedItem.price} ₽</span>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Icon name="ListChecks" className="mr-2" size={20} />
                    Ингредиенты:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ingredient, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="px-3 py-1 text-sm bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all"
                      >
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-xl transition-all duration-300 text-lg py-6"
                  onClick={() => setSelectedItem(null)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={20} />
                  Добавить в заказ
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
