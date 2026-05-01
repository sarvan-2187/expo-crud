import { seedItems } from "@/data/seed-items";
import type { CrudItem, ItemFormState } from "@/types/item";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";

const emptyForm: ItemFormState = {
  title: "",
  notes: ""
};

export default function ItemsScreen() {
  const [items, setItems] = useState<CrudItem[]>(seedItems);
  const [form, setForm] = useState<ItemFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingItem = useMemo(
    () => items.find((item) => item.id === editingId) ?? null,
    [editingId, items]
  );

  const isEditing = Boolean(editingItem);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleSubmit() {
    const title = form.title.trim();
    const notes = form.notes.trim();

    if (!title) {
      Alert.alert("Title required", "Add a short title before saving.");
      return;
    }

    if (isEditing && editingId) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title,
                notes,
                updatedAt: new Date().toISOString()
              }
            : item
        )
      );
      resetForm();
      return;
    }

    const newItem: CrudItem = {
      id: `${Date.now()}`,
      title,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setItems((currentItems) => [newItem, ...currentItems]);
    resetForm();
  }

  function handleEdit(item: CrudItem) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      notes: item.notes
    });
  }

  function handleDelete(itemId: string) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));

    if (editingId === itemId) {
      resetForm();
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 36,
        gap: 20
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 8,
          borderCurve: "continuous",
          padding: 16,
          gap: 14,
          borderWidth: 1,
          borderColor: "#e6dfd1",
          boxShadow: "0 2px 10px rgba(43, 34, 18, 0.06)"
        }}
      >
        <Text
          selectable
          style={{
            color: "#2d251b",
            fontSize: 18,
            fontWeight: "700"
          }}
        >
          {isEditing ? "Update Item" : "Create Item"}
        </Text>

        <TextInput
          accessibilityLabel="Item title"
          placeholder="Title"
          value={form.title}
          onChangeText={(title) => setForm((currentForm) => ({ ...currentForm, title }))}
          style={{
            minHeight: 48,
            borderRadius: 8,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: "#d7ccb9",
            paddingHorizontal: 14,
            color: "#2d251b",
            backgroundColor: "#fbfaf6"
          }}
        />

        <TextInput
          accessibilityLabel="Item notes"
          placeholder="Notes"
          value={form.notes}
          multiline
          textAlignVertical="top"
          onChangeText={(notes) => setForm((currentForm) => ({ ...currentForm, notes }))}
          style={{
            minHeight: 96,
            borderRadius: 8,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: "#d7ccb9",
            padding: 14,
            color: "#2d251b",
            backgroundColor: "#fbfaf6"
          }}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 48,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              borderCurve: "continuous",
              backgroundColor: pressed ? "#244f46" : "#2f665a"
            })}
          >
            <Text style={{ color: "#ffffff", fontWeight: "700" }}>
              {isEditing ? "Save" : "Add"}
            </Text>
          </Pressable>

          {isEditing ? (
            <Pressable
              accessibilityRole="button"
              onPress={resetForm}
              style={({ pressed }) => ({
                minHeight: 48,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                borderCurve: "continuous",
                paddingHorizontal: 18,
                borderWidth: 1,
                borderColor: "#cbbfa9",
                backgroundColor: pressed ? "#eee7da" : "#fbfaf6"
              })}
            >
              <Text style={{ color: "#4f4334", fontWeight: "700" }}>Cancel</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
          <Text
            selectable
            style={{
              color: "#2d251b",
              fontSize: 18,
              fontWeight: "700"
            }}
          >
            All Items
          </Text>
          <Text
            selectable
            style={{
              color: "#796b58",
              fontVariant: ["tabular-nums"]
            }}
          >
            {items.length} total
          </Text>
        </View>

        {items.length === 0 ? (
          <View
            style={{
              minHeight: 120,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              borderCurve: "continuous",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#cbbfa9",
              padding: 18
            }}
          >
            <Text selectable style={{ color: "#685b49", textAlign: "center" }}>
              No items yet. Create one above to get started.
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 8,
                borderCurve: "continuous",
                padding: 16,
                gap: 12,
                borderWidth: editingId === item.id ? 2 : 1,
                borderColor: editingId === item.id ? "#2f665a" : "#e6dfd1",
                boxShadow: "0 1px 6px rgba(43, 34, 18, 0.05)"
              }}
            >
              <View style={{ gap: 6 }}>
                <Text
                  selectable
                  style={{
                    color: "#2d251b",
                    fontSize: 17,
                    fontWeight: "700"
                  }}
                >
                  {item.title}
                </Text>
                {item.notes ? (
                  <Text selectable style={{ color: "#5e5243", lineHeight: 21 }}>
                    {item.notes}
                  </Text>
                ) : null}
              </View>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => handleEdit(item)}
                  style={({ pressed }) => ({
                    minHeight: 42,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    borderCurve: "continuous",
                    paddingHorizontal: 16,
                    backgroundColor: pressed ? "#e2eadf" : "#edf4ea"
                  })}
                >
                  <Text style={{ color: "#2f665a", fontWeight: "700" }}>Edit</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => handleDelete(item.id)}
                  style={({ pressed }) => ({
                    minHeight: 42,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    borderCurve: "continuous",
                    paddingHorizontal: 16,
                    backgroundColor: pressed ? "#f1ddd6" : "#f9e9e4"
                  })}
                >
                  <Text style={{ color: "#a1422d", fontWeight: "700" }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
