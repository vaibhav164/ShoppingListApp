import { useEffect } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { addList, fetchLists } from "../../src/store/listSlice";

export default function ListsScreen() {
  const dispatch = useAppDispatch();
  const { lists, loading } = useAppSelector((state: any) => state.lists);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  return (
    <View>
      <Button
        title="Add List"
        onPress={() =>
          dispatch(addList({ name: "Groceries", priority: "High" }))
        }
      />

      {loading && <Text>Loading...</Text>}

      <FlatList
        data={lists}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <Text>
            {item.name} ({item.priority})
          </Text>
        )}
      />
    </View>
  );
}
