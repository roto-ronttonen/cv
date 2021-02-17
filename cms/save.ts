import axios from 'axios';

export const save = async (lang: string, content: string, form: unknown) => {
  await axios.put(`/api/cms/${lang}/${content}`, form);
};
