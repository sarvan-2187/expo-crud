export type CrudItem = {
  id: string;
  title: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type ItemFormState = Pick<CrudItem, "title" | "notes">;
