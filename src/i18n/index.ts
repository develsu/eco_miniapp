import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: { translation: {
    status: 'Статус',
    register: 'Регистрация',
    plan: 'Тариф',
    rental: 'Аренда/Лизинг',
    battery: 'Моя батарея',
    scan_station: 'Сканировать станцию',
    get_charged: 'Получить заряженный АКБ',
    access_denied: 'Нет доступа',
    open_in_traccar: 'Открыть в Traccar',
    show_on_map: 'Показать на карте',
  }},
  kz: { translation: {
    status: 'Күйі',
    register: 'Тіркеу',
    plan: 'Тариф',
    rental: 'Жалға алу/Лизинг',
    battery: 'Менің батареям',
    scan_station: 'Станцияны сканерлеу',
    get_charged: 'Зарядталған АКБ алу',
    access_denied: 'Қолжетім жоқ',
    open_in_traccar: 'Traccar-да ашу',
    show_on_map: 'Картада көрсету',
  }},
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

export default i18n;
