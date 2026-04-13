'use client';

import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();

  const {
    draft,
    setDraft,
    clearDraft,
  } = useNoteStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      [name]: value,
    });
  };

  const handleSubmit = async (
    formData: FormData
  ) => {
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      tag: formData.get('tag'),
    };

    try {
      await fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      clearDraft();

      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={css.form}
      action={handleSubmit}
    >
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
      />

      <select
        name="tag"
        value={draft.tag}
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <div className={css.actions}>
        <button type="submit">
          Create
        </button>

        <button
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}